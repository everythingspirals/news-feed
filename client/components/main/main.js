import React, { Component } from 'react';
import News from 'components/news/news';
import Header from 'components/header/header';
import Filter from 'components/filter/filter';
import './main.css';

class Main extends Component {

    componentWillMount() {
        console.log(this.props);
    }
    render() {

        return (
            <div className="main">
                <Header />
                <div className="content container">
                    <Filter />
                    <News category={this.props.params.category} />
                </div>
            </div>
        );
    }
}

export default Main;
