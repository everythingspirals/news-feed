import React from 'react';
import axios from 'axios';
import './header.css';
class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            sources: [],
            collapse: true
        };
    }

    componentWillMount() {
        this.getSources();
    }

    async getSources() {
        let request = await axios.get('/rss/rss.json');
        let sources = request.data;

        this.setState({
            sources: sources
        });
    }

    collapse() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">Computer Science News</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span onClick={this.collapse.bind(this)} className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>

                <nav className="navbar navbar-expand-lg navbar-light bg-light categories">
                    <div className="container">

                        <div className={"navbar-collapse " + (this.state.collapse && " collapse")}>
                            <ul className="navbar-nav mr-auto">
                                {this.state.sources.map(source => {
                                    return (<li className="nav-item active">
                                        <a className="nav-link" href={"#/" + source.category}>{source.category} <span className="sr-only">(current)</span></a>
                                    </li>);
                                })}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;