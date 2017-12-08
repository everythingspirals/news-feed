import React, { Component } from 'react';
import News from 'components/news/news';
import Header from 'components/header/header';
import Categories from 'components/categories/categories';
import Filter from 'components/filter/filter';
import './main.css';

class Main extends Component {

    componentWillMount() {
        console.log(this.props);
    }
    render() {

        return (
            <section className="main">
                <Header />
                <Categories />
                <section className="content container">
                    <Filter />
                    <News category={this.props.params.category} />
                </section>
            </section>
        );
    }
}

export default Main;
