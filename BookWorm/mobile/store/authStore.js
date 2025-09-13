import { create } from "zustand";
import { loginAPI } from "../constant/api.js";

export const useAuthStore = create((set) => ({
    isLoading: false,
    token: null,
    register: async (username, email, password) => {
        set({ isLoading: true })
        try {
            console.log("Process started in main thred");
            const response = await fetch(loginAPI, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, email, password })
            })
           
        if(response.ok){
         const data = await response.json();
         if(data.error){
            return {"error":true,"message":data.message};
         }else{
           return {"error":false,"message":data.message, "data":data.data};
         }

        }else{

            return {"error":true,"message":"Reponse not satified"};
        }


        } catch (e) {
            return {"error":true,"message":e};
        }
    }

}));