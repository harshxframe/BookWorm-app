import { create } from "zustand";
import { loginAPI } from "../constant/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useAuthStore = create((set) => ({
    isLoading: false,
    token: null,
    register: async (username, email, password) => {
        try {
            set({isLoading:true});
            const response = await fetch(loginAPI, {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password
                })
            })
            
            const data = await response.json();
            if (!response.ok) {
                console.log("RESPONSE ERROR");
                set({isLoading:false});
                return { "error": true, "data": {}, "message": "Server error" };
            } else {
                if (data.error) {
                    console.log("User Already Exist");
                    set({isLoading:false});
                    return { "error": true, "data": {}, "message": data.message };
                } else {
                    await AsyncStorage.setItem(
                        'token',
                        data.data.token,
                    );
                    set({isLoading:false})
                    console.log("SUCCESS");
                    return { "error": false, "data": data, "message": data.message };
                }

            }

        } catch (e) {
            set({isLoading:false})
            console.log("Error"+e);
            return { "error": true, "data": {}, "message": e };
        }
    }
}))