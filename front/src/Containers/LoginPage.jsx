import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Card } from 'semantic-ui-react';

import { Creators as AuthActions } from '../Reducer/authReducer';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.props.logout();

		this.state = {
			username: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });

		const { username, password } = this.state;

		if (username && password) {
			this.props.login(username, password);
		}
	}

	render() {
		const { username, password } = this.state;

		return (
			<div className="login-form">
				<Card centered>
					<Card.Content>
						<Card.Header className="login-form-header">Login</Card.Header>
						<Card.Description>
							<div className="input-container">
								<Input
									icon="users"
									iconPosition="left"
									placeholder="Email"
									value={username}
									onChange={this.handleChange}
									name="username"
								/>
							</div>
							<div className="input-container">
								<Input
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									value={password}
									onChange={this.handleChange}
									name="password"
								/>
							</div>
							<div className="login-button-container">
								<Button primary onClick={this.handleSubmit}>
									Login
								</Button>
							</div>
						</Card.Description>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { loggingIn } = state.authReducer;
	return {
		loggingIn
	};
}

const mapDispatchToProps = dispatch => ({
	login: (username, password) =>
		dispatch(AuthActions.loginRequest(username, password)),
	logout: () => dispatch(AuthActions.logout())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
