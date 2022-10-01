import { validateURLFormat } from './url';

describe('url', () => {
    it('should return false if given URL does not have valid protocol', () => {
        expect(validateURLFormat('tutanota.com')).toBeFalsy();
        expect(validateURLFormat('www.tutanota.com')).toBeFalsy();
        expect(validateURLFormat('www.tutanota.com:8080')).toBeFalsy();
        expect(validateURLFormat('ftp://www.tutanota.com')).toBeFalsy();
    });

    it('should return false for malformed inputs', () => {
        expect(validateURLFormat(null)).toBeFalsy();
        expect(validateURLFormat('')).toBeFalsy();
        expect(validateURLFormat('www')).toBeFalsy();
        expect(validateURLFormat('tutanota')).toBeFalsy();
        expect(validateURLFormat('.com')).toBeFalsy();
        expect(validateURLFormat(':8080')).toBeFalsy();
        expect(validateURLFormat('http:')).toBeFalsy();
        expect(validateURLFormat('http://')).toBeFalsy();
        expect(validateURLFormat('https://')).toBeFalsy();
    });

    it('should return true for valid http and https URLs', () => {
        expect(validateURLFormat('https://tutanota.com')).toBe(true);
        expect(validateURLFormat('https://www.tutanota.com')).toBe(true);
        expect(validateURLFormat('https://localhost')).toBe(true);
        expect(validateURLFormat('http://localhost:9090')).toBe(true);
        expect(validateURLFormat('https://localhost:8080')).toBe(true);
    });
});