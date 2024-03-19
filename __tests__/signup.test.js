// npm run test
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import * as Yup from 'yup';

import Signup from "../screens/signup";

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

jest.mock('../api', () => ({
    HandleSignUp: jest.fn(),
}));

describe('Signup', () => {

    beforeEach(() => {
        const renderResult = render(<Signup />);
        getByText = renderResult.getByText;
        getByTestId = renderResult.getByTestId;
    });

    test('renders initial form fields and elements', () => {
        // Input label
        expect(getByTestId('username')).toBeTruthy();
        expect(getByTestId('email')).toBeTruthy();
        expect(getByTestId('password')).toBeTruthy();
        expect(getByTestId('match')).toBeTruthy();

        // Button and link
        expect(getByTestId('signUpButton')).toBeTruthy();
        expect(getByText('Log In')).toBeTruthy();
    });

    test('too short of a username validation', () => {
        const usernameInput = getByTestId('username');
        fireEvent.changeText(usernameInput, 'a');
        expect('Must be at least 5 characters!').toBeTruthy();
    });

    test('too long of a username validation', () => {
        const usernameInput = getByTestId('username');
        fireEvent.changeText(usernameInput, 'abcdefghijklmnop');
        expect('Must be 15 characters or less!').toBeTruthy();
    });

    test('empty username validation', () => {
        expect('Required').toBeTruthy();
    });

    test('empty email validation', () => {
        expect('Required').toBeTruthy();
    });

    test('email without @ validation', () => {
        const emailInput = getByTestId('email');
        fireEvent.changeText(emailInput, "a.com");
        expect('Invalid email address!').toBeTruthy();
    });

    test('email without .com validation', () => {
        const emailInput = getByTestId('email');
        fireEvent.changeText(emailInput, "a@gmail");
        expect('Invalid email address!').toBeTruthy();
    });

    test('email without first part validation', () => {
        const emailInput = getByTestId('email');
        fireEvent.changeText(emailInput, "@gmail");
        expect('Invalid email address!').toBeTruthy();
    });

    test('empty password validation', () => {
        expect('Required').toBeTruthy();
    });

    test('too short of a password validation', () => {
        const passwordInput = getByTestId('password');
        fireEvent.changeText(passwordInput, "aa");
        expect('Password must be at least 8 characters!').toBeTruthy();
    });

    test('password without numbers validation', () => {
        const passwordInput = getByTestId('password');
        fireEvent.changeText(passwordInput, "qwertyuiop");
        expect('Your password must have at least one digit').toBeTruthy();
    });

    test('password without uppercase validation', () => {
        const passwordInput = getByTestId('password');
        fireEvent.changeText(passwordInput, "qwer5tyuiop1");
        expect('Your password must have at least one uppercase').toBeTruthy();
    });

    test('password without lowercase validation', () => {
        const passwordInput = getByTestId('password');
        fireEvent.changeText(passwordInput, "QWERTYU6U");
        expect('Your password must have at least one lowercase').toBeTruthy();
    });

    test('empty confirm a password validation', () => {
        expect('Required').toBeTruthy();
    });

    test('confirm a password not matching with password validation', () => {
        const passwordInput = getByTestId('password');
        const matchInput = getByTestId('match');

        fireEvent.changeText(passwordInput, "Qw5RTyhg?n");
        fireEvent.changeText(matchInput, "Qw5RTyhgn");
        expect('Does not match with the password!').toBeTruthy();
    });
    
});