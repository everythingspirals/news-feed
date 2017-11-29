import express from 'express';
import RSSParser from './rss/rss-parser';

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/api/news', async (req,res) =>{
    let articles = await RSSParser.getArticles();
    res.send(articles);
});

app.listen(3000, () => {
    console.log('Server started on port 3000.')
});