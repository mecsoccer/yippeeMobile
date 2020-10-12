import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

interface CoordsObj {
  latitude: number,
  longitude: number,
  currentLocation: {
    coords: object
  }
}

const Map = ({ latitude, longitude, currentLocation }: CoordsObj) => {
  if (!latitude || !longitude) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={styles.map}
      region={{
        ...currentLocation.coords,
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle
        center={{ ...currentLocation.coords, latitude, longitude }}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
