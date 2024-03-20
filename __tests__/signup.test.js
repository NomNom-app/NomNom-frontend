// npm run test
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react-native";
import { userEvent } from "@testing-library/react-native";

import Signup from "../screens/signup";

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

jest.mock('../api', () => ({
    HandleSignUp: jest.fn(),
}));

//Helper functions that give needed input in correct format:
const usernameSuccessCase = async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<Signup />);
    await user.type(getByTestId('username'), 'aOper7');
};

const emailSuccessCase = async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<Signup/>);
    await user.type(getByTestId('email'), 'a7@gmail.com');
}

const passwordSuccessCase = async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<Signup />);
    await user.type(getByTestId('password'), 'QwertYui8o');
    await user.type(getByTestId('match'), 'QwertYui8o');
}

test('renders initial form fields and elements', () => {
    const { getByTestId, getByText } = render(<Signup />)
    // Input label
    expect(getByTestId('username')).toBeTruthy();
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
    expect(getByTestId('match')).toBeTruthy();

    // Button and link
    expect(getByTestId('signUpButton')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
});

test('all input in sign up form is correct so there is no error', async () => {
    const { getByTestId, queryAllByText } = render(<Signup />)
    const user = userEvent.setup();

    //await user.type(getByTestId('username'), 'aOper7');
    await usernameSuccessCase();
    await emailSuccessCase();
    await passwordSuccessCase();

    const signUpButton = screen.getByTestId('signUpButton');
    await user.press(signUpButton);

    await waitFor(() => {
        expect(queryAllByText('Required')).toHaveLength(0);
    });
});

describe('username validation', () => {
    it('should be an error about too short of a username', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await user.type(getByTestId('username'), 'a');
        await emailSuccessCase();
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Must be at least 5 characters!")).toBeTruthy();
        });
    });

    it('should be an error about too long of a username', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await user.type(getByTestId('username'), 'aaaaaaaaaaaaaaaa');
        await emailSuccessCase();
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Must be 15 characters or less!")).toBeTruthy();
        });
    });

    it('should be an error about empty username', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await user.type(getByTestId('username'), '');
        await emailSuccessCase();
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Required")).toBeTruthy();
        });
    });
});
describe('email validation', () => {
    it('should be an error about empty email', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await user.type(getByTestId('email'), '');
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Required")).toBeTruthy();
        });
    });

    it('should be an error about email address without @', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await user.type(getByTestId('email'), 'gmail.com');
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Invalid email address!")).toBeTruthy();
        });
    });

    it('should be an error about email address without .', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await user.type(getByTestId('email'), 'e@gmailcom');
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Invalid email address!")).toBeTruthy();
        });
    });

    it('should be an error about email address without text before @', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await user.type(getByTestId('email'), '@gmail.com');
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Invalid email address!")).toBeTruthy();
        });
    });

    it('should be an error about email address without with @ and . next to each other', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await user.type(getByTestId('email'), 'a@.com');
        await passwordSuccessCase();

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText("Invalid email address!")).toBeTruthy();
        });
    });
});

describe('Password validation', () => {
    it('should be an error about missing password', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), '');
        await user.type(getByTestId('match'), 'QwertYui8o');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Required')).toBeTruthy();
        });
    });

    it('should be an error about too short of a password', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), 'qwertyu');
        await user.type(getByTestId('match'), 'qwertyu');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Password must be at least 8 characters!')).toBeTruthy();
        });
    });

    it('should be an error about too missing lowercase letters', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), 'QWERTYUIO1P');
        await user.type(getByTestId('match'), 'QWERTYUIO1P');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Your password must have at least one lowercase')).toBeTruthy();
        });
    });

    it('should be an error about too missing uppercase letters', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), 'qwertyui10o');
        await user.type(getByTestId('match'), 'qwertyui10o');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Your password must have at least one uppercase')).toBeTruthy();
        });
    });

    it('should be an error about too missing digits', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), 'QwErtYUiop');
        await user.type(getByTestId('match'), 'QwErtYUiop');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Your password must have at least one digit')).toBeTruthy();
        });
    });
});

describe('PasswordConfirmation', () => {
    it('should be an error about empty password confirmation', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), 'QwertYui8o');
        await user.type(getByTestId('match'), '');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Required')).toBeTruthy();
        });
    });

    it('should be an error about password confirmation not matching', async () => {
        const { getByTestId, queryByText } = render(<Signup />)
        const user = userEvent.setup();

        await usernameSuccessCase();
        await emailSuccessCase();
        await user.type(getByTestId('password'), 'QwertYui8o');
        await user.type(getByTestId('match'), 'Qwertui8o');

        const signUpButton = screen.getByTestId('signUpButton');
        await user.press(signUpButton);

        await waitFor(() => {
            expect(queryByText('Does not match with the password!')).toBeTruthy();
        });
    });
});