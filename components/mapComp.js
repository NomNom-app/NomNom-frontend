import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';


const MapComp = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [placedLocations, setPlacedLocations] = useState([]);


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

    const handleMapPress = (event) => {
        setClickedLocation(event.nativeEvent.coordinate);
        setSelectedLocation(null); // Reset selected location
    };

    const handleMarkerPress = (location) => {
        setSelectedLocation(location);
        setShowPopup(true);
    };

    const handleConfirmPlacement = () => {
        setClickedLocation(null);
        setShowPopup(false);
        if (selectedLocation) {
            setPlacedLocations([...placedLocations, selectedLocation]);
        }
    };

    const handleDeletePin = () => {
        setPlacedLocations(prevLocations =>
            prevLocations.filter(location => location !== selectedLocation)
        );
        setShowPopup(false);
    };

    return (
        <View>
            {initialRegion && (
                <MapView style={styles.map} region={initialRegion} onPress={handleMapPress}>
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude
                            }}
                            title="Your location"
                        />
                    )}
                    {clickedLocation && (
                        <Marker
                            coordinate={clickedLocation}
                            title="Clicked location"
                            pinColor="red"
                            onPress={() => handleMarkerPress(clickedLocation)}
                        />
                    )}
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation}
                            title="Selected location"
                            onPress={() => handleMarkerPress(selectedLocation)}
                        />
                    )}
                    {placedLocations.map((location, index) => (
                        <Marker
                            key={index}
                            coordinate={location}
                            title={`Placed location ${index}`}
                            pinColor="green"
                            onPress={() => handleMarkerPress(location)}
                        />
                    ))}
                </MapView>
            )}
            <PinConfirmationPopup visible={showPopup} onConfirm={handleConfirmPlacement} onDelete={handleDeletePin} />
        </View>
    );
};


const PinConfirmationPopup = ({ visible, onConfirm, onDelete }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
            style={styles.modal}
        >
            <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                    <Text style={styles.popupText}>Do you want to place the pin here?</Text>
                    <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmButtonText}>Place Pin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                        <Text style={styles.deleteButtonText}>Delete Pin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    map: {
        width: '100%',
        height: '100%',
    },


    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    popupText: {
        fontSize: 18,
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modal: {
        zIndex: 9999,
    },
});

export default MapComp;