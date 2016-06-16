/**
 * Created by jason on 6/16/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
export function requireAuthentication(Component) {

	class AuthenticatedComponent extends React.Component {

		componentWillMount() {
			this.checkAuth();
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth();
		}

		checkAuth() {
			if (_.isEmpty(this.props.admin)) {
				let redirectAfterLogin = this.props.location.pathname;
				browserHistory.push(`/login?next=${redirectAfterLogin}`);
			}
		}

		render() {
			return (
				<div>
					{!_.isEmpty(this.props.admin) === true
						? <Component {...this.props}/>
						: null
					}
				</div>
			)

		}
	}

	const mapStateToProps = (state) => ({
		admin: state.admin
	});

	return connect(mapStateToProps)(AuthenticatedComponent);

}