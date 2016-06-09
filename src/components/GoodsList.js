/**
 * Created by jason on 6/9/16.
 */
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl, Table, Grid, Image, Row, Thumbnail} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'

class GoodsList extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col xs={6} md={4}>
						<Thumbnail src="http://img14.poco.cn/mypoco/myphoto/20130131/22/17323571520130131221457027_640.jpg" alt="242x200">
							<h3>Thumbnail label</h3>
							<p>Description</p>
							<p>
								<Button bsStyle="primary">Button</Button>&nbsp;
								<Button bsStyle="default">Button</Button>
							</p>
						</Thumbnail>
					</Col>
					<Col xs={6} md={4}>
						<Thumbnail src="http://img14.poco.cn/mypoco/myphoto/20130131/22/17323571520130131221457027_640.jpg" alt="242x200">
							<h3>Thumbnail label</h3>
							<p>Description</p>
							<p>
								<Button bsStyle="primary">Button</Button>&nbsp;
								<Button bsStyle="default">Button</Button>
							</p>
						</Thumbnail>
					</Col>
					<Col xs={6} md={4}>
						<Thumbnail src="http://img14.poco.cn/mypoco/myphoto/20130131/22/17323571520130131221457027_640.jpg" alt="242x200">
							<h3>Thumbnail label</h3>
							<p>Description</p>
							<p>
								<Button bsStyle="primary">Button</Button>&nbsp;
								<Button bsStyle="default">Button</Button>
							</p>
						</Thumbnail>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default GoodsList