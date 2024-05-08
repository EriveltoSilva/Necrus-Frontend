import axios from './axios'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useAuthStore } from '../store/auth'


export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post("user/token/", {
            email,
            password,
        })
        if (status === 200) {
            setAuthUser(data.access, data.refresh)
        }
        return { data, error: null };

    } catch (error) {
        console.log(error);
        return {
            data: null,
            error: error.response.data?.detail || "Algo deu errado recuperando os dados de login"
        };
    }
}



export const register = async (full_name, email, phone, password, confirmation_password) => {
    try {
        const { data } = await axios.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            confirmation_password
        })

        await login(email, password)


        return {
            data,
            error: null
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            error: error.response.data?.detail || "Algo deu errado fazendo o registro dos dados do user"
        };
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    useAuthStore.getState().setUser(null)

}

export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        try {
            const response = await getRefreshToken(refreshToken);
            setAuthUser(response.access, response.refresh);
        } catch (error) {
            console.error(error);
            logout();
        }
    }
    else {
        const user = jwt_decode(accessToken);
        if (user) {
            useAuthStore.getState().setUser(user);
        }
        setAuthUser(accessToken, refreshToken)
    }
}

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, { expires: 1, secure: true});
    Cookies.set('refresh_token', refresh_token, {expires: 7,secure: true})

    const user = jwt_decode(access_token) ?? null;
    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
}

export const getRefreshToken = async (refresh_token) => {
    const response = await axios.post('user/token/refresh/', {
        refresh: refresh_token,
    });
    return response.data
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodeToken = jwt_decode(accessToken);
        return decodeToken.exp < Date.now() / 1000;
    } catch (error) {
        console.log(error);
        return true
    }
}