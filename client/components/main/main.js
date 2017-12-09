import React, { Component } from 'react';
import News from 'components/news/news';
import Header from 'components/header/header';
import './main.css';

class Main extends Component {

    render() {

        return (
            <section className="main">
                <Header />
                <section className="content container">
                    {React.cloneElement(this.props.children, { category: this.props.params.category })}
                </section>
            </section>
        );
    }
}

export default Main;
