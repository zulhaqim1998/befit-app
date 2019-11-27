import React from "react";
import {View, Image, Button} from 'react-native';

import vision from '@react-native-firebase/ml-vision';
import { firebase } from '@react-native-firebase/ml-vision';


class ScannedImageViewScreen extends React.Component {

    sendLabelerRequest = async() => {
        const filePath = this.props.navigation.state.params.imageData.uri;
        const labelData = await firebase.vision().cloudImageLabelerProcessImage(filePath, {
            confidenceThreshold: 0.5,
        });
        console.log("Labeldata");

        console.log(labelData);
    };

    render() {
        const {imageData} = this.props.navigation.state.params;
        console.log(imageData);

        return <View>
            <Button title="Scan" onPress={() => this.sendLabelerRequest()} />
            <Image style={{width: 300, resizeMode: 'contain'}} source={imageData} />
        </View>;
    }
}


export default ScannedImageViewScreen;
