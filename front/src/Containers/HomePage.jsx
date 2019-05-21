import React from 'react';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../Reducer/authReducer';

export class HomePage extends React.Component {
	render() {
		return (
			<div>
				<h2>Logged In</h2>
				<button onClick={this.props.logout}>Logout</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(AuthActions.logout())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(HomePage);
