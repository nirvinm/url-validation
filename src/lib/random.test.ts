import { between, oneOf } from "./random";

describe('random', () => {
    describe('between', () => {
        it('should randomly pick a value from given range', () => {
            var [min, max] = [5000, 9000];
            for (let i = 0; i < 100; ++i) {
                const value = between(min, max);
                expect(value).toBeLessThanOrEqual(max);
                expect(value).toBeGreaterThanOrEqual(min);
            }
        });
    });

    describe('oneOf', () => {
        it('should randomly pick a value from given choices', () => {
            var choices = ['A', 'B', 'C', 'D'];
            for (let i = 0; i < 100; ++i) {
                const value = oneOf(choices);
                expect(choices).toContain(value);
            }
        });
    });
});