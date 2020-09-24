import { AsyncStorage, Alert } from 'react-native';
import createDataContext from './createDataContext';
import yippeeApi from '../apis/yippeeApi';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action) {
    default:
      return state;
  }
};

const signup = (dispatch) => async (payload, setSigninLoading) => {
    setSigninLoading(true);
    const { first_name, last_name, phone_number, email, password, address } = payload;
    try {
      const response = await yippeeApi.post('/auth/signup', { first_name, last_name, phone_number, email, password, address });
      await AsyncStorage.setItem('token', response.data.user.token);

      setSigninLoading(false);
      navigate('Categories', '');
    } catch({ message, response: { data } }) {
      setSigninLoading(false);
      Alert.alert(data ? data.error : message);
    }
};

const signin = (dispatch) => {
  return ({ email, password }) => {

  };
};

const signout = (dispatch) => {
  return ({ email, password }) => {

  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { isSignedUp: false }
);
