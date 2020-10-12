import createDataContext from './createDataContext';

interface ActionObj {
  type: string,
  payload: object | string | number | boolean
}

const locationReducer = (state: object, action: ActionObj) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

const startRecording = (dispatch) => () => {};

const stopRecording = (dispatch) => () => {};

const addLocation = (dispatch: Function) => (location: object) => {
  dispatch({ type: 'add_current_location', payload: location });
};

const initialLocation = {
  coords: {
    latitud: 37.33233141,
    longitude: -122.0312186
  }
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation },
  { recording: false, locations: [], currentLocation: initialLocation }
);