import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonfile from 'jsonfile';

import RSSParser from './rss/rss-parser';

let app = express();

//CORS
app.use(cors())
app.use(bodyParser.json())

//Static Files
app.use(express.static(__dirname + '/public'));

//API

//News
app.get('/api/news', async (req, res) => {

    let filter = req.query.filter;
    let category = req.query.category;
    let page = req.query.page || 1;
    let articles = await RSSParser.getArticles(category, page);

    if (filter) {
        articles = articles.filter(article => {
            return article.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
        });
    }

    res.send(articles);
});

//Sources
app.get('/api/sources', async (req, res) => {
    var file = __dirname + '/rss/rss.json'
    await jsonfile.readFile(file, (err, obj) => {
        res.send(obj);
    })
});

//Sources
app.post('/api/sources', async (req, res) => {

    let sources = req.body;
    var file = __dirname + '/rss/rss.json'
    await jsonfile.writeFile(file, sources, (err) => {
        console.error(err)
    })

    res.send(sources);
});


//Server
app.listen(3000, () => {
    console.log('Server started on port 3000.')
});