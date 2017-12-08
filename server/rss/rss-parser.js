import sources from '../public/rss/rss.json';
import parser from 'rss-parser';
import moment from 'moment';
import FeedMe from 'feedme';
import request from 'request';
import FeedParser from 'feedparser';

class RSSParser {

    static async getArticles(category, page) {
        let articles = [];


        await Promise.all(sources.map(async (source) => {
            if (source.category === category) {
                return new Promise(async (resolve, reject) => {

                    let req = await request(source.url);
                    console.log(req);
                    let parser = new FeedParser();
                    let max = 10;

                    req.on('error', function (error) {
                        console.log(error);
                    });

                    req.on('response', function (res) {
                        var stream = this;

                        if (res.statusCode !== 200) {
                            this.emit('error', new Error('Bad status code'));
                        }
                        else {
                            stream.pipe(parser);
                        }
                    });

                    parser.on('error', function (error) {
                        console.log(error);
                    });

                    parser.on('readable', function () {
                        var stream = this;
                        var meta = this.meta;
                        var item;

                        max--;
                        if (max <= 0) {
                            resolve();
                            return;
                        }

                        while (item = stream.read()) {
                            console.log(item);
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

        articles = articles.sort((a, b) => {
            return moment(b.date) - moment(a.date);
        });

        return articles;
    }

    static parseArticle(article, source) {
        console.log(article.title)
        return
    }
}

export default RSSParser;