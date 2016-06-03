/**
 * Created by jason on 6/2/16.
 */
require('normalize.css/normalize.css');
require('../styles/Agent.scss')
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'

var client = {
	region:'qs-manager.oss-cn-hangzhou-internal.aliyuncs.com',
	accessKeyId: 'D7wyxh0NcajbB9Bk',
	accessKeySecret: 'qIB03kCjbjC3q6WIO1rF6FQGIBr5uJ'
}

//name: String,
//	province: String,
//	phone: String,
//	city: String,
//	district: String,
//	address: String,
//	license_code: String,
//	license_url: String

class AgentAdd extends React.Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    license_url: null
    };
  }

	handleFileSelected = (e) => {
		const input = ReactDOM.findDOMNode(this._fileInput)

		if (!!input.files[0]){
			var data = new FormData()
			data.append("file", input.files[0])

			const {uploadLicense} = this.props
			uploadLicense(data).then((res) => {
				this.setState({
					license_url: `${config.domain}/images/${res.value}`
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
	render(){
		return (
			<Col xs={12} md={8} mdOffset={2}>
				<Form horizontal>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							代理商名称
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="代理商名称" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalPhone">
						<Col componentClass={ControlLabel} sm={2}>
							联系电话
						</Col>
						<Col sm={10}>
							<FormControl type="number" placeholder="联系电话" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalLicense">
						<Col componentClass={ControlLabel} sm={2}>
							营业执照
						</Col>
						<Col sm={10}>
							<FormControl type="file" id="uploaded_license_input" placeholder="License" onChange={this.handleFileSelected} ref={ref => this._fileInput = ref}/>
							{!!this.state.license_url && <img src={this.state.license_url} alt="" id="uploaded_license_pic_show"/>}
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">
								Sign in
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</Col>
		)
	}
}

export default AgentAdd