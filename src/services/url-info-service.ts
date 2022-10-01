export type URLInfo = {
    isValid: boolean,
    type: 'file' | 'folder',
}

// Gets the information about the given URL from server.
// Currently returning mock response.
export const getURLInfo = async (url: string): Promise<URLInfo> => {
    // network fetch
    // ...
    return { // on HTTP OK
        isValid: true,
        type: 'folder'
    };
}