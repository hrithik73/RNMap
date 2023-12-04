import React, { useEffect, useState } from 'react';
import { View, Button, Text, Modal } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    setMarkers([...markers, coordinate]);
  };

  const handleMarkerPress = marker => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const removeMarker = () => {
    const updatedMarkers = markers.filter(marker => marker !== selectedMarker);
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  if (!currentLocation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1, width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        onLongPress={handleMapPress}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Circle
          center={currentLocation}
          radius={500}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />
        <Marker
          coordinate={currentLocation}
          title="Current Location"
          description="This is where you are"
          pinColor="blue"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Marker ${index + 1}`}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text>Options for Marker</Text>
            <Button title="Remove Marker" onPress={removeMarker} />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
