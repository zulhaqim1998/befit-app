import React from "react";
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {connect} from 'react-redux';

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

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(WeightInputScreen);

