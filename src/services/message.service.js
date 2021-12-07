// const API_URL = 'http://95.217.133.188:8080/api'
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/message';


class MessageService {

    addMessage(userTelegramId, messageText) {
        return axios.post('/api/message/add', {
            userTelegramId,
            messageText
        }, {
            headers: authHeader()
        });
    }
}

export default new MessageService();