import React, { Component } from 'react';
import News from 'components/news/news';
import Header from 'components/header/header';
import './main.css';

class Main extends Component {

    render() {
        return (
            <div className="main">
                <Header />
                <div className="content container">
                    <News />
                </div>
            </div>
        );
    }
}

export default Main;
