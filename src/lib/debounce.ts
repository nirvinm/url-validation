
// debounce is a higher order function that takes any function
// and returns a version of the function which delays the invocation
// until given time. This is useful for rate limiting API calls while user
// is still changing some input on UI.
export function debounce(callback: (...args: any) => void, interval: number) {
    if (interval == 0)
        throw 'debounce time cannot be zero.';

    let timeoutID: NodeJS.Timeout;
    return (...args: any) => {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            timeoutID = null;
            callback(...args);
        }, interval);
    }
}
