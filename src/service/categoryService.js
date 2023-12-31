import httpRequest from '../utility/httpRequest';


export const getAll = async (token) => {

    try {
        return await httpRequest.get('/categories', {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi getAll categories :" + error);
    }
};

export const save = async (category, token) => {
    try {
        return await httpRequest.post("/admin/categories", category, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi save category :" + error);
    }
}
