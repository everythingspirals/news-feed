import React from 'react';
import PropTypes from 'prop-types';

import NewsService from 'services/news.service';
import Article from 'components/article/article';

import './news.css';


class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            articles: []
        };
    }

    componentWillMount() {
        this.getFeed();
    }

    async getFeed() {
        try {
            let articles = await NewsService.getNews();
            console.log(articles);
            this.setState({
                articles: articles,
                isLoading: false
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        let articles = this.state.articles;

        return (
            <div className='news'>
                {this.state.articles.map((article, index) => {
                    return (
                        <Article key={index} article={article} />
                    );
                })}
            </div>
        );
    }
}

export default News;
