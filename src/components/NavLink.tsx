import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';

interface PropsObject {
  navigation: {
    navigate: Function
  },
  context: string,
  link: string
}

const NavLink = ({ navigation, context, link }: PropsObject) => {
  return (
    <Spacer>
      <TouchableOpacity onPress={() => navigation.navigate(link ? link : 'Signin')}>
        <Text style={styles.loginLink}>
          {context ? context : 'Already have an account? Signin Instead'}
        </Text>
      </TouchableOpacity>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  loginLink: {
    color: 'darkblue',
    margin: 'auto'
  }
});

export default withNavigation(NavLink);
