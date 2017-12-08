import express from 'express';
import cors from 'cors';

import RSSParser from './rss/rss-parser';

let app = express();

//CORS
app.use(cors())

//Static Files
app.use(express.static(__dirname + '/public'));

//API
app.get('/api/news', async (req, res) => {
    
    let filter = req.query.filter;
    let category = req.query.category;
    let page = req.query.page || 1;
    let articles = await RSSParser.getArticles(category,page);

    if (filter) {
        articles = articles.filter(article => {
            return article.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
        });
    }

    res.send(articles);
});

//Server
app.listen(3000, () => {
    console.log('Server started on port 3000.')
});