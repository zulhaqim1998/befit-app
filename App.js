import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CameraScreen from './screens/CameraScreen';
import ScannedImageViewScreen from './screens/ScannedImageViewScreen';

class HomeScreen extends React.Component {
  render() {
      const {navigate} = this.props.navigation;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
            <Button title="Camera" onPress={() => navigate('Camera')} />
        </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen},
    Camera: { screen: CameraScreen },
    ScannedImage: { screen: ScannedImageViewScreen }

});

export default createAppContainer(AppNavigator);
