import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';

import { Creators as RegisterActions } from '../../Reducer/registrationReducer';
import FormValidator from '../../Helpers/validate';
import { Input } from '../../Components';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.validator = new FormValidator([
			{
				field: 'firstname',
				method: 'isLength',
				args: [{ min: 3, max: undefined }],
				validWhen: true,
				message: 'Your name seems to be too short'
			},
			{
				field: 'lastname',
				method: 'isLength',
				args: [{ min: 3, max: undefined }],
				validWhen: true,
				message: 'Your lastname seems to be too short'
			},
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
			firstname: '',
			lastname: '',
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

		const validation = this.validator.validate(this.state);
		this.setState({ validation });

		const { firstname, lastname, email, password } = this.state;

		if (validation.isValid) {
			this.props.register(firstname, lastname, email, password);
		}
	}

	render() {
		const { registering } = this.props;
		const { firstname, lastname, email, password, validation } = this.state;

		return (
			<div className="register-form">
				<Card centered>
					<Card.Content>
						<Card.Header className="register-form-header">Register</Card.Header>
						<Card.Description>
							<Input
								type="text"
								icon="users"
								name="firstname"
								value={firstname}
								onChange={this.handleChange}
								placeholder="Firstname"
								validation={validation.firstname}
							/>
							<Input
								type="text"
								name="lastname"
								icon="users"
								placeholder="Lastname"
								value={lastname}
								onChange={this.handleChange}
								validation={validation.lastname}
							/>
							<Input
								type="text"
								name="email"
								icon="users"
								placeholder="Email"
								value={email}
								onChange={this.handleChange}
								validation={validation.email}
							/>
							<Input
								type="password"
								name="password"
								icon="lock"
								placeholder="Password"
								value={password}
								onChange={this.handleChange}
								validation={validation.password}
							/>
							<div className="register-button-container">
								<Button
									primary
									onClick={this.handleSubmit}
									loading={registering}
								>
									Register
								</Button>
								<Link to="/login">Login</Link>
							</div>
						</Card.Description>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ registrationReducer: { registering } }) => ({
	registering
});

const mapDispatchToProps = dispatch => ({
	register: (firstname, lastname, email, password) =>
		dispatch(
			RegisterActions.registerRequest(firstname, lastname, email, password)
		)
});

RegisterPage.propTypes = {
	register: PropTypes.func,
	registering: PropTypes.bool
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterPage);
