/**
 * Created by jason on 6/6/16.
 */
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl, Panel, Table, Alert} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'


class SaleList extends React.Component {
// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {

    };
  }

	componentWillMount() {
		const { getSaleList,getAgentList, getGoods, getLeaveFactory } = this.props.actions
		getAgentList()
		getGoods()
		getSaleList()

	}


	//qrCodeUrl: String,
	//agentId: String,
	//goodId: String,
	//user: String, // wechat user (客户)
	//activate: Boolean,
	//activateDate: Date,
	//scanCount: Number,
	//batch: String, // 出库批次


	collectData = ({sales,agents,goods}) => {
		console.log('sales=============>>>>>>>>', sales)
		var renderArr = []
		_.forEach(sales, function(value) {
			renderArr.push({
				id: value._id,
				agent: _.find(agents,function(ele){
					return ele._id == value.agentId
				}).name,
				good: _.find(goods,function(ele) {
					return ele._id == value.goodId
				}).name,
				user: !value.user ? "无用户": value.user, // TODO
				activate: !value.activate ? "未激活": "已激活",
				leftDay: !value.activateDate ? _.find(goods,function(ele) {
					return ele._id == value.goodId
				}).quality_guarantee : '12',
				scanCount: value.scanCount,
				batch: value.batch,
				qrCodeUrl: value.qrCodeUrl
			})
		})
		return renderArr

	}
	render() {
		return (
			<Col xs={12} md={12} lg={12} xs={12}>
				<Panel header="销售列表">
					<BootstrapTable
						data={this.collectData(this.props)}
						striped={true}
						hover={true}
						condensed={true}
						pagination={true}
						columnFilter={true}
						search={true}>
						<TableHeaderColumn dataField="id" isKey={true} dataSort={true}>编号</TableHeaderColumn>
						<TableHeaderColumn dataField="agent" dataSort={true}>代理商</TableHeaderColumn>
						<TableHeaderColumn dataField="good" dataSort={true}>商品名称</TableHeaderColumn>
						<TableHeaderColumn dataField="user" dataSort={true}>用户</TableHeaderColumn>
						<TableHeaderColumn dataField="activate" dataSort={true}>激活状态</TableHeaderColumn>
						<TableHeaderColumn dataField="leftDay" dataSort={true}>剩余天数</TableHeaderColumn>
						<TableHeaderColumn dataField="scanCount" dataSort={true}>扫描次数</TableHeaderColumn>
						<TableHeaderColumn dataField="batch" dataSort={true}>批次</TableHeaderColumn>
						<TableHeaderColumn dataField="qrCodeUrl">二维码链接</TableHeaderColumn>

					</BootstrapTable>
				</Panel>
			</Col>
		)
	}
}

//leaveDate: Date,
//	agentId: String,
//	goodId: String,
//	leaveCount: String

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {sales,agents, goods} = state;
	return {
		sales,
		agents,
		goods
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
export default connect(mapStateToProps, mapDispatchToProps)(SaleList);


