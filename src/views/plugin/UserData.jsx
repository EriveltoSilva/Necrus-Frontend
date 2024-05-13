import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function UserData() {
    let accessToken = Cookies.get("access_token");
    let refreshToken = Cookies.get("refresh_token");

    if(accessToken && refreshToken)
    {
        const token = refreshToken;
        const decoded = jwtDecode(token);
        return decoded;
    }
}


export default UserData;