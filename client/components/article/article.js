import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './article.css';

class Article extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let article = this.props.article;
        let date = moment(article.date).fromNow();
        let title = article.title;
        title = title.length > 100 ? (title.slice(0, 100) + '...') : title;

        return (
            <div className='article'>
                {/* <div className={'article-image'}>
                    <img src={article.img || article.source.icon} />
                </div> */}
                <div className='article-content'>
                    <div className='article-title'>
                        <a href={article.url} target='_blank'>{title}</a>
                    </div>
                    <div className='article-subtitle'>
                        <span className="article-source">{article.source.name}</span>
                        <span className="article-date">{date}</span></div>
                    <div className='article-description' dangerouslySetInnerHTML={{ __html: article.content }}>
                 
                    </div>
                </div>
            </div>
        );
    }
}

Article.propTypes = {
    article: PropTypes.object,
};

export default Article;
