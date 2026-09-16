import crypto from 'node:crypto';
import { AppError } from '../errors/app-error.js';

const ENVELOPE_VERSION = 1;

function encryptionKey() {
    const raw = process.env.ENCRYPTION_KEY?.trim() ?? '';
    if (!/^[0-9a-f]{64}$/i.test(raw)) {
        throw new AppError(
            'ENCRYPTION_KEY_INVALID',
            'ENCRYPTION_KEY must be exactly 32 bytes of hexadecimal.',
            500
        );
    }
    return Buffer.from(raw, 'hex');
}

export function sha256(value) {
    return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
}

export function randomToken(prefix = '') {
    return `${prefix}${crypto.randomBytes(32).toString('base64url')}`;
}

export function encrypt(value, context) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
    cipher.setAAD(Buffer.from(`lumapay:${context}:v1`, 'utf8'));
    const ciphertext = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
    return [
        ENVELOPE_VERSION,
        iv.toString('base64url'),
        cipher.getAuthTag().toString('base64url'),
        ciphertext.toString('base64url')
    ].join('.');
}

export function decrypt(envelope, context) {
    const [version, iv, tag, ciphertext] = String(envelope ?? '').split('.');
    if (Number(version) !== ENVELOPE_VERSION || !iv || !tag || !ciphertext) {
        throw new AppError('CIPHERTEXT_INVALID', 'Encrypted value has an invalid envelope.', 500);
    }
    try {
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            encryptionKey(),
            Buffer.from(iv, 'base64url')
        );
        decipher.setAAD(Buffer.from(`lumapay:${context}:v1`, 'utf8'));
        decipher.setAuthTag(Buffer.from(tag, 'base64url'));
        return Buffer.concat([
            decipher.update(Buffer.from(ciphertext, 'base64url')),
            decipher.final()
        ]).toString('utf8');
    } catch {
        throw new AppError('CIPHERTEXT_AUTHENTICATION_FAILED', 'Encrypted value failed authentication.', 500);
    }
}

export function signWebhook(secret, timestamp, body) {
    return crypto
        .createHmac('sha256', secret)
        .update(`${timestamp}.${body}`, 'utf8')
        .digest('hex');
}
