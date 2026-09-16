export class AppError extends Error {
    constructor(code, message, status = 500, details) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}

export function asAppError(error) {
    if (error instanceof AppError) return error;
    return new AppError('INTERNAL_ERROR', 'An unexpected error occurred.', 500, {
        cause: error instanceof Error ? error.message : String(error)
    });
}
