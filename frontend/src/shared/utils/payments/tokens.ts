import { TokenCode } from '../../types/tokens';

export const TOKEN_CODE_TO_TYPE: Record<TokenCode, number> = {
    NIGHT: 0,
};

export const TOKEN_TYPE_TO_CODE: Record<number, TokenCode> = {
    0: 'NIGHT',
};

export const TOKEN_LABELS: Record<TokenCode, string> = {
    NIGHT: 'NIGHT',
};

export const PREPROD_ACTIVE_TOKENS: TokenCode[] = ['NIGHT'];
export const ANY_ALLOWED_TOKENS: TokenCode[] = [...PREPROD_ACTIVE_TOKENS];

const isTokenCode = (value: string): value is TokenCode => value === 'NIGHT';

export const getDefaultAllowedTokens = (tokenType: number): TokenCode[] => {
    if (tokenType === 3) {
        return [...ANY_ALLOWED_TOKENS];
    }

    const tokenCode = TOKEN_TYPE_TO_CODE[tokenType] || 'NIGHT';
    return [tokenCode];
};

export const getAllowedTokensForInvoice = (
    tokenType: number,
    invoiceType?: number,
    allowedTokens?: readonly string[] | null
): TokenCode[] => {
    void invoiceType;
    if (Array.isArray(allowedTokens) && allowedTokens.length > 0) {
        const normalized = allowedTokens
            .map((token) => token?.toUpperCase?.())
            .filter(isTokenCode)
            .filter((token) => PREPROD_ACTIVE_TOKENS.includes(token));
        if (normalized.length > 0) {
            return normalized;
        }
    }
    return getDefaultAllowedTokens(tokenType);
};

export const getTokenLabel = (
    tokenType: number,
    invoiceType?: number
): string => {
    void invoiceType;
    if (tokenType === 3) {
        return 'Any Token';
    }

    return TOKEN_LABELS[TOKEN_TYPE_TO_CODE[tokenType] || 'NIGHT'];
};

export const getTokenTypeFromCode = (tokenCode: TokenCode): number => TOKEN_CODE_TO_TYPE[tokenCode];

export const getTokenCodeFromType = (tokenType: number): TokenCode => TOKEN_TYPE_TO_CODE[tokenType] || 'NIGHT';
