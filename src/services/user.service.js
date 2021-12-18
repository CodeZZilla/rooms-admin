import axios from "axios";
import authHeader from './auth-header';

// const API_URL = 'http://95.217.133.188:8080/api'
// const API_URL = 'http://localhost:8080/api';

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

    updateUserById(id, user) {
        return axios.put('/api/user/updateById/' + id, {
            name: user.name,
            lastName: user.lastName,
            nickname: user.nickname,
            savedApartments: user.savedApartments,
            idTelegram: user.idTelegram,
            daysOfSubscription: user.daysOfSubscription,
            rooms: user.rooms,
            userStatus: user.userStatus,
            priceMin: user.priceMin,
            priceMax: user.priceMax,
            city: user.city,
            region: user.region,
            metroNames: user.metroNames,
            todayCompilation: user.todayCompilation,
            freeCounterSearch: user.freeCounterSearch,
            type: user.type,
            language: user.language,
            email: user.email,
            phoneNumber: user.phoneNumber
        }, {
            headers: authHeader()
        });
    }

    getUserById(id) {
        return axios.get('/api/user/byId/' + id, {
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