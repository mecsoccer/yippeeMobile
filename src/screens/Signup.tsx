import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity } from 'react-native';
import { Text, Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../components/Spacer';
import AlertTwoButton from '../components/AlertTwoButton';
import { Context as AuthContext } from  '../context/authContext';

interface PropsObject {
  navigation: {
    navigate: Function
  },
}

const initialFormValues = {
  title: { value: '', validation: true },
  first_name: { value: '', validation: true },
  last_name: { value: '', validation: true },
  email: { value: '', validation: true },
  phone_number: { value: '', validation: true },
  whatsapp: { value: '', validation: true },
  password: { value: '', validation: true },
  confirmPassword: { value: '', validation: true },
  address: { value: '', validation: true },
  agreement: { value: '', validation: true },
}

const Signup = ({ navigation }: PropsObject) => {
  const { signup } = useContext(AuthContext);

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

  function handleConfirmPassword(value: string) {
    const newObject = { ...formValues };
    const { password } = newObject;

    password.value === value
      ? newObject['confirmPassword'] = { value, validation: true }
      : newObject['confirmPassword'] = { value, validation: false };
      
    setFormValues(newObject);
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

  const submitSignup = () => {
    const { first_name, last_name, phone_number, email, password, address } = formValues;
    signup({
      first_name: first_name.value,
      last_name: last_name.value,
      phone_number: phone_number.value,
      email: email.value,
      password: password.value,
      address: address.value,
    }, setSigninLoading)
    //AlertTwoButton();
  };
  
  return (
    <ScrollView style={styles.container}>
      <Spacer>
        <Text h3 style={styles.pageTitle}>Signup for Yippee</Text>
      </Spacer>
      <Input
        label="title"
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.title.value}
        errorMessage={handleFieldError(formValues.title.validation, 'invalid input')}
        onChangeText={(newTitle) => handleFormInput('title', newTitle, /./g)}
      />
      <Input
        label="first name"
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.first_name.value}
        errorMessage={handleFieldError(formValues.first_name.validation, 'invalid input')}
        onChangeText={(name) => handleFormInput('first_name', name.trim().replace(/\d/g,''), /^([a-z]+-?[a-z]+){1,255}$/gi)}
      />
      <Input
        label="last name"
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.last_name.value}
        errorMessage={handleFieldError(formValues.last_name.validation, 'invalid input')}
        onChangeText={(name) => handleFormInput('last_name', name.trim().replace(/\d/g,''), /^([a-z]+-?[a-z]+){1,255}$/gi)}
      />
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
        label="phone number"
        leftIcon={
          <MaterialIcon
            name='phone'
            size={24}
            color='darkgray'
          />
        }
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.phone_number.value}
        errorMessage={handleFieldError(formValues.phone_number.validation, 'invalid input')}
        onChangeText={(num) => handleFormInput('phone_number', num.replace(/[a-z\W]/gi, '').slice(0,11), /^\d{11}$/g)}
      />
      <Input
        label="whatsapp"
        leftIcon={
          <Icon
            name='whatsapp'
            size={24}
            color='darkgray'
          />
        }
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.whatsapp.value}
        errorMessage={handleFieldError(formValues.whatsapp.validation, 'invalid input')}
        onChangeText={(num) => handleFormInput('whatsapp', num.replace(/[a-z\W]/gi, '').slice(0,11), /^\d{11}$/g)}
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
        errorMessage={handleFieldError(formValues.password.validation, 'should be between 6 and 16 characters')}
        onChangeText={(password) => handleFormInput('password', password, /^.{6,16}$/g)}
      />
      <Input
        label="confirmPassword"
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
        value={formValues.confirmPassword.value}
        errorMessage={handleFieldError(formValues.confirmPassword.validation, 'does not match')}
        onChangeText={(password) => handleConfirmPassword(password)}
      />
      <Input
        label="address"
        autoCapitalize="none"
        autoCorrect={false}
        value={formValues.address.value}
        errorMessage={handleFieldError(formValues.address.validation, 'invalid input')}
        onChangeText={(address) => handleFormInput('address', address, /./g)}
      />
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:30}}>
        <CheckBox
          checked={formValues.agreement.value === '' ? false : true}
          onPress={() => handleFormInput('agreement', formValues.agreement.value === '' ? 'agreed' : '', /./g)} 
        />
        <Text style={{flex:1}}>
          By signing up you have read and agreed to the Yippee <Text style={{color:'darkblue'}} onPress={() => Linking.openURL('https://res.cloudinary.com/yippee/image/upload/v1586848723/Yippee_Terms_of_Use._rk9jxj.pdf#toolbar=0')}>terms of use </Text>
          and <Text style={{color:'darkblue'}}>privacy policy</Text>
        </Text>
      </View>
      <Spacer>
        <Button
          title="Signup"
          loading={signinLoading}
          disabled={fadeBtn || signinLoading}
          onPress={submitSignup}
        />
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.loginLink}>Already have an account? Signin Instead</Text>
        </TouchableOpacity>
      </Spacer>
    </ScrollView>
  );
};

Signup.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  pageTitle: {
    marginBottom: 20,
  },
  loginLink: {
    color: 'darkblue',
    margin: 'auto'
  }
});

export default Signup;
