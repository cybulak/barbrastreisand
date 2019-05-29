import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Message } from 'semantic-ui-react';

import { Input } from '../Components';
import { Creators as AuthActions } from '../Reducer/authReducer';
import FormValidator from '../Helpers/validate';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.props.logout();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.validator = new FormValidator([
			{
				field: 'email',
				method: 'isEmail',
				validWhen: true,
				message: 'Your email is not correct, check it bro'
			},
			{
				field: 'password',
				method: 'isLength',
				args: [{ min: 6, max: undefined }],
				validWhen: true,
				message: 'Your password is too short mate'
			}
		]);

		this.state = {
			email: '',
			password: '',
			validation: this.validator.valid()
		};
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { email, password } = this.state;

		const validation = this.validator.validate(this.state);
		this.setState({ validation });

		if (validation.isValid) {
			this.props.login(email, password);
		}
	}

	render() {
		const { email, password, validation } = this.state;

		return (
			<div className="login-form">
				<Card centered>
					<Card.Content>
						<Card.Header className="login-form-header">Login</Card.Header>
						<Card.Description>
							<Input
								icon="users"
								placeholder="Email"
								value={email}
								onChange={this.handleChange}
								name="email"
								validation={validation.email}
							/>
							<Input
								type="password"
								icon="lock"
								placeholder="Password"
								value={password}
								onChange={this.handleChange}
								name="password"
								validation={validation.password}
							/>
							<div className="login-button-container">
								<Button
									primary
									onClick={this.handleSubmit}
									loading={this.props.logging}
								>
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
	const { logging } = state.authReducer;
	return {
		logging
	};
}

const mapDispatchToProps = dispatch => ({
	login: (email, password) =>
		dispatch(AuthActions.loginRequest(email, password)),
	logout: () => dispatch(AuthActions.logout())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
