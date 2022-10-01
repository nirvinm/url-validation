export const validateURLFormat = (url: string) => {
    try {
        const result = new URL(url);
        if (result.protocol != 'http:' && result.protocol != 'https:')
            return false;
        return true;
    } catch {
        return false;
    }
}