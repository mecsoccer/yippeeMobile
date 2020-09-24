import React from "react";
import { View, StyleSheet, Text, Button } from 'react-native';

const Categories = ({ navigation }) => {
  return (
    <>
      <Text>Categories Page</Text>
      <Button
        title="go to products page"
        onPress={() => navigation.navigate("Products")}
      />
      <Button
        title="go to signup page"
        onPress={() => navigation.navigate("loginFlow")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Categories;
