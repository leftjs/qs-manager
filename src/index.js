import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores/configureStore';
import App from './containers/App';
import Foo from './components/Foo'
import AgentAdd from './components/AgentAdd'
import AgentList from './components/AgentList'
import GoodsList from './components/GoodsList'
import GoodsAdd from './components/GoodsAdd'
import Login from './components/Login'
import LeaveFactoryRegister from './components/LeaveFactoryRegister'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import {requireAuthentication} from './components/requireAuthentication';
import SaleList from './components/SaleList'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

//const UserIsAuthenticated = UserAuthWrapper({
//	authSelector: state => state.user, // how to get the user state
//	redirectAction: routerActions.replace, // the redux action to dispatch for redirect
//	wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
//})

function requireAuth(nextState, replace) {
	console.log('nextState', nextState)
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		})

}

render(
  <Provider store={store}>
    <Router history={history}>
	    <Route path="/" component={App}>
		    <Route path="login" component={Login}/>
		    <Route path="agent_add" component={requireAuthentication(AgentAdd)}/>
		    <Route path="agent_list" component={requireAuthentication(AgentList)}/>
		    <Route path="goods_list" component={requireAuthentication(GoodsList)}/>
		    <Route path="goods_add" component={requireAuthentication(GoodsAdd)}/>
		    <Route path="leave_factory_register" component={requireAuthentication(LeaveFactoryRegister)} />
		    <Route path="sale_list" component={requireAuthentication(SaleList)} />
	    </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
