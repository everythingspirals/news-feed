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
            articles: [],
            value: '',
            filter: null
        };
    }

    componentWillMount() {
        this.getFeed(this.props.category, null);
    }

    componentWillReceiveProps(nextProps) {
        this.getFeed(nextProps.category, null);
    }

    clearFilter() {
        this.filter(null);
    }

    filter(value) {
        this.setState({
            filter: value
        });

        this.getFeed(this.props.category, value);
        
    }

    handleClick(event){
        this.filter(this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async getFeed(category, filter) {
        this.setState({
            isLoading: true
        });

        try {
            category = category || 'All';
            let articles = await NewsService.getNews(category, filter);

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
                <nav className="navbar navbar-expand-lg navbar-light bg-light filter">
                    <span className="navbar-brand" href="#">Filter</span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            {this.state.filter && <li className="nav-item">
                                <span className="nav-link">"{this.state.filter}"</span>
                            </li>}
                            {this.state.filter && <li className="nav-item">
                                <button className="btn btn-outline-secondary clear" onClick={this.clearFilter.bind(this)}>Clear</button>
                            </li>}
                        </ul>
                        <form className="form-inline ">
                            <input
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                                className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button onClick={this.handleClick.bind(this)} className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav >

                {!this.state.isLoading ?
                    <div>
                        {this.state.articles.map((article, index) => {
                            return (
                                <Article key={index} article={article} />
                            );
                        })}
                    </div> :
                    <div className="loading alert alert-warning">Loading...</div>}
            </div>
        );
    }
}

export default News;
