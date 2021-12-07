import axios from "axios";
import authHeader from './auth-header';

// const API_URL = 'http://95.217.133.188:8080/api'
const API_URL = 'http://localhost:8080/api';

class UserService {

    getDateStatistic() {
        return axios.get("/api/admin/dateStatistic", {
            headers: authHeader()
        })
    }

    getStagesAtWhichClientsStopped() {
        return axios.get('/api/admin/stagesAtWhichClientsStopped', {
            headers: authHeader()
        });
    }

    getDataForCharts() {
        return axios.get('/api/admin/dataForChats', {
            headers: authHeader()
        });
    }

    getUsers() {
        return axios.get('/api/user', {
            headers: authHeader()
        });
    }

    deleteUser(id) {
       return axios.delete('/api/user/delete?id=' + id, {
            headers: authHeader()
        });
    }
}

export default new UserService();