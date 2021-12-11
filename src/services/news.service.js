import axios from "axios";
import authHeader from "./auth-header";

class NewsService {
    getAll() {
        return axios.get("/api/news", {
            headers: authHeader()
        });
    }

    getOne(id) {
        return axios.get("/api/news/" + id, {
            headers: authHeader()
        });
    }

    addNews(title, link, imageUrl, text) {
        return axios.post('/api/news/add', {
            link,
            title,
            text,
            imageUrl
        }, {
            headers: authHeader()
        });
    }

    updateNews(id, title, link, imageUrl, text) {
        return axios.put('/api/news/update/' + id, {
            link,
            title,
            text,
            imageUrl
        }, {
            headers: authHeader()
        });
    }

    deleteNews(id) {
        return axios.delete('/api/news/delete/' + id, {
            headers: authHeader()
        });

    }

}

export default new NewsService();