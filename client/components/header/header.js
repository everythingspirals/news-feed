import React from 'react';
import axios from 'axios';

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            sources: []
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

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">News Feed</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
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
        )
    }
}

export default Header;