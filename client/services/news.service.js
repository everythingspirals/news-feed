import axios from 'axios';

class NewsService {
    static async getNews(category, filter) {
        let request = await axios.get('/api/news', {
            params: {
                filter: filter,
                category: category
            }
        });
        return request.data;
    }
}

export default NewsService;