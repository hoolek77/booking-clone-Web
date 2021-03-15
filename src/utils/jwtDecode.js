import jwt_decode from 'jwt-decode';

export const jwtDecode = (token) => {
    return jwt_decode(token);
}