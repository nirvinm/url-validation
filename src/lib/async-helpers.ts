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
                return Promise.reject(new Error('AbortError'));
            }
            return fn(...args).catch(err => {
                if (retries < retryAttempts) {
                    return retry(retries + 1);
                } else {
                    return Promise.reject(err);
                }
            });
        }
        return retry(0);
    }
}