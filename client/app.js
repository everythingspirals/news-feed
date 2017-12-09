//Babel
import 'babel-polyfill';

//React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import Main from 'components/main/main';
import News from 'components/news/news';
import Sources from 'components/sources/sources';

class App extends Component {

    render() {
        return (
            <Router history={hashHistory}>

                <Route name="Main" path="/" component={Main}>
                    <IndexRedirect from="/" to="/All" />
                    <Route name="Sources" path="/sources" component={Sources} />
                    <Route name="News" path=":category" component={News} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;