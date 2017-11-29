//Babel
import 'babel-polyfill';

//React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import Main from 'components/main/main';

class App extends Component {

    render() {
        return (
                <Router history={browserHistory}>
                    <Route name="Main" path="/" component={Main}/>
                </Router>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;