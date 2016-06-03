import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores/configureStore';
import App from './containers/App';
import Foo from './components/Foo'
import Agent from './containers/Agent'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
	    <Route path="/" component={App}>
				<Route path="foo" component={Foo}/>
				<Route path="add_agent" component={Agent}/>
	    </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
