import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import Spacer from "../components/Spacer";

interface NavigationObj {
  navigation: {
    navigate: Function
  }
}

const Index = ({ navigation }: NavigationObj) => {
  const signout = async () => {
    try {
      await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
      navigation.navigate('Signin');
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Index Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <Button title="sign in" onPress={() => navigation.navigate('Signin')} />
      <Button title="sign up" onPress={() => navigation.navigate('Signup')} />
      <Spacer>
        <Button title="go to categories" onPress={() => navigation.navigate('Categories')} />
      </Spacer>
      <Spacer>
        <Button title="go to track create" onPress={() => navigation.navigate('TrackCreate')} />
      </Spacer>
      <Spacer>
        <Button title="sign out" onPress={signout} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  }
});

export default Index;
