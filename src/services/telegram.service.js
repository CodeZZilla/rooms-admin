import axios from "axios";

const botToken = '2069670508:AAFR_4gwUKymhGc7oiTLvq17d-nyYm6mY6A';

class TelegramService {

    sendMessage(chatId, text) {
        return axios.get(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`);
    }
}

export default new TelegramService();