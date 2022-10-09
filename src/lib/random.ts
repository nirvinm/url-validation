// randomly pick a number between min and max
export function between(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

// randomly pick one of the items from the given array.
export function oneOf<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
