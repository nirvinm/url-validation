import { getURLInfo, APIResponse, URLInfo } from "./url-info-service";

describe('url-info-service', () => {
    it('should return response', async () => {
        try {
            const response = await getURLInfo('http://tutanota.com');
            expect(response).toBeTruthy();
        } catch (err) {
            expect(err.message).toEqual('network error');
        }
    });
});