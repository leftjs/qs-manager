/**
 * Created by jason on 6/2/16.
 */
//require('normalize.css/normalize.css');
require('../styles/Agent.scss')
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'

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

class AgentAdd extends React.Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    license_url: null,
	    province: {},
	    city: {},
	    district: {},
	    province_select: null,
	    city_select: null,
	    district_select: null
    };
  }

	componentWillMount() {
		const {getCityList} = this.props.actions
		getCityList(86).then((res) => {
			this.setState({
				province: {
					...res.value
				}
			})
		}).catch((err) => {
			console.log(err)
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
					license_url: `${config.domain}/images/${res.value}`,
					agentInfo: {
						...this.state.agentInfo,
						license_url: `${config.domain}/images/${res.value}`
					}
				})
			}).catch((err) => {
				alert(err.reason)
			})
		}else {
			this.setState({
				license_url: null
			})
		}
	}


	handleProvinceSelected = (e) => {
		//console.log('----->>>>>>', )
		this.setState({
			province_select: e.target.options[e.target.selectedIndex].text,
		})
		if (e.target.value == 0) {
			this.setState({
				city: {},
				district: {}
			})
			return
		}

		const {getCityList} = this.props.actions
		getCityList(e.target.value).then((res) => {
			this.setState({
				city: {
					...res.value
				},
				district: {}
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	handleCitySelected = (e) => {
		this.setState({
			city_select: e.target.options[e.target.selectedIndex].text,
		})
		if (e.target.value == 0 ) {
			this.setState({
				district: {}
			})
			return
		}
		const {getCityList} = this.props.actions
		const code = e.target.value
		getCityList(code).then((res) => {
			this.setState({
				district: _.values(res.value).length == 0 ? {code: this.state.city[code]} : {...res.value}
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	handleDistrictSelected = (e) => {
		this.setState({
			district_select: e.target.options[e.target.selectedIndex].text,
		})
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
	handleSubmitClick = (e) => {
		const nameInput = ReactDOM.findDOMNode(this._nameInput)
		const contactInput= ReactDOM.findDOMNode(this._contactInput)
		const phoneInput= ReactDOM.findDOMNode(this._phoneInput)
		const licenseCodeInput= ReactDOM.findDOMNode(this._licenseCodeInput)
		const addressInput= ReactDOM.findDOMNode(this._addressInput)

		const agentInfo = {
			name: nameInput.value,
			contact: contactInput.value,
			phone: phoneInput.value,
			province: this.state.province_select,
			city: this.state.city_select,
			district: this.state.district_select,
			address: addressInput.value,
			license_code: licenseCodeInput.value,
			license_url: this.state.license_url
		}

		console.log("agentInfo====>>>>>", agentInfo)
		const {registerAgent} = this.props.actions
		registerAgent(agentInfo)
	}


	/**
	 * render地址省份
	 */
	renderAddressOption = (type) => {
		let provinceArr = []
		let cityArr = []
		let districtArr = []
		const {province, city, district} = this.state
		switch (type) {
			case ADDRESS_TYPE.PROVINCE:
				for (let [k, v] of _.toPairs(province)) {
					provinceArr.push(<option value={k} key={k}>{v}</option>)
				}
				return provinceArr
				break
			case ADDRESS_TYPE.CITY:
				for (let [k, v] of _.toPairs(city)) {
					cityArr.push((<option value={k} key={k}>{v}</option>))
				}
				return cityArr
				break
			case ADDRESS_TYPE.DISTRICT:
				for (let [k, v] of _.toPairs(district)) {
					districtArr.push(<option value={k} key={k}>{v}</option>)
				}
				return districtArr
				break
			default:
				return null
				break
		}
	}


	render(){
		return (
			<Col xs={12} md={8} mdOffset={2}>
				<Form horizontal>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							代理商名称
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="代理商名称" controlId="formHorizontalName" ref={ref => this._nameInput = ref} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							联系人
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="联系人" contorlId="formHorizontalContact" ref={ref => this._contactInput = ref}/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							联系电话
						</Col>
						<Col sm={10}>
							<FormControl type="tel" placeholder="联系电话" contorlId="formHorizontalPhone" ref={ref => this._phoneInput = ref}/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							营业执照编号
						</Col>
						<Col sm={10}>
							<FormControl type="tel" placeholder="营业执照编号" contorlId="formHorizontalLicenseCode" ref={ref => this._licenseCodeInput = ref}/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							营业执照
						</Col>
						<Col sm={10}>
							<FormControl controlId="formHorizontalUrl" type="file" id="uploaded_license_input" placeholder="License" onChange={this.handleFileSelected} ref={ref => this._fileInput = ref}/>
							{!!this.state.license_url && <img src={this.state.license_url} alt="" id="uploaded_license_pic_show"/>}
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalAddress">
						<Col componentClass={ControlLabel} sm={2}>
							公司地址
						</Col>
						<Col sm={2}>
							<FormControl componentClass="select" onChange={this.handleProvinceSelected} controlId="formHorizontalAddressProvince">
								<option value="0">
									---省份---
								</option>
								{this.renderAddressOption(ADDRESS_TYPE.PROVINCE)}
							</FormControl>
						</Col>
						<Col sm={2}>
							<FormControl componentClass="select" controlId="formHorizontalAddressCity" onChange={this.handleCitySelected}>
								<option value="0">
									---城市---
								</option>
								{this.renderAddressOption(ADDRESS_TYPE.CITY)}
							</FormControl>
						</Col>
						<Col sm={2}>
							<FormControl componentClass="select" controlId="formHorizontalAddressDistrict" onChange={this.handleDistrictSelected}>
								<option value="0">
									---地区---
								</option>
								{this.renderAddressOption(ADDRESS_TYPE.DISTRICT)}
							</FormControl>
						</Col>
						<Col sm={4}>
							<FormControl type="text" placeholder="详细地址" controlId="formHorizontalAddressDetail" ref={ref => this._addressInput = ref}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(AgentAdd);