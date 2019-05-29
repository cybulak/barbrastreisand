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
	validation
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
		/>
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
	validation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

Input.defaultProps = {
	icon: '',
	iconPosition: 'left',
	validation: false
};
