import React from 'react';
import renderer from 'react-test-renderer';
import Header from "../HOC/Header";

test('Header changes the class when hovered', () => {
    const component = renderer.create(<Header />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});