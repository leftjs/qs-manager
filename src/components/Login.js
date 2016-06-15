/**
 * Created by jason on 6/2/16.
 */
//require('normalize.css/normalize.css');
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
import QRCode from 'qrcode.react'




class Login extends React.Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    url: null
    };
  }

	componentWillMount() {
		const { getLoginQRCodeUrl } = this.props.actions
		getLoginQRCodeUrl().then((res) => {
			this.setState({
				url: res.value.url
			})
		})
	}


	render(){
		console.log('url', this.state.url)
		return (
				<Col xs={12} md={8} mdOffset={2}>
					{!!this.state.url && <QRCode value={this.state.url} size="400"  />}
				</Col>
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