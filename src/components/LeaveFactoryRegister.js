/**
 * Created by jason on 6/6/16.
 */
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'


class LeaveFactoryRegister extends React.Component {
	render() {
		return (
			<div>
				leave
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
export default connect(mapStateToProps, mapDispatchToProps)(LeaveFactoryRegister);


