import { sleep } from "../lib/async-helpers";
import { between, oneOf } from "../lib/random";

export type APIError = {
    error_code: string,
    message: string,
}

export type APIResponse<TData> = {
    data: TData,
    error?: APIError,
}

export type URLInfo = {
    url: string,
    type: 'file' | 'folder',
}

// Gets the information about the given URL from server.
// Currently returning mock response.
export const getURLInfo = async (url: string): Promise<APIResponse<URLInfo>> => {
    // simulated network fetch
    // simulate network latency using sleep
    const randomWaitTime = between(300, 2000); // pick random delay between 300 ms - 2 secs
    await sleep(randomWaitTime);

    if (oneOf(['success', 'error']) === 'success') {
        // received response from server, resolve the promise
        return oneOf([{
            data: {
                url: url,
                type: oneOf(['file', 'folder']),
            },
        }, {
            data: null,
            error: {
                error_code: 'invalid_url',
                message: `Sorry, this URL ${url} is not valid`
            }
        }]);
    } else {
        // cannot contact server, reject the promise
        throw new Error('network error');
    }
}