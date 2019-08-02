import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../../Reducer/authReducer';

export const HomePage = ({ logout }) => (
	<div>
		<h2>Logged In</h2>
		<button onClick={logout}>Logout</button>
	</div>
);

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(AuthActions.logout())
});

HomePage.propTypes = {
	logout: PropTypes.func
};

export default connect(
	null,
	mapDispatchToProps
)(HomePage);
