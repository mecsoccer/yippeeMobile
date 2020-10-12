import React from "react";
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';

interface PropsObject {
  navigation: {
    navigate: Function
  },
}

const Categories = ({ navigation }: PropsObject) => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text>Categories Page</Text>
      <Button
        title="go to products page"
        onPress={() => navigation.navigate("Products")}
      />
      <Button
        title="go to signup page"
        onPress={() => navigation.navigate("loginFlow")}
      />
    </SafeAreaView>
  );
};

Categories.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});

export default Categories;
