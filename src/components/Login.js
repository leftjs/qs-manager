/**
 * Created by jason on 6/2/16.
 */
//require('normalize.css/normalize.css');
require("../styles/Login.scss")
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl, InputGroup, Alert} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'
import {browserHistory} from 'react-router'




class Login extends React.Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    url: null,
	    alertVisible: false
    };
  }

	componentWillMount() {

	}

	handleLoginClicked = (e) => {
		const usernameInput = ReactDOM.findDOMNode(this._usernameInput)
		const passwordInput = ReactDOM.findDOMNode(this._passwordInput)
		const prePath = this.props.location.search.split('=')[1]


		const {loginByAdmin} = this.props.actions
		loginByAdmin({
			username: usernameInput.value,
			password: passwordInput.value
		}).then((res) => {
			browserHistory.push(!!prePath ? prePath : '/')
		}).catch((err) => {
			this.setState({
				alertVisible: true
			})
			setTimeout(() => {
				this.setState({
					alertVisible: false
				})
			}, 2000)
		})

	}

	render(){
		return (
			<div>
				{!!this.state.alertVisible && (
					<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
						<h4>登录失败!</h4>
						<p>请检查用户名或密码是否正确</p>
					</Alert>
				)}
				<Col xs={12} md={8} mdOffset={2} >
					<h2>青霜科技后台管理系统</h2>
				</Col>
				<Col xs={12} md={8} mdOffset={2} id="_loginForm">
					<Form horizontal>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2} smOffset={2}>
								用户名
							</Col>
							<Col sm={6}>
								<FormControl type="text" placeholder="用户名" contorlId="formHorizontalUsername" ref={ref => this._usernameInput = ref}/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2} smOffset={2}>
								密码
							</Col>
							<Col sm={6}>
								<FormControl type="password" placeholder="密码" contorlId="formHorizontalPassword" ref={ref => this._passwordInput = ref}/>
							</Col>
						</FormGroup>
						<FormGroup >
							<Col sm={8} smOffset={2} id="_loginButton" >
								<Button onClick={this.handleLoginClicked}>登录</Button>
							</Col>
						</FormGroup>
					</Form>
				</Col>
			</div>

		)
	}
}

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const props = {};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	return {
		actions: {
			...bindActionCreators(actions, dispatch)
		}
	}


}
export default connect(mapStateToProps, mapDispatchToProps)(Login);