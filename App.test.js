import React from 'react';
import { render, cleanup } from 'react-native-testing-library';
import LoginScreen from './src/screens/LoginScreen/LoginScreen'; 

describe('sample tests', () => {
    it('2+2 should be 4', () => {
        expect(2+2).toBe(4)
    });
});

describe('<Login />', () => {
    it('should match snapshot', () => {
        const result = render(<LoginScreen />).toJSON();
        expect(result).toMatchSnapshot();
    });
});
