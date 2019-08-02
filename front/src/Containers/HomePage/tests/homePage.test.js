import React from 'react';
import renderer from 'react-test-renderer';
import { HomePage } from '../HomePage';

test('HomePage renders correctly', () => {
	let tree = renderer.create(<HomePage />).toJSON();
	expect(tree).toMatchSnapshot();
});
