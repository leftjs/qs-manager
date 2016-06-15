/**
 * Created by jason on 6/6/16.
 */
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl, Panel, Table} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'


class LeaveFactoryRegister extends React.Component {
// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    alertVisible: false,
	    goodId: null,
	    agentId: null
    };
  }

	componentWillMount() {
		const {getAgentList, getGoods, getLeaveFactory, getSingleAgentInfo, getSingleGoodInfo} = this.props.actions
		getAgentList()
		getGoods()
		getLeaveFactory().then((res) => {
			//_.forEach(res.value, function(value) {
			//	console.log('value', value)
			//	getSingleAgentInfo(value.agentId)
			//	getSingleGoodInfo(value.goodId)
			//})
		}).catch((err) => {
			alert(err)
		})

	}


	handleGoodSelectChanged = (e) => {
		this.setState({
			goodId: e.target.value
		})
	}


	handleAgentSelectChanged = (e) => {
		this.setState({
			agentId: e.target.value
		})
	}

	handleLeaveButtonClicked = (e) => {
		const {leaveFactoryRegister} = this.props.actions
		const leaveCountInput = ReactDOM.findDOMNode(this._leaveCountInput)

		leaveFactoryRegister({
			goodId: this.state.goodId,
			agentId: this.state.agentId,
			leaveCount: leaveCountInput.value
		})
	}
	render() {
		const renderAgentsOption = () => {
			const {agents} = this.props
			var renderArr = []

			_(agents).forEach((value,key) => {
				renderArr.push(
					<option value={value._id} key={key}>{value.name} - {value.province} - {value._id}</option>
				)
			})

			return renderArr
		}

		const renderGoodsOption = () => {
			const {goods} = this.props
			var renderArr = []

			_(goods).forEach((value,key) => {
				renderArr.push(
					<option value={value._id} key={key}>{value.name} - {value.price}元 - {value.quality_guarantee}天 - {value._id}</option>
				)
			})

			return renderArr
		}

		const renderLeaveFactoryTableCell = () => {
			const {agents, goods, leaveRecords} = this.props
			var renderArr = []
			_.forEach(leaveRecords, function(value,key) {
				const agent = _.find(agents, function(inline) {
					return inline._id == value.agentId
				})
				const good = _.find(goods, function(inline) {
					return inline._id == value.goodId
				})
				renderArr.push(
					<tr key={key}>
						<td>{value._id}</td>
						<td>{!!agent && agent.name}</td>
						<td>{!!agent && agent.province}</td>
						<td>{!!good && good.name}</td>
						<td>{value.leaveCount}</td>
						<td>{value.leaveDate}</td>
					</tr>
				)
			})
			return renderArr
		}
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

						<FormGroup controlId="formHorizontalAgent">
							<Col componentClass={ControlLabel} sm={2}>
								代理商
							</Col>
							<Col sm={10}>
								<FormControl componentClass="select" controlId="formHorizontalAgent" onChange={this.handleAgentSelectChanged}>
									<option value="">-- 请选择 --</option>
									{renderAgentsOption()}
								</FormControl>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalGood">
							<Col componentClass={ControlLabel} sm={2}>
								商品
							</Col>
							<Col sm={10}>
								<FormControl componentClass="select" controlId="formHorizontalGood" onChange={this.handleGoodSelectChanged}>
									<option value="">-- 请选择 --</option>
									{renderGoodsOption()}
								</FormControl>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2} contorlId="formHorizontalCount">
								出库数量
							</Col>
							<Col sm={10}>
								<FormControl type="number" placeholder="出库数量" contorlId="formHorizontalCount" ref={ref => this._leaveCountInput = ref}/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button onClick={this.handleLeaveButtonClicked}>
									出库
								</Button>
							</Col>
						</FormGroup>
					</Form>
				</Col>
				<Col xs={12} md={12} >

					<Panel header="出库记录">
						<Table responsive striped bordered condensed hover>
							<thead>
								<tr>
									<th>编号</th>
									<th>代理商</th>
									<th>省份</th>
									<th>商品</th>
									<th>出库数</th>
									<th>出库时间</th>
								</tr>
							</thead>
							<tbody>
								{renderLeaveFactoryTableCell()}
							</tbody>
						</Table>
					</Panel>
					<Panel header="asadfa">
						<BootstrapTable data={this.props.agents} striped={true} hover={true} >
							<TableHeaderColumn isKey={true} dataField="_id">编号</TableHeaderColumn>
							<TableHeaderColumn dataField="name">代理商名称</TableHeaderColumn>
						</BootstrapTable>

					</Panel>


				</Col>


			</div>
		)
	}
}

//leaveDate: Date,
//	agentId: String,
//	goodId: String,
//	leaveCount: String

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {agents, goods, leaveRecords} = state;
	return {
		agents,
		goods,
		leaveRecords
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
export default connect(mapStateToProps, mapDispatchToProps)(LeaveFactoryRegister);


