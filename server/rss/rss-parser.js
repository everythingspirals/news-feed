import sources from '../public/rss/rss.json';
import parser from 'rss-parser';
import moment from 'moment';

class RSSParser {

    static async getArticles(category, page) {
        let articles = [];

        await Promise.all(sources.map(async (source) => {
            if (source.category === category || category === 'All') {
                return new Promise((resolve, reject) => {
                    let url = source.url + "?page=" + page;
                    console.log(url)
                    parser.parseURL(url, (err, rss) => {
                        rss.feed.entries.map(article => {
                            articles.push(this.parseArticle(article, source));
                        });
                        resolve();
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
        return {
            title: article.title,
            img: (article.enclosure && article.enclosure.url) || '',
            category: source.category,
            url: article.link,
            content: article.contentSnippet,
            source: {
                name: source.name,
                icon: ''
            },
            date: article.pubDate
        }
    }
}

export default RSSParser;