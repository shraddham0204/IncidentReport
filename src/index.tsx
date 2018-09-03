import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import { View, Text, WebView } from 'react-native';
import reducers from './reducers';
import Router from './Router';
import RenderWebview from './components/RenderWebview';

class App extends Component {
    componentWillMount(){
    }
    render() {
        const store = createStore(reducers);
        return (
            <Provider store = {store} >
              <Router />
            </Provider>
        )

    }
}

export default App;