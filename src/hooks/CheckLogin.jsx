import { useEffect, useState } from "react";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import axios from "axios";
import LoadingPage from "../pages/LoadingPage/loadingPage";
import { UseUserInfo } from "../store/UseUserInfo";

export default function CheckLogin() {
    const user = UseUserInfo(state => state.user)
    const loading = UseUserInfo(state => state.loading)
    const refreshToken = UseUserInfo(state => state.refreshToken)

    // TODO - 

    const [pageState, setPageState] = useState({
        loggedIn: false,
        loading: false
    })

    const reqLogin = async () => {
        if (!token || user) return;
        try {
            // TODO - 
            setPageState({ ...pageState, loading: true })
            const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
            setPageState({ ...pageState, loading: false })
            const userInfo = userInfoResponse.data;
            setPageState({ ...pageState, loggedIn: true })
        } catch (error) {
            console.error('Error getting user info:', error);
            setPageState({ ...pageState, loading: false })
        }
    }
    useEffect(() => {
        refreshToken()
    }, [])


    return (
        <>
        <Home/>
        {loading ? <LoadingPage/> :
        user ? <Home /> : <Login />}
        </>
    )
}
