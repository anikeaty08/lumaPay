import { chromium } from 'playwright-core';
import path from 'node:path';

const executablePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = process.env.LUMAPAY_UI_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ executablePath, headless: true });
const errors = [];

const recordErrors = (page) => {
  page.on('pageerror', (error) => errors.push(error.stack || error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
};

const skipChangelog = async (page) => {
  await page.addInitScript(() => localStorage.setItem('lumapay_changelog_wave5', 'true'));
};

const mockUnauthenticatedApi = async (page) => {
  await page.route('**/api/v1/invoices**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });
  await page.route('**/api/v1/campaigns**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });
};

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  desktop.setDefaultTimeout(10_000);
  recordErrors(desktop);
  await skipChangelog(desktop);
  await mockUnauthenticatedApi(desktop);
  await desktop.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await desktop.getByRole('heading', { name: 'Pay Privately.' }).waitFor();
  await desktop.screenshot({ path: path.resolve('dist', 'lumapay-home.png'), fullPage: false });
  await desktop.goto(`${baseUrl}/explorer`, { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await desktop.getByRole('button', { name: 'Connect wallet' }).click();
  const desktopDialog = desktop.getByRole('dialog', { name: 'Connect a wallet' });
  await desktopDialog.waitFor();
  await desktopDialog.getByText('No Midnight wallet found', { exact: true }).waitFor();
  await desktopDialog.getByText('LumaPay never asks for your recovery phrase or private keys.', { exact: true }).waitFor();
  await desktop.screenshot({ path: path.resolve('dist', 'lumapay-wallet-desktop.png'), fullPage: false });
  await desktop.keyboard.press('Escape');
  await desktopDialog.waitFor({ state: 'hidden' });

  const invoiceId = '11'.repeat(32);
  const expiry = String(Math.floor(Date.now() / 1000) + 600);
  await desktop.route('**/api/v1/checkout-sessions/ui-smoke', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'ui-smoke',
        amount: 12.5,
        amount_atomic: '12500000',
        token_type: 'NIGHT',
        allowed_tokens: ['NIGHT'],
        status: 'PENDING',
        invoice_hash: invoiceId,
        salt: '55'.repeat(32),
        merchant_name: 'Luma Studio',
        merchant_address: 'mn_shield-addr_test',
        invoice_type: 0,
        payment_opening: {
          kind: 'invoice',
          invoiceId,
          amount: '12500000',
          token: 'NIGHT',
          tokenId: '00'.repeat(32),
          expiry,
          merchantPrivateIdentity: '44'.repeat(32),
          invoiceNonce: '55'.repeat(32),
          invoiceRandomness: '66'.repeat(32),
        },
        chain: {
          invoice_id: invoiceId,
          commitment: '22'.repeat(32),
          commitment_version: '1',
          expiry,
          claimed: false,
          status: 'OPEN',
          chain_status: 'OPEN',
        },
      }),
    });
  });
  await desktop.goto(`${baseUrl}/checkout/ui-smoke`, { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await desktop.getByRole('heading', { name: 'LumaPay Checkout' }).waitFor();
  await desktop.getByText('Luma Studio', { exact: true }).waitFor();
  await desktop.getByText('12.5', { exact: true }).waitFor();
  await desktop.getByRole('button', { name: 'Wallet', exact: true }).waitFor();
  await desktop.getByRole('button', { name: 'LumaPay Card', exact: true }).waitFor();
  await desktop.getByRole('button', { name: 'Gift Card', exact: true }).waitFor();
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.setDefaultTimeout(10_000);
  recordErrors(mobile);
  await skipChangelog(mobile);
  await mockUnauthenticatedApi(mobile);
  await mobile.addInitScript(() => {
    window.midnight = {
      shield: {
        name: 'Shield Wallet',
        rdns: 'io.midnight.shield',
        apiVersion: '4.0.0',
        connect: async () => { throw new Error('Connection is not exercised by this UI smoke.'); },
      },
    };
  });
  await mobile.goto(`${baseUrl}/pay`, { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await mobile.waitForTimeout(1_200);
  await mobile.getByRole('button', { name: 'Connect wallet' }).click();
  const mobileDialog = mobile.getByRole('dialog', { name: 'Connect a wallet' });
  await mobileDialog.waitFor();
  await mobileDialog.getByText('Shield Wallet', { exact: true }).waitFor();
  const sitsAtBottom = await mobileDialog.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return Math.abs(window.innerHeight - bounds.bottom) <= 1 && bounds.width === window.innerWidth;
  });
  if (!sitsAtBottom) throw new Error('The wallet dialog is not anchored as a full-width mobile bottom sheet.');
  await mobile.screenshot({ path: path.resolve('dist', 'lumapay-wallet-mobile.png'), fullPage: false });
  await mobile.close();

  if (errors.length) throw new Error(`Browser errors:\n${errors.join('\n')}`);
  console.log('UI smoke passed: preserved home, hosted checkout, desktop wallet dialog, keyboard close, and mobile bottom sheet.');
} finally {
  await browser.close();
}
