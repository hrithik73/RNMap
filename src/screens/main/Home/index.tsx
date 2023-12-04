import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import BottomSheet from '~/components/BottomSheet';
import Button from '~/components/Buttons';
import { useAppTheme } from '~/theme/theme';
import makeStyles from './styles';

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState<{
    index: number;
    marker: any;
  }>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>(null);

  const theme = useAppTheme();
  const styles = makeStyles(theme);

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

  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    setMarkers([...markers, coordinate]);
  };

  const handleMarkerPress = (marker, index) => {
    setSelectedMarker({ index, marker });
    setModalVisible(true);
  };

  const removeMarker = () => {
    const updatedMarkers = markers.filter(
      (_, index) => index !== selectedMarker.index,
    );
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
            description={`This is marker ${index + 1}`}
            onPress={() => handleMarkerPress(marker, index)}
          />
        ))}
      </MapView>

      <BottomSheet
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        isFullScreen={false}>
        <View style={styles.bottomSheetContent}>
          <Text>This is {selectedMarker?.index} interest point</Text>
          <View>
            <Button title="Remove Marker" onPress={removeMarker} />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Home;
