import React from 'react';
import {View, Image, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Card, Title, Button, Avatar, Paragraph, Chip, ActivityIndicator, Colors} from 'react-native-paper';

import vision from '@react-native-firebase/ml-vision';
import {firebase} from '@react-native-firebase/ml-vision';
import {AppIcon} from '../AppStyles';


class ScannedImageViewScreen extends React.Component {

    static navigationOptions = {
        title: "Captured Image"
    };

    constructor(props) {
        super(props);

        this.state = {
            labelData: [],
        };
    }

    componentDidMount() {
        this.sendLabelerRequest();
    }

    sendLabelerRequest = async () => {
        const filePath = this.props.navigation.state.params.imageData.uri;
        const labelData = await firebase.vision().cloudImageLabelerProcessImage(filePath, {
            confidenceThreshold: 0.5,
        });
        this.setState({labelData});
        console.log(labelData);
    };

    renderLabelData() {
        const {labelData} = this.state;

        if (!labelData.length) {
            return <ActivityIndicator animating={true} color={Colors.red800}/>;
        }

        return <ScrollView>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15}}>
                {labelData.map(data => <Chip mode="outlined"
                                             icon={null}
                                             textStyle={{
                                                 fontSize: 18,
                                                 paddingRight: 15
                                             }}
                                             style={{
                                                 paddingTop: 3,
                                                 paddingBottom: 3,
                                                 borderColor: "pink",
                                                 borderWidth: 2,
                                                 margin: 4,
                                             }}
                                             onPress={() => console.log('Pressed')}
                >{data.text}</Chip>)}
            </View>
        </ScrollView>;

    }

    render() {
        const {imageData} = this.props.navigation.state.params;

        return <View style={{flex: 1}}>

            <Card style={{flex: 1}}>
                {/*<Card.Title title="Captured Image"/>*/}
                {/*<Card.Content>*/}
                {/*    <Title>Card title</Title>*/}
                {/*    <Paragraph>Card content</Paragraph>*/}
                {/*</Card.Content>*/}
                <Card.Cover source={imageData} style={{flex: 2}}/>
                {/*<Card.Actions>*/}
                {/*    <Button>Cancel</Button>*/}
                {/*    <Button>Ok</Button>*/}
                {/*</Card.Actions>*/}
                <Card.Content style={{flex: 2}}>
                    {this.renderLabelData()}
                </Card.Content>
            </Card>
        </View>;
    }
}


export default ScannedImageViewScreen;
