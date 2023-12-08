import httpRequest from '../utility/httpRequest';

export const updateShown = (id, shown, token) => {
    try {
        httpRequest
            .patch(`/auth/variants/${id}`, shown, {
                "headers": {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then();
    } catch (error) {
        console.log("Axios lỗi variantService updateShown :" + error);
    }
}