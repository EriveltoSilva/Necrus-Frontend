import {create} from 'zustand';
import {mountStoreDevTool} from 'simple-zustand-devtools';

const useAuthStore = create((set, get)=>({
    allUserData: null,
    loading:false,
    
    user: ()=>({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
    }),
    
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    setLoggedIn : () => get().allUserData !== null,
}))


if (import.meta.env.DEV){
    mountStoreDevTool('Store', useAuthStore)
}

export {useAuthStore}