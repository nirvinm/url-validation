import { getURLInfo } from "./url-info-service";

describe('url-info-service', () => {
    it('should return response', async () => {
        try {
            const response = await getURLInfo('http://tutanota.com');
            expect(response).toMatchObject({
                isValid: true,
                type: 'folder'
            });
        } catch (err) {
            expect(err.message).toEqual('network error');
        }
    });
});