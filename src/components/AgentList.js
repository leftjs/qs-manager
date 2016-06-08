/**
 * Created by jason on 6/6/16.
 */
require("../styles/Agent.scss")
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl, Table} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'

class AgentList extends React.Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    editId: undefined,
	    editModel: undefined
    };
  }

	componentWillMount() {
		const {getAgentList} = this.props.actions
		getAgentList()
	}



	//name: String,
//	contact: String,
//	phone: String,
//	province: String,
//	city: String,
//	district: String,
//	address: String,
//	license_code: String,
//	license_url: String
	_renderAgentList = (agentList) => {
		console.log('agentList', agentList)
		var renderArr = []
		_.forEach(agentList, (value,key) => {
			//console.log('key-->>>', key, 'value-->>', value)
			const handleDoubleClick = (e) => {
				//var dom = ReactDOM.findDOMNode(e.target)
				//console.log(dom.text)
				this.setState({
					editId: key,
					editModel: value
				})
			}

			const handleNameInputChange = (e) => {
				this.setState({
					editModel: {
						...this.state.editModel,
						name: e.target.value
					}
				})
			}

			const handleContactInputChange = (e) => {
				this.setState({
					editModel: {
						...this.state.editModel,
						contact: e.target.value
					}
				})
			}
			const handlePhoneInputChange = (e) => {
				this.setState({
					editModel: {
						...this.state.editModel,
						phone: e.target.value
					}
				})
			}
			const handleAddressInputChange = (e) => {
				this.setState({
					editModel: {
						...this.state.editModel,
						address: e.target.value
					}
				})
			}
			const handleLicenseCodeInputChange = (e) => {
				this.setState({
					editModel: {
						...this.state.editModel,
						license_code: e.target.value
					}
				})
			}

			const {editId} = this.state
			renderArr.push(
				<tr>
					<td>{key}</td>
					<td onDoubleClick={handleDoubleClick}>{editId != key ? value.name : <FormControl md={1} className="table_inline_input" type="text" defaultValue={value.name} onChange={handleNameInputChange}/>}</td>
					<td onDoubleClick={handleDoubleClick}>{editId != key ? value.contact : <FormControl className="table_inline_input" type="text" defaultValue={value.contact} onChange={handleContactInputChange}/>}</td>
					<td onDoubleClick={handleDoubleClick}>{editId != key ? value.phone : <FormControl className="table_inline_input" type="text" defaultValue={value.phone} onChange={handlePhoneInputChange}/>}</td>
					<td><span className="table_span">{value.province}</span></td>
					<td><span className="table_span">{value.city}</span></td>
					<td><span className="table_span">{value.district}</span></td>
					<td onDoubleClick={handleDoubleClick}>{editId != key ? value.address : <FormControl className="table_inline_input" type="text" defaultValue={value.address} onChange={handleAddressInputChange}/>}</td>
					<td onDoubleClick={handleDoubleClick}>{editId != key ? value.license_code : <FormControl className="table_inline_input" type="text" defaultValue={value.license_code} onChange={handleLicenseCodeInputChange}/>}</td>
					<td>{!!value.license_url ? <Button className="table_inline_button" bsClass="btn" bsStyle="link" target="_black" href={value.license_url}>查看</Button> : "未上传"}</td>
					<td>{editId == key ? <Button className="table_inline_button" bsStyle="info">保存</Button> : <Button className="table_inline_button" bsStyle="danger">删除</Button> }</td>
				</tr>
			)
		})
		return renderArr
	}
	render() {
		//console.log(this.props.agent)
		return (
			<Col md={10} mdOffset={1} xs={12}>
				<Table responsive >
					<thead>
						<tr>
							<th>编号</th>
							<th>代理商名称</th>
							<th>联系人</th>
							<th>联系电话</th>
							<th>省份</th>
							<th>城市</th>
							<th>地区</th>
							<th>公司地址</th>
							<th>营业执照编号</th>
							<th>营业执照</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{this._renderAgentList(this.props.agent)}
					</tbody>
				</Table>
			</Col>
		)
	}
}

//<tr>
//	<td>1</td>
//	<td><FormControl className="table_inline_input" type="text" value="中原地产"/></td>
//	<td>张加胜</td>
//	<td>18205253786</td>
//	<td>江苏</td>
//	<td>扬州</td>
//	<td>汊河</td>
//	<td>南邮通达</td>
//	<td>1asdfasdfasdfasdf</td>
//	<td><Button className="table_inline_button" bsClass="btn" bsStyle="link" target="_black" href="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png">查看</Button></td>
//	<td><Button className="table_inline_button" bsStyle="danger">删除</Button></td>
//</tr>

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {agent} = state;
	return {
		agent
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
export default connect(mapStateToProps, mapDispatchToProps)(AgentList);