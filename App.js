import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import AppReducer from './src/reducers';
import {AppNavigator, middleware} from './src/navigations/AppNavigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const store = createStore(AppReducer, applyMiddleware(middleware));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

console.disableYellowBox = true;

class StarterApp extends React.Component {
    render() {
        return (
            <Provider store={store} theme={theme}>
                <PaperProvider>
                    <AppNavigator/>
                </PaperProvider>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('StarterApp', () => StarterApp);

export default StarterApp;
