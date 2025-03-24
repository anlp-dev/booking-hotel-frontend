import apiConfig from "../configs/apiConfig.jsx";
const AdminDiscountService = {
    async getDiscount(){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/admin_discount/list_discount`, {
                method: "GET",
                headers: apiConfig.getAuthHeaders(token),
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e);
        }
    },
    async createDiscount(dataReq) {
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/admin_discount/add_discount`, {
                method: "POST",
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(dataReq)
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e);
        }
    },
    
    async updateDiscount(id,dataReq){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/admin_discount/update_discount/${id}`, {
                method: "PUT",
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(dataReq)
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e);
        }
    },

    async deleteDiscount(id) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Đã hết hạn đăng nhập !!!");
          }
          const res = await fetch(`${apiConfig.baseUrl}/admin_discount/delete_discount/${id}`, {
            method: "DELETE",
            headers: apiConfig.getAuthHeaders(token),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Lỗi khi xóa vật tư");
          }
          return data;
        } catch (e) {
          throw new Error(e);
        }
      },
    
    // async getDiscountById(dataReq){
    //     try{
    //         const token = localStorage.getItem("token");
    //         if(!token){
    //             throw new Error("Đã hết hạn đăng nhập !!!")
    //         }
    //         const res = await fetch(`${apiConfig.baseUrl}/admin_discount/*`, {
    //             method: "GET",
    //             headers: apiConfig.getAuthHeaders(token),
    //             body: JSON.stringify(dataReq)
    //         })
    //         const data = await res.json();
    //         if(!res.ok){
    //             throw new Error(data.message);
    //         }
    //         return data;
    //     }catch (e) {
    //         throw new Error(e);
    //     }
    // }
}

export default AdminDiscountService;