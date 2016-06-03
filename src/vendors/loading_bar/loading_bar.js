import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const UPDATE_TIME = 200
export const MAX_PROGRESS = 90
export const PROGRESS_INCREASE = 5

export class LoadingBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: 0,
      interval: null,
    }

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loading) {
			this.launch()
    }else {
	   this.destroy()
    }
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }


	destroy = () => {
		clearInterval(this.state.interval)
		this.setState = {
			percent: 0,
			interval: null
		}
	}



  launch = () => {
    var interval = this.state.interval
    var percent = this.state.percent


	  if (!interval) {
		  interval = setInterval(() => {
			  if (percent <= MAX_PROGRESS) {
				  percent = percent + PROGRESS_INCREASE
			  }
		  }, UPDATE_TIME)
	  }



    this.setState({ percent, interval })
  }



  buildStyle() {
    const style = {
      height: '3px',
      width: `${this.state.percent}%`,
      backgroundColor: 'red',
      transition: 'width 400ms ease-out, height 400ms linear',
      position: 'absolute',
    }

    return { ...style, ...this.props.style }
  }

  render() {
    const style = this.buildStyle()

    if (this.props.loading) {
      style.visibility = 'visible'
    } else {
	    style.opacity = 0
	    style.transition = 'opacity 1s, width 1s ease-out, height 1s linear,visibility 1s'
      style.visibility = 'hidden'
    }

    return (
      <div>
        <div style={style} className={this.props.className}></div>
        <div style={{ display: 'table', clear: 'both' }}></div>
      </div>
    )
  }
}

LoadingBar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  actions: PropTypes.object,
  loading: PropTypes.boolean,
}

LoadingBar.defaultProps = {
  style: {},
  className: undefined,
  loading: false,
}

const mapStateToProps = (state) => ({
  loading: state.loadingBar,
})

export default connect(mapStateToProps)(LoadingBar)
