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

    };
  }

	componentWillMount() {
		const {getAgentList, getGoods, getLeaveFactory, getSingleAgentInfo, getSingleGoodInfo} = this.props.actions

	}


	render() {
		const generateSaleDateForTableCell = () => {

		}
		return (
			<div>
				<Col xs={12} md={12} >
					<Panel header="出库记录">
						<BootstrapTable
							data={generateSaleDateForTableCell()}
							striped={true}
							hover={true}
							condensed={true}
							pagination={true}
							columnFilter={true}
							search={true}>
							<TableHeaderColumn dataField="id" isKey={true} dataSort={true}>编号</TableHeaderColumn>
							<TableHeaderColumn dataField="agent">代理商</TableHeaderColumn>
							<TableHeaderColumn dataField="address" dataSort={true}>地区</TableHeaderColumn>
							<TableHeaderColumn dataField="good">商品</TableHeaderColumn>
							<TableHeaderColumn dataField="leaveCount" dataSort={true}>出库数量</TableHeaderColumn>
							<TableHeaderColumn dataField="leaveDate" dataSort={true}>出库时间</TableHeaderColumn>
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


