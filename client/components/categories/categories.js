import React from 'react';
import axios from 'axios';

class Categories extends React.Component {
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
            <header>
                
            </header>
        )
    }
}

export default Categories;