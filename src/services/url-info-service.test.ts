import { getURLInfo } from "./url-info-service";

describe('url-info-service', () => {
    it('should return response', async () => {
        const response = await getURLInfo('http://tutanota.com');
        expect(response).toMatchObject({
            isValid: true,
            type: 'folder'
        });
    });
});