import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text } from "react-native";
import {
    Colours
} from '../components/style';

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colours;

const Map = () => {
    return(
        <View>
            <StatusBar style="dark" />
            <Text>MAP SCREEN</Text>
        </View>
        
    );
};
export default Map;

