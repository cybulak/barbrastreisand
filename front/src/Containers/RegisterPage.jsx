import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Creators as RegisterActions } from '../Reducer/registrationReducer';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				firstname: '',
				lastname: '',
				username: '',
				password: ''
			},
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value
			}
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { firstname, lastname, username, password } = this.state.user;
		if (firstname && lastname && username && password) {
			this.props.register(firstname, lastname, username, password);
		}
	}

	render() {
		const { registering } = this.props;
		const { user, submitted } = this.state;

		return (
			<div>
				<h2>Register</h2>
				<form name="form" onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							name="firstname"
							value={user.firstname}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor="lastname">Last Name</label>
						<input
							type="text"
							name="lastname"
							value={user.lastname}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							value={user.username}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={user.password}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<button>Register</button>
						<Link to="/login">Login</Link>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { registering } = state.registrationReducer;
	return {
		registering
	};
}

const mapDispatchToProps = dispatch => {
	return {
		register: (firstname, lastname, username, password) =>
			dispatch(
				RegisterActions.registerRequest(firstname, lastname, username, password)
			)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterPage);
