import { log } from "../log";

// simulate sleep for given milliseconds.
export async function sleep(timeInMilliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, timeInMilliseconds));
}

// a higher order function which takes a function that returns a Promise<TResult>
// and returns a version of the function which attempts to retry it for
// retryAttempts if the promise gets rejected. It also takes a AbortSignal in
// case retries needs to aborted for any reason.
export function withRetry<TResult>(
    fn: (...args: any) => Promise<TResult>,
    retryAttempts: number,
    abortSignal: AbortSignal) {

    return (...args: any) => {
        const retry = (retries: number): Promise<TResult> => {
            if (abortSignal.aborted) {
                log(`Aborting all retries for ${args}`);
                return Promise.reject(new Error('AbortError'));
            }
            log(`Attempt ${retries} - Initiating getURLInfo API for input ${args}`);
            return fn(...args).then(resp => {
                log(`Attempt ${retries} - Response received for input ${args}`);
                return resp;
            }).catch(err => {
                if (retries < retryAttempts) {
                    log(`Attempt ${retries} - Failed. Received ${err}`);
                    return retry(retries + 1);
                } else {
                    log(`Retries exhausted. Will not attempt anymore for input ${args}`);
                    return Promise.reject(err);
                }
            });
        }
        return retry(0);
    }
}