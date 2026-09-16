import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const forbidden = [
    /@provablehq\//i,
    new RegExp(`\\b${'a' + 'leo'}\\b`, 'i'),
    /\bbhp256\b/i,
    /transfer_private/i,
    new RegExp(`credits\\.${'a' + 'leo'}`, 'i')
];
const failures = [];

function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (entry.name === 'node_modules') continue;
        const absolute = path.join(directory, entry.name);
        if (entry.isDirectory()) scan(absolute);
        else if (/\.(?:js|mjs|json)$/.test(entry.name)) {
            const source = readFileSync(absolute, 'utf8');
            if (forbidden.some((pattern) => pattern.test(source))) {
                failures.push(path.relative(backendRoot, absolute));
            }
        }
    }
}

scan(path.join(backendRoot, 'src'));
if (failures.length > 0) {
    console.error(`Legacy chain references remain in backend files: ${failures.join(', ')}`);
    process.exitCode = 1;
} else {
    console.log('Backend contains no legacy-chain execution dependencies.');
}
