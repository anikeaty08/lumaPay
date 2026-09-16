const REDACTED_KEYS = /secret|password|mnemonic|seed|ciphertext|authorization|api.?key/i;

function sanitize(value, depth = 0) {
    if (depth > 5) return '[MAX_DEPTH]';
    if (value instanceof Error) {
        return { name: value.name, message: value.message, code: value.code };
    }
    if (Array.isArray(value)) return value.map((item) => sanitize(item, depth + 1));
    if (!value || typeof value !== 'object') return value;

    return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [
            key,
            REDACTED_KEYS.test(key) ? '[REDACTED]' : sanitize(item, depth + 1)
        ])
    );
}

function write(level, event, context = {}) {
    const line = {
        timestamp: new Date().toISOString(),
        level,
        event,
        ...sanitize(context)
    };
    const output = JSON.stringify(line);
    if (level === 'error') console.error(output);
    else if (level === 'warn') console.warn(output);
    else console.log(output);
}

export const logger = Object.freeze({
    info: (event, context) => write('info', event, context),
    warn: (event, context) => write('warn', event, context),
    error: (event, context) => write('error', event, context)
});
