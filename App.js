import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; /*npm install @react-navigation/native @react-navigation/native-stack*/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colours, SmallPageLogo } from './components/style';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Login from './screens/login';
import Signup from './screens/signup';
import Map from './screens/map';

const Stack = createNativeStackNavigator();
const { primary, secondary, tertiary, darkLight, brand, green, red } = Colours;

function LogoTitle(){
  return(
    <SmallPageLogo resizeMode="cover" source={require('./assets/images/nom-nom_logo.png')}/>
  );
}

function App()
{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
            }}
          />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerTitle: (props) => <LogoTitle {...props}/>,
            headerStyle: {
              backgroundColor: Colours.primary,
            },
            headerTintColor: Colours.darkLight,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => (
              <FontAwesome name="filter" size={24} color={Colours.darkLight}
              /*laikinai:*/ onPress={() => console.log("filter pressed.")}/>
            ),
            headerLeft: () => (
              <Entypo name="menu" size={24} color={Colours.darkLight}
              /* laikinai:*/ onPress={() => {console.log("menu pressed.")}}/>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
