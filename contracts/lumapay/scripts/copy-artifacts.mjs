import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const contractRoot = resolve(scriptDirectory, '..');
for (const contract of [
    'lumapay',
    'lumapay-core',
    'lumapay-campaigns',
    'lumapay-gift-cards',
    'lumapay-quote-checkout',
    'lumapay-backup-anchor',
    'lumapay-card-vault'
]) {
    const source = resolve(contractRoot, 'src', 'managed', contract);
    const destination = resolve(contractRoot, 'dist', 'managed', contract);
    mkdirSync(destination, { recursive: true });
    for (const directory of ['compiler', 'contract', 'keys', 'zkir']) {
        cpSync(resolve(source, directory), resolve(destination, directory), {
            recursive: true,
            force: true
        });
    }
}
