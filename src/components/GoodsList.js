/**
 * Created by jason on 6/9/16.
 */
require('../styles/Good_list.scss')
import React from 'react'
import {Col, Form, FormGroup, Checkbox, Button, ControlLabel, FormControl, Table, Grid, Image, Row, Thumbnail, Modal, InputGroup,Alert} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import config from '../config/index'
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'

class GoodsList extends React.Component {


// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    showDetailModal: false,
	    detailModel: null,
	    showModifiedModal: false,
	    modifiedModel: null,
	    alertVisible: false
    };
  }
	
	componentWillMount() {
		const {getGoods} = this.props.actions
		getGoods()
	}

	renderGoodsList = () => {
		const {goods} = this.props
		let renderArr = []

		/*
		 name: body.name,
		 price: _.floor(_.toNumber(body.price), 2),
		 desc: body.desc,
		 quality_guarantee: _.toInteger(body.quality_guarantee),
		 image_url: body.image_url
		*/
		_(goods).forEach((good) => {

			const detailOnClicked = (e) => {
				this.showDetailModal(good)
			}

			const modifiedOnClicked = (e) => {
				this.showModifiedModal(good)
			}

			const deleteOnClicked = (e) => {
				const {deleteGood} = this.props.actions
				deleteGood(good._id)
			}

			renderArr.push(
				<Col xs={6} md={4}>
					<div className="thumbnail">
						<img src={good.image_url} className="good_img" alt="200*200"/>
						<div className="caption">
							<h3>{good.name}</h3>
							<p className="good_desc">{good.desc}</p>
							<p><b>单价: </b>{good.price} 元</p>
							<p><b>保质期: </b>{good.quality_guarantee} 天</p>
							<div className="btn_group">
								<Button bsStyle="info" bsSize="small" onClick={detailOnClicked}>详情</Button>
								<Button bsStyle="warning" bsSize="small" onClick={modifiedOnClicked}>修改</Button>
								<Button bsStyle="danger" bsSize="small" onClick={deleteOnClicked}>删除</Button>
							</div>
						</div>

					</div>
				</Col>
			)
		})
		return renderArr

	}


	hideDetailModal = () => {
		this.setState({
			showDetailModal:false,
			detailModel: null
		})
	}
	showDetailModal = (detail) => {
		this.setState({
			showDetailModal: true,
			detailModel: detail
		})
	}

	hideModifiedModal = () => {
		this.setState({
			showModifiedModal:false,
			modifiedModel: null
		})
	}
	showModifiedModal = (good) => {
		this.setState({
			showModifiedModal: true,
			modifiedModel: good
		})
	}



	renderDetailModal = () => {
		const good = this.state.detailModel
		return (
			<Modal show={this.state.showDetailModal} bsSize="large" onHide={this.hideDetailModal}>
				<Modal.Header closeButton>
					<Modal.Title>详情</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>{!!good && good.name}</h4>
					<hr />
					<img src={!!good && good.image_url} className="detail_img" alt=""/>
					<p>{!!good && good.desc}</p>
					<hr />
					<p><b>单价: </b>{!!good && good.price} 元</p>
					<p><b>保质期: </b>{!!good && good.quality_guarantee} 天</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.hideDetailModal}>关闭</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	renderModifiedModal = () => {
		var good = this.state.modifiedModel

		const handleFileSelected = (e) => {
			const input = ReactDOM.findDOMNode(this._fileInput)

			if (!!input.files[0]){
				var data = new FormData()
				data.append("file", input.files[0])

				const {uploadLicense} = this.props.actions
				uploadLicense(data).then((res) => {
					good.image_url = `${config.domain}/images/${res.value}`
					this.forceUpdate()
				}).catch((err) => {
					alert(err.reason)
				})
			}else {
					good.image_url = null
					this.forceUpdate()
			}
		}

		const handleSubmitClick = (e) => {
			const nameInput = ReactDOM.findDOMNode(this._nameInput)
			const priceInput = ReactDOM.findDOMNode(this._priceInput)
			const descInput = ReactDOM.findDOMNode(this._descInput)
			const qualityGuaranteeInput = ReactDOM.findDOMNode(this._qualityGuaranteeInput)

			const goodInfo = {
				_id: good._id,
				name: nameInput.value,
				price: priceInput.value,
				desc: descInput.value,
				quality_guarantee: qualityGuaranteeInput.value,
				image_url: good.image_url
			}

			const {updateGood} = this.props.actions
			updateGood(goodInfo).then((res) => {
				this.hideModifiedModal()
			}).catch((err) => {
				this.setState({
					alertVisible: true
				})
			})
		}

		const handleAlertDismiss = (e) => {
			this.setState({
				alertVisible: false
			})
		}

		return (
			<Modal show={this.state.showModifiedModal} bsSize="large" onHide={this.hideModifiedModal}>
				<Modal.Header closeButton>
					<Modal.Title>修改商品信息</Modal.Title>
				</Modal.Header>
				<Modal.Body>
						{!!this.state.alertVisible && (
							<Alert bsStyle="danger" onDismiss={handleAlertDismiss}>
								<h4>提交失败!</h4>
								<p>请填写完整的信息或检查所填写信息是否正确</p>
							</Alert>
						)}
						<Form horizontal>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									商品名称
								</Col>
								<Col sm={10}>
									<FormControl type="text" placeholder="商品名称" controlId="formHorizontalName" ref={ref => this._nameInput = ref} defaultValue={!!good && good.name}/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									销售价格
								</Col>
								<Col sm={10}>
									<FormControl type="number" placeholder="销售价格" contorlId="formHorizontalPrice" ref={ref => this._priceInput = ref} defaultValue={!!good && good.price}/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									商品描述
								</Col>
								<Col sm={10}>
									<FormControl componentClass="textarea" type="text" placeholder="商品描述" contorlId="formHorizontalDesc" ref={ref => this._descInput = ref} defaultValue={!!good && good.desc}/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									商品图片
								</Col>
								<Col sm={10}>
									<FormControl controlId="formHorizontalUrl" type="file" id="uploaded_license_input" placeholder="License" onChange={handleFileSelected} ref={ref => this._fileInput = ref}/>
									{!!good && !!good.image_url && <img src={good.image_url} alt="" id="uploaded_license_pic_show"/>}
								</Col>
							</FormGroup>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									保质期(天)
								</Col>
								<Col sm={10}>
									<InputGroup>
										<FormControl type="number" placeholder="保质期(天)" contorlId="formHorizontalQualityGuarantee" ref={ref => this._qualityGuaranteeInput = ref} defaultValue={!!good && good.quality_guarantee}/>
										<InputGroup.Addon>天</InputGroup.Addon>
									</InputGroup>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button onClick={handleSubmitClick}>
										提交
									</Button>
								</Col>
							</FormGroup>
						</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.hideModifiedModal}>关闭</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	render() {
		return (
			<div>
				{this.renderModifiedModal()}
				{this.renderDetailModal()}
				<Grid>
					{this.renderGoodsList()}
				</Grid>
			</div>
		)
	}
}
function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {goods} = state;
	return {
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
export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);