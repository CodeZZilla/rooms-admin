import axios from "axios";

// const API_URL = 'http://95.217.133.188:8080/api/auth';
const API_URL = 'http://localhost:8080/api/auth';

class AuthService {

    login(username, password) {
        return axios.post("/api/auth/signin", {
            username,
            password
        })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();