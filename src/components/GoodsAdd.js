/**
 * Created by jason on 6/2/16.
 */
//require('normalize.css/normalize.css');
require('../styles/Agent.scss')
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

var client = {
	region:'qs-manager.oss-cn-hangzhou-internal.aliyuncs.com',
	accessKeyId: 'D7wyxh0NcajbB9Bk',
	accessKeySecret: 'qIB03kCjbjC3q6WIO1rF6FQGIBr5uJ'
}

const ADDRESS_TYPE = {
	PROVINCE: 'PROVINCE',
	CITY: 'CITY',
	DISTRICT: 'DISTRICT'
}
/*
	name: String,
	contact: String,
	phone: String,
	province: String,
	city: String,
	district: String,
	address: String,
	license_code: String,
	license_url: String
*/

class GoodsAdd extends React.Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    image_url: null,
	    alertVisible: false
    };
  }

	componentWillMount() {

	}


	//name: String, // 商品名称
	//price: Number, // 商品价格
	//desc: String, // 商品描述
	//quality_guarantee: Number, // 保质期 (多少秒)

	handleSubmitClick = (e) => {
		const nameInput = ReactDOM.findDOMNode(this._nameInput)
		const priceInput = ReactDOM.findDOMNode(this._priceInput)
		const descInput = ReactDOM.findDOMNode(this._descInput)
		const qualityGuaranteeInput = ReactDOM.findDOMNode(this._qualityGuaranteeInput)

		const goodInfo = {
			name: nameInput.value,
			price: priceInput.value,
			desc: descInput.value,
			quality_guarantee: qualityGuaranteeInput.value,
			image_url: this.state.image_url
		}

		console.log("goodInfo====>>>>>", goodInfo)
		const {createGood} = this.props.actions
		createGood(goodInfo).then((res) => {
			browserHistory.push('/goods_list')
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

	handleFileSelected = (e) => {
		const input = ReactDOM.findDOMNode(this._fileInput)

		if (!!input.files[0]){
			var data = new FormData()
			data.append("file", input.files[0])

			const {uploadLicense} = this.props.actions
			uploadLicense(data).then((res) => {
				this.setState({
					image_url: `${config.domain}/images/${res.value}`
				})
			}).catch((err) => {
				alert(err.reason)
			})
		}else {
			this.setState({
				image_url: null
			})
		}
	}

	handleAlertDismiss = (e) => {
		this.setState({
			alertVisible: false
		})
	}


	render(){
		return (
			<div>
				{!!this.state.alertVisible && (
					<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
						<h4>提交失败!</h4>
						<p>请填写完整的信息或检查所填写信息是否正确</p>
					</Alert>
				)}
				<Col xs={12} md={8} mdOffset={2}>
					<Form horizontal>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								商品名称
							</Col>
							<Col sm={10}>
								<FormControl type="text" placeholder="商品名称" controlId="formHorizontalName" ref={ref => this._nameInput = ref} />
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								销售价格
							</Col>
							<Col sm={10}>
								<FormControl type="number" placeholder="销售价格" contorlId="formHorizontalPrice" ref={ref => this._priceInput = ref}/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								商品描述
							</Col>
							<Col sm={10}>
								<FormControl componentClass="textarea" type="text" placeholder="商品描述" contorlId="formHorizontalDesc" ref={ref => this._descInput = ref}/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								商品图片
							</Col>
							<Col sm={10}>
								<FormControl controlId="formHorizontalUrl" type="file" id="uploaded_license_input" placeholder="License" onChange={this.handleFileSelected} ref={ref => this._fileInput = ref}/>
								{!!this.state.image_url && <img src={this.state.image_url} alt="" id="uploaded_license_pic_show"/>}
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								保质期(天)
							</Col>
							<Col sm={10}>
								<InputGroup>
									<FormControl type="number" placeholder="保质期(天)" contorlId="formHorizontalQualityGuarantee" ref={ref => this._qualityGuaranteeInput = ref}/>
									<InputGroup.Addon>天</InputGroup.Addon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button onClick={this.handleSubmitClick}>
									提交
								</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(GoodsAdd);