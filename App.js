import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colours, SmallPageLogo } from './components/style';
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Login from './screens/login';
import Signup from './screens/signup';
import Map from './screens/map';
import Feed from './screens/feed';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colours;

function LogoTitle() {
  return (
    <SmallPageLogo resizeMode="cover" source={require('./assets/images/nom-nom_logo.png')} />
  );
}

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: Colours.darkLight,
        tabBarActiveTintColor: Colours.tertiary,
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ focused, color }) => <FontAwesome5 name="map-marker-alt" size={24}
            color={focused ? Colours.tertiary : Colours.darkLight}
          />
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color }) => <FontAwesome6 name="camera" size={24}
            color={focused ? Colours.tertiary : Colours.darkLight} />
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
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
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: Colours.primary,
            },
            headerTintColor: Colours.darkLight,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => (
              <FontAwesome name="filter" size={24} color={Colours.darkLight}
              /*laikinai:*/ onPress={() => console.log("filter pressed.")} />
            ),
            headerLeft: () => (
              <Entypo name="menu" size={24} color={Colours.darkLight}
              /* laikinai:*/ onPress={() => { console.log("menu pressed.") }} />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
