/**
 * Created by jason on 5/31/16.
 */
//require('normalize.css/normalize.css');
require('../styles/Header.scss')
import LoadingBar from 'react-redux-loading-bar'
import React from 'react'
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap'
import _ from 'lodash'
import { Link, browserHistory } from 'react-router'
import actions from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Header extends React.Component {

	agentAddClicked = (e) => {
		browserHistory.push('/agent_add')
	}

	agentListClicked = (e) => {
		browserHistory.push('/agent_list')
	}

	goodsListClicked = (e) => {
		browserHistory.push('/goods_list')
	}

	goodsAddClicked = (e) => {
		browserHistory.push('/goods_add')
	}

	leaveRegisterClicked = (e) => {
		browserHistory.push('/leave_factory_register')
	}
	loginClicked = (e) => {
		browserHistory.push('/login')
	}

	logoutClicked = (e) => {
		const {logoutByAdmin} = this.props.actions
		logoutByAdmin()
		browserHistory.push('/login')
	}

	saleListClicked = (e) => {
		browserHistory.push('/sale_list')
	}



	render() {
		return (
			<div>
				<Navbar default>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">青霜科技Admin</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavDropdown eventKey={1} title="客户管理" id="basic-nav-dropdown">
								<MenuItem eventKey={1.1}>客户列表</MenuItem>
								<MenuItem divider />
							</NavDropdown>
							<NavDropdown eventKey={2} title="代理商管理" id="basic-nav-dropdown">
								<MenuItem eventKey={2.1} onClick={this.agentAddClicked}>添加代理商</MenuItem>
								<MenuItem eventKey={2.3} onClick={this.agentListClicked}>查看代理商</MenuItem>
							</NavDropdown>
							<NavDropdown eventKey={3} title="销售管理" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1} onClick={this.leaveRegisterClicked}>出厂登记</MenuItem>
								<MenuItem eventKey={3.2} onClick={this.saleListClicked}>销售列表</MenuItem>
								<MenuItem divider />
								<MenuItem eventKey={3.3} onClick={this.goodsListClicked}>商品列表</MenuItem>
								<MenuItem eventKey={3.4} onClick={this.goodsAddClicked}>商品添加</MenuItem>
							</NavDropdown>
						</Nav>
						<Nav pullRight>
							{!!_.isEmpty(this.props.admin) ? <NavItem eventKey={1} href="#" onClick={this.loginClicked}>登录</NavItem> : <NavItem eventKey={1} href="#" onClick={this.logoutClicked}>注销</NavItem>}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

const styles = {
	progress: {
	}
}


function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {admin} = state;
	return {
		admin
	};
}

function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	return {
		actions: {
			...bindActionCreators(actions, dispatch)
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);


