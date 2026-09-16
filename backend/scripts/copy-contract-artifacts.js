import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = path.resolve(backendRoot, '..');
const source = path.join(workspaceRoot, 'contracts', 'lumapay', 'dist', 'managed');
const destination = path.join(backendRoot, 'generated', 'lumapay');

if (!existsSync(source)) {
    // Deployed environments (e.g. Render) don't carry the Compact compiler
    // toolchain and won't have contracts/lumapay/dist checked out. As long as
    // the already-built artifacts are committed at the destination, that's
    // fine to run with as-is; only fail when there's truly nothing to serve.
    if (existsSync(destination)) {
        console.log(`LumaPay contract source artifacts not found; using the already-committed artifacts at ${destination}.`);
        process.exit(0);
    }
    throw new Error('LumaPay contract artifacts are missing. Run the contract build first.');
}

mkdirSync(destination, { recursive: true });
cpSync(source, destination, { recursive: true, force: true });
console.log(`Copied LumaPay contract artifacts to ${destination}.`);
