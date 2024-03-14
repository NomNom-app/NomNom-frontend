import React, { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'


const MapComp = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }
            Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                setCurrentLocation(location.coords);
                setInitialRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                });
            });
        };

        getLocation();
    }, []);

    return (
        <View>
            {initialRegion && (
                <MapView style={styles.map} region={initialRegion}>
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude
                            }}
                            title="Your location"
                        />
                    )}
                </MapView>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapComp;