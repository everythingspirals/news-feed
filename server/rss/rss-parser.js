import sources from './rss.json';
import parser from 'rss-parser';

class RSSParser {

    static async getArticles() {
        let articles = [];

        await Promise.all(sources.map(async (source) => {
            return new Promise((resolve, reject) => {
                parser.parseURL(source.url, (err, rss) => {
                    rss.feed.entries.map(article => {
                        articles.push({
                            title: article.title,
                            img: article.enclosure.url,
                            category: source.category,
                            source: {
                                name: source.name,
                                icon: ''
                            },
                            date: article.pubDate
                        });
                    });
                    resolve();
                });
            });

            console.log(articles.length);
        }));

        return articles;
    }
}

export default RSSParser;