import axios from "axios";
import authHeader from "./auth-header";

class MessageService {

    addMessage(telegramIds, messageText, time) {
        return axios.post('/api/message/add', {
            telegramIds,
            messageText,
            time
        }, {
            headers: authHeader()
        });
    }
}

export default new MessageService();