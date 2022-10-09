import { sleep } from "../lib/async-helpers";
import { between, oneOf } from "../lib/random";

export type URLInfo = {
    url: string,
    isValid: boolean,
    type: 'file' | 'folder',
}

// Gets the information about the given URL from server.
// Currently returning mock response.
export const getURLInfo = async (url: string): Promise<URLInfo> => {
    // simulated network fetch
    // simulate network latency using sleep
    const randomWaitTime = between(300, 2000); // pick random delay between 300 ms - 2 secs
    await sleep(randomWaitTime);

    const result = oneOf(['success', 'error']);
    if (result === 'success') {
        // received response from server, resolve the promise
        return { // on HTTP OK
            url: url,
            isValid: true,
            type: 'folder'
        };
    } else {
        // cannot contact server, reject the promise
        throw new Error('network error');
    }
}