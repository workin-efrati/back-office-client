import './login.scss'
import { UseUserInfo } from '../../store/UseUserInfo'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
    const clientId = import.meta.env.VITE_APP_USER_ID;
    const setUser = UseUserInfo(state => state.setUser)
    const handleLoginSuccess = (userInfo) => {
        localStorage.setItem('token', userInfo.token);
        setUser(userInfo)
    };
    return (
        <div className='Login'>
            <div className='bgCover'></div>
            <div className='container'>
                <h2> התחברות</h2>
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin onLoginSuccess={handleLoginSuccess} />
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}
