import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		addTodo: jest.fn()
	};

	const element = shallow(<App {...props} />);

	return {
		props,
		element
	};
}

it('renders without crashing', () => {
	const { element } = setup();
	expect(element.find('div#app').hasClass('App')).toBe(true);
});
