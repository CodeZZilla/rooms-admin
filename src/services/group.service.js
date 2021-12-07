import authHeader from "./auth-header";
import axios from "axios";

// const API_URL = 'http://95.217.133.188:8080/api/group';
const API_URL = 'http://localhost:8080/api/group';

class GroupService {
    getGroups() {
        return axios.get("/api/group", {
            headers: authHeader()
        });
    }

    getIdGroup(id) {
        return axios.get(`/api/group/${id}`, {
            headers: authHeader()
        });
    }

    addGroup(name, users) {
        return axios.post('/api/group/add', {
            nameGroup: name,
            users: users
        }, {
            headers: authHeader()
        });
    }

    updateGroup(id, name, users) {
        return axios.put('/api/group/' + id, {
            nameGroup: name,
            users: users
        }, {
            headers: authHeader()
        });
    }

    deleteGroup(id) {
        return axios.delete(`/api/group/${id}`, {
            headers: authHeader()
        });
    }
}

export default new GroupService();