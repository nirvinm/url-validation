import { debounce } from './debounce';

describe('debounce', () => {
    it('should not invoke callback more than once in the debounce interval', (done) => {
        const fn = jest.fn();
        const debouncedFn = debounce(fn, 500);

        for (let i = 0; i < 10; ++i) {
            debouncedFn();
        }

        setTimeout(() => {
            expect(fn).toHaveBeenCalledTimes(1);
            done();
        }, 600);
    });

    it('should not accept 0 as debounce interval', () => {
        const fn = jest.fn();
        expect(() => debounce(fn, 0)).toThrow();
    });
});