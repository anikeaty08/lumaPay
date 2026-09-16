import { access, cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const managedRoot = path.resolve(frontendRoot, '..', 'contracts', 'lumapay', 'dist', 'managed');
const modules = [
  'lumapay-core',
  'lumapay-campaigns',
  'lumapay-gift-cards',
  'lumapay-quote-checkout',
  'lumapay-backup-anchor'
];

// Deployed builds (e.g. Vercel) don't carry the Compact compiler toolchain and
// won't have contracts/lumapay/dist checked out. The committed artifacts
// already under public/zk are what ships in that case, so skip the refresh
// instead of deleting them out from under a source that doesn't exist.
const sourceAvailable = await access(managedRoot).then(() => true, () => false);
if (!sourceAvailable) {
  console.log(`ZK artifact source not found at ${managedRoot}; keeping the already-committed artifacts under public/zk.`);
} else {
  for (const module of modules) {
    const source = path.join(managedRoot, module);
    const destination = path.join(frontendRoot, 'public', 'zk', module);
    await rm(destination, { recursive: true, force: true });
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination, { recursive: true });
  }
}
