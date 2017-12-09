import axios from 'axios';

class SourceService {
    static async getSources(sources) {
        let request = await axios.get('/api/sources');
        return request.data;
    }

    static async updateSources(sources) {
        let request = await axios.post('/api/sources', sources);
        return request.data;
    }
}

export default SourceService;