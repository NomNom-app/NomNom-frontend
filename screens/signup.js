import React, { useEffect, useState } from 'react';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colours,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    Error
} from './../components/style';
import { StatusBar } from 'expo-status-bar';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { View, ScrollView, Text } from 'react-native';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { HandleSignUp } from '../api';

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colours;

const getCharacterValidationError = (str) => {
    return "Your password must have at least one " + str;
};
const Signup = () => {
    // For signing up:
    const [hidePassword, setHidePassword] = useState(true);
    const [hideMatch, setMatch] = useState(true);
    const formik = useFormik({
        initialValues: { username: '', email: '', password: '', confirmPassword: '' },
        validationSchema: Yup.object({
            username: Yup.string().max(15, "Must be 15 characters or less!").min(5, "Must be at least 5 characters!").required("Required"),
            email: Yup.string().email("Invalid email address!").required("Required"),
            password: Yup.string().required("Required").min(8, "Password must be at least 8 characters!").
                matches(/[0-9]/, getCharacterValidationError("digit"))
                .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Does not match with the password!").required("Required")
        }),
        onSubmit: (values) => {
            console.log(values);
            HandleSignUp(values.username, values.email, values.password);
        }
    });

    // For navigation:
    const navigation = useNavigation();
    const goToLogin = () => navigation.navigate('Login');

    return (
        <ScrollView style={{ width: '100%' }}>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/images/nom-nom_logo.png')} />
                    <PageTitle> Nom Nom</PageTitle>
                    <SubTitle>Sign Up</SubTitle>
                    <Formik testID="signUpForm">
                        {
                            () => (
                                <StyledFormArea>
                                    <MyTextInput
                                        label="Username"
                                        icon="person"
                                        placeholder="my_username"
                                        placeholderTextColor={darkLight}
                                        onChangeText={formik.handleChange('username')}
                                        onBlur={formik.handleBlur('username')}
                                        value={formik.values.username}
                                        testID="username"
                                    />
                                    {formik.touched.username && formik.errors.username ? <Error>{formik.errors.username}</Error> : null}
                                    <MyTextInput
                                        label="Email"
                                        icon="mail"
                                        placeholder="my@email.com"
                                        placeholderTextColor={darkLight}
                                        onChangeText={formik.handleChange('email')}
                                        onBlur={formik.handleBlur('email')}
                                        value={formik.values.email}
                                        keyboardType="email-address"
                                        testID="email"
                                    />
                                    {formik.touched.email && formik.errors.email ? <Error>{formik.errors.email}</Error> : null}
                                    <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={formik.handleChange('password')}
                                        onBlur={formik.handleBlur('password')}
                                        value={formik.values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                        testID="password"
                                    />
                                    {formik.touched.password && formik.errors.password ? <Error>{formik.errors.password}</Error> : null}
                                    <MyTextInput
                                        label="Confirm password"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={formik.handleChange('confirmPassword')}
                                        onBlur={formik.handleBlur('confirmPassword')}
                                        value={formik.values.confirmPassword}
                                        secureTextEntry={hideMatch}
                                        isPassword={true}
                                        hidePassword={hideMatch}
                                        setHidePassword={setMatch}
                                        testID="match"
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                        <Error>{formik.errors.confirmPassword}</Error> : null}

                                    <StyledButton testID="signUpButton" onPress={formik.handleSubmit}>
                                        <ButtonText>
                                            Sign Up
                                        </ButtonText>
                                    </StyledButton>
                                    <ExtraView>
                                        <ExtraText>Already have an account? </ExtraText>
                                        <TextLink onPress={goToLogin}>
                                            <TextLinkContent>
                                                Log In
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </ScrollView>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>);
};

export default Signup;