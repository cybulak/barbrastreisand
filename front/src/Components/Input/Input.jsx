import React from 'react';
import PropTypes from 'prop-types';
import { Input as SemanticInput, Message } from 'semantic-ui-react';

export const Input = ({
	icon,
	iconPosition,
	placeholder,
	value,
	onChange,
	name,
	validation,
	children
}) => (
	<div className="input-container">
		<SemanticInput
			icon={icon}
			iconPosition={iconPosition}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			name={name}
			error={validation && validation.isInvalid}
		>
			{children}
		</SemanticInput>
		{validation && validation.isInvalid && (
			<Message error header={`Invalid ${name}`} content={validation.message} />
		)}
	</div>
);

Input.propTypes = {
	icon: PropTypes.string,
	iconPosition: PropTypes.oneOf(['left', 'right']),
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	validation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	children: PropTypes.node
};

Input.defaultProps = {
	icon: '',
	iconPosition: 'left',
	validation: false
};
