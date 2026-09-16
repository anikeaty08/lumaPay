export const NETWORK_ID = 'preprod';

export const CONTRACTS = Object.freeze({
  'invoice-core': import.meta.env.VITE_LUMAPAY_INVOICE_CORE_CONTRACT_ADDRESS || '252404b3ad5a4f02071bb59d3631a86419cf6c6d1b995ccebe78399fe44000b2',
  campaigns: import.meta.env.VITE_LUMAPAY_CAMPAIGNS_CONTRACT_ADDRESS || 'c7ecd023012aaa863f6c8150d55366aed88e2347f47affbb1c71ccdb5dfbd43a',
  'gift-cards': import.meta.env.VITE_LUMAPAY_GIFT_CARDS_CONTRACT_ADDRESS || '5600a4fc947cc5f56f8c2c8540de86e744f74f01e7befd400f7fd7ce41097d37',
  'quote-checkout': import.meta.env.VITE_LUMAPAY_QUOTE_CHECKOUT_CONTRACT_ADDRESS || 'b75d261021ec1b56b68ff7167e811f7fdd3bf97e17ae26fb1188a8cb7b2c886a',
  'backup-anchor': import.meta.env.VITE_LUMAPAY_BACKUP_ANCHOR_CONTRACT_ADDRESS || '9b9879c4d0c3aa79ec6dbea8e6b1fe8b4c7391ad5cfa319eb7f0a34bd1e0b16d',
  'card-vault': import.meta.env.VITE_LUMAPAY_CARD_VAULT_CONTRACT_ADDRESS || ''
});

export const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
