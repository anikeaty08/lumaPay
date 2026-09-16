import { AppError } from '../errors/app-error.js';

const BYTES_32 = /^[0-9a-f]{64}$/i;

export function normalizeBytes32(value, label = 'identifier') {
    const normalized = String(value ?? '').trim().replace(/^0x/i, '').toLowerCase();
    if (!BYTES_32.test(normalized)) {
        throw new AppError(
            'BYTES32_INVALID',
            `${label} must be exactly 32 bytes of hexadecimal.`,
            400,
            { label }
        );
    }
    return normalized;
}

export function bytes32(value, label) {
    return Uint8Array.from(Buffer.from(normalizeBytes32(value, label), 'hex'));
}

export function hex(value) {
    return Buffer.from(value).toString('hex');
}
