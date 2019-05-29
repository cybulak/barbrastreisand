import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from './Input';

it('render correctly input component', () => {
	const input = renderer
		.create(
			<Input placeholder="test" value="test" onChange={() => {}} name="test" />
		)
		.toJSON();
	expect(input).toMatchSnapshot();
});
