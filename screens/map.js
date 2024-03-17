import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from "react-native";
import {
    Colours
} from '../components/style';

import MapView from "react-native-maps";
import MapComp from "../components/mapComp";

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colours;

const Map = () => {
    return(
        <View>
            <StatusBar style="dark" />
            <MapComp/>
        </View>
        
    );
};
export default Map;