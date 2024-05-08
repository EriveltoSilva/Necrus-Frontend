import {create} from 'zustand';
import {mountStoreDevtool} from 'simple-zustand-devtools';

const useAuthStore = create((set, get)=>({
    allUserData: null,
    loading:false,
    
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
    }),

    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn : () => get().allUserData !== null,
}));
// const useAuthStore = create((set, get)=>({
//     user: null,
//     loading:false,

//     setUser: (user) => set({ user }),
//     setLoading: (loading) => set({ loading }),
//     isLoggedIn : () => get().user !== null,
// }));

// if (process.env.NODE_ENV === 'development') {
if (import.meta.env.DEV){
    mountStoreDevtool('Store', useAuthStore)
}

export {useAuthStore}