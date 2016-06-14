import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores/configureStore';
import App from './containers/App';
import Foo from './components/Foo'
import AgentAdd from './components/AgentAdd'
import AgentList from './components/AgentList'
import GoodsList from './components/GoodsList'
import GoodsAdd from './components/GoodsAdd'
import LeaveFactoryRegister from './components/LeaveFactoryRegister'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
	    <Route path="/" component={App}>
				<Route path="foo" component={Foo}/>
		    <Route path="agent_add" component={AgentAdd}/>
		    <Route path="agent_list" component={AgentList}/>
		    <Route path="goods_list" component={GoodsList}/>
		    <Route path="goods_add" component={GoodsAdd}/>
		    <Route path="leave_factory_register" component={LeaveFactoryRegister} />

	    </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
