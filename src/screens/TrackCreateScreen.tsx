import '../_mock_location';
import React, { useEffect, useContext } from "react";
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus, NavigationEvents } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/locationContext';
import useLocation from '../hooks/useLocation';

interface PropsObject {
  navigation: {
    navigate: Function
  },
  isFocused: boolean
}

const TrackCreateScreen = ({ navigation, isFocused }: PropsObject) => {
  const {
    addLocation,
    state: {
      currentLocation,
      currentLocation: { coords: { latitud, longitude } }
    }
  } = useContext(LocationContext);

  const [err] = useLocation(isFocused, (location: object) => addLocation(location));

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Track create Page</Text>
      <Map
        currentLocation={currentLocation}
        latitude={latitud}
        longitude={longitude}
      />
      {/*<NavigationEvents onWillBlur={() => console.log('leaving')} />*/}
      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
