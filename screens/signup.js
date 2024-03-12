import React, {useState} from 'react';
import{
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
    TextLinkContent
} from './../components/style';
import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import {View, ScrollView} from 'react-native';
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colours;

const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const navigation = useNavigation();
    const goToLogin = () => navigation.navigate('Login');
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <ScrollView style={{width: '100%'}}>
                <PageLogo resizeMode="cover" source={require('./../assets/images/nom-nom_logo.png')}/>
                <PageTitle> Nom Nom</PageTitle>
                <SubTitle>Sign Up</SubTitle>

                <Formik
                    initialValues ={{username: '', email: '', password: '', confirmPassword: ''}}
                    onSubmit={(values) => {console.log(values);}}
                >
                    {
                    ({handleChange, handleBlur, handleSubmit, values}) =>  (
                    <StyledFormArea>
                        <MyTextInput 
                            label = "Username"
                            icon="person"
                            placeholder = "my_username"
                            placeholderTextColor = {darkLight}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <MyTextInput 
                            label = "Email"
                            icon="mail"
                            placeholder = "my@email.com"
                            placeholderTextColor = {darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <MyTextInput 
                            label = "Password"
                            icon="lock"
                            placeholder = "* * * * * * * *"
                            placeholderTextColor = {darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MyTextInput 
                            label = "Confirm password"
                            icon="lock"
                            placeholder = "* * * * * * * *"
                            placeholderTextColor = {darkLight}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Sign Up
                            </ButtonText>
                        </StyledButton>
                        <Line />
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
                </ScrollView>
            </InnerContainer>
        </StyledContainer>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>);
};

export default Signup;