import { withRetry } from "./async-helper";

describe('async-helper', () => {
    describe('withRetry', () => {
        it('should not invoke callback more than once if the promise is resolved', () => {
            const fn = jest.fn(() => Promise.resolve());
            const ctrl = new AbortController();
            const fnWithRetry = withRetry(fn, 3, ctrl.signal);

            fnWithRetry();

            expect(fn).toBeCalledTimes(1);
        });

        it('should invoke callback given number of times if the promise keeps rejected', (done) => {
            const fn = jest.fn(() => Promise.reject());
            const ctrl = new AbortController();
            const fnWithRetry = withRetry(fn, 3, ctrl.signal);
            fnWithRetry().catch(err => -1);

            setImmediate(() => {
                expect(fn).toBeCalledTimes(4);
                done();
            });
        });

        it('should cancel retires if abort signal is sent', (done) => {
            const fn = jest.fn(() => new Promise((resolve, reject) => {
                setTimeout(() => reject('fake error'), 500);
            }));

            const ctrl = new AbortController();
            const fnWithRetry = withRetry(fn, 3, ctrl.signal);
            fnWithRetry().catch(err => expect(err.message).toEqual('AbortError'));
            ctrl.abort();

            setTimeout(() => {
                expect(fn).toBeCalledTimes(1);
                done();
            }, 3000);
        });
    });
});