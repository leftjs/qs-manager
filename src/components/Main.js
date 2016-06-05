//require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';


let yeomanImage = require('../images/yeoman.png');

const style = {
	marginLeft: 20,
};


class AppComponent extends React.Component {

	componentWillMount() {
	}
  render() {
    return (
      <div className="index">
	      {this.props.children}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
