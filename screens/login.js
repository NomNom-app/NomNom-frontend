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
import {View} from 'react-native';
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colours;

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/images/nom-nom_logo.png')}/>
                <PageTitle> Nom Nom</PageTitle>
                <SubTitle>Log In</SubTitle>

                <Formik
                    initialValues ={{username: '', password: ''}}
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
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Log In
                            </ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Don't have an account? </ExtraText>
                            <TextLink>
                                <TextLinkContent>
                                    Sign Up
                                </TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>
                    )
                    }
                </Formik>

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

export default Login;