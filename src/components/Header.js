/**
 * Created by jason on 5/31/16.
 */
//require('normalize.css/normalize.css');
import LoadingBar from 'react-redux-loading-bar'
import React from 'react'
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap'

require('../styles/Header.scss')
export default class extends React.Component {
	render() {
		return (
			<div>
				<Navbar default>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">React-Bootstrap</a>
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
								<MenuItem eventKey={2.1}>添加代理商</MenuItem>
								<MenuItem eventKey={2.3}>查看代理商</MenuItem>
							</NavDropdown>
							<NavDropdown eventKey={3} title="销售管理" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>出厂登记</MenuItem>
							</NavDropdown>
						</Nav>
						<Nav pullRight>
							<NavItem eventKey={1} href="#">注册</NavItem>
							<NavItem eventKey={2} href="#">登录</NavItem>
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

