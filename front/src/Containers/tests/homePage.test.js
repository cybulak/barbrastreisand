import React from 'react';
import renderer from 'react-test-renderer';
import { HomePage } from '../HomePage';

test('HomePage renders correctly', () => {
	const component = renderer.create(<HomePage />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
