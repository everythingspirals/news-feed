import moment from 'moment';
import request from 'request';
import FeedParser from 'feedparser';
import jsonfile from 'jsonfile';

class RSSParser {

    static async getArticles(category, page) {
        let articles = [];

        //Get the sources from the JSON file
        var file = __dirname + '/rss.json'
        
        let sources = await new Promise((resolve, reject) => {
            jsonfile.readFile(file, (err, obj) => {
                resolve(obj);
            });
        });

        //Create a promise for each request to fufill concurrently
        await Promise.all(sources.map(async (source) => {
            if (source.category === category) {
                return new Promise(async (resolve, reject) => {

                    let req = await request(source.url);
                    let parser = new FeedParser();
                    let max = 10;

                    //On Request Error
                    req.on('error', function (error) {
                        console.log(error);
                    });

                    //On Request Success
                    req.on('response', function (res) {
                        var stream = this;

                        if (res.statusCode !== 200) {
                            this.emit('error', new Error('Bad status code'));
                        }
                        else {
                            stream.pipe(parser);
                        }
                    });

                    //On Parser Error
                    parser.on('error', function (error) {
                        console.log(error);
                    });

                    //On RSS Feed Readable
                    parser.on('readable', function () {
                        var stream = this;
                        var meta = this.meta;
                        var item;

                        max--;
                        if (max <= 0) {
                            resolve();
                            return;
                        }

                        //Normalize Article
                        while (item = stream.read()) {
                            let article = {
                                title: item.title,
                                category: source.category,
                                url: item.link,
                                content: item.summary,
                                source: {
                                    name: source.name,
                                    icon: ''
                                },
                                date: item.pubDate
                            };

                            articles.push(article);
                        }
                    });

                });
            }
        }));

        //Sort articles by date
        articles = articles.sort((a, b) => {
            return moment(b.date) - moment(a.date);
        });

        return articles;
    }
}

export default RSSParser;