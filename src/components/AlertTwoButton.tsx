import react from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";

const AlertTwoButton = () => {
  return (
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    )
  )
}

export default AlertTwoButton;
