import express from 'express';
import articles from './articles.json';

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/api/news', (req,res) =>{
    res.send(articles);
});

app.listen(3000, () => {
    console.log('Server started on port 3000.')
});