import React from "react";
import {View} from 'react-native';
import {Text} from 'react-native-paper';

class WeightInputScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            weight: null
        };
    }

    render() {
        return <View style={{flex: 1}}>
            <Text>WEIGHTT</Text>
        </View>;
    }
}


export default WeightInputScreen;
