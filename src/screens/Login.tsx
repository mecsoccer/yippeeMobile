import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Text, Input, Button, CheckBox } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spacer from '../components/Spacer';
import yippeeApi from '../apis/yippeeApi';
import NavLink from '../components/NavLink';

interface PropsObject {
  navigation: {
    navigate: Function
  },
}

const initialFormValues = {
  email: { value: '', validation: true },
  password: { value: '', validation: true },
}

const Login = ({ navigation }: PropsObject) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [fadeBtn, setFadeBtn] = useState(true);
  const [signinLoading, setSigninLoading] = useState(false);

  useEffect(() => {
    validate();
  }, [formValues]);

  function handleFormInput(name: string, value: string, regEx: RegExp) {
    const formTemp = {...formValues};

    formTemp[name] = { value, validation: regEx.test(value) ? true : false };
    if (name === 'agreement') formTemp[name] = { value, validation: true };

    setFormValues(formTemp);
  }

  const handleFieldError = (validation: boolean, message: string) => {
    if (validation === false) return message;
    return '';
  };

  const validate = () => {
    const valid = Object.values(formValues).every((value) => (
      value.value !== '' && value.validation
    ));

    setFadeBtn(!valid);
  }

  const submitSignin = () => {
    setSigninLoading(true)
    const { email, password } = formValues;

    yippeeApi.post('/auth/signin', { email: email.value, password: password.value })
      .then((data) => {
        AsyncStorage.multiRemove(['token']);
        AsyncStorage.setItem('token', data.data.user.token);
        setSigninLoading(false);
        navigation.navigate('Categories');
      })
      .catch(({message, response: { data }}) => {
        setSigninLoading(false);
        Alert.alert(data ? data.error : message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Spacer>
        <Text h3 style={styles.pageTitle}>Signin to Yippee</Text>
      </Spacer>
      <Input
        label="email"
        leftIcon={
          <MaterialIcon
            name='email'
            size={24}
            color='darkgray'
          />
        }
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.email.value}
        errorMessage={handleFieldError(formValues.email.validation, 'invalid input')}
        onChangeText={(mail) => handleFormInput('email', mail, /^[a-z\d][\w\.-]+@[a-z\d]+\..+$/gi)}
      />
      <Input
        label="password"
        secureTextEntry
        leftIcon={
          <Icon
            name='lock'
            size={24}
            color='darkgray'
          />
        }
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.password.value}
        errorMessage={handleFieldError(formValues.password.validation, 'invalid input')}
        onChangeText={(password) => handleFormInput('password', password, /./g)}
      />
      <Spacer>
        <Button
          title="Sign in"
          loading={signinLoading}
          disabled={fadeBtn || signinLoading}
          onPress={submitSignin}
        />
      </Spacer>
      <NavLink
        navigation={navigation}
        context="Don't have an account? Signup Instead"
        link="Signup"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  pageTitle: {
    marginBottom: 20,
  },
});

Login.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default Login;
