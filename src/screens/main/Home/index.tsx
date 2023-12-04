import React, { useState } from 'react';
import { View, Button, Text, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onLongPress={handleMapPress}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
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
