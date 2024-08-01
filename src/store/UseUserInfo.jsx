import axios from 'axios';
import { create } from 'zustand'

export const UseUserInfo = create((set, get) => ({
    user: true,
    loading: false,
    setUser: (user) => {
        console.log({ user });
        // TODO - login user with server
        set({ user })
    },
    refreshToken: async () => {
        console.log('start');
        const token = localStorage.token;
        const state = get()
        console.log(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        if (!token || state.user) return;
        set({ loading: true })
        const user = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
        set({ loading: false, user })
        console.log('end');
    },
    setLoading: () => {
        const token = localStorage.token;
        if (!token || user) return;
    },
    logout: function () {
        localStorage.removeItem('token')
        set((state) => ({ user: null }))
    }
}))

