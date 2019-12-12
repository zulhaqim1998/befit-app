import React from 'react';
import {View, Image, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Card, Title, Button, Avatar, Paragraph, Chip, ActivityIndicator, Colors} from 'react-native-paper';

import vision from '@react-native-firebase/ml-vision';
import {firebase} from '@react-native-firebase/ml-vision';
import {AppIcon} from '../AppStyles';
import {MAIN_COLOR} from '../constants/color';
import moment from 'moment';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

let SheetView = RNBottomActionSheet.SheetView;


class ScannedImageViewScreen extends React.Component {

    static navigationOptions = {
        title: "Food Image"
    };

    constructor(props) {
        super(props);

        this.state = {
            labelData: [],
            foodsData: [],
            sheetView: false,
            sheetFoodData: {}

        };
    }

    componentDidMount() {
        this.sendLabelerRequest();
        this.getFoods();
    }

    getFoods = async () => {
        // TODO: get all foods data , limit, from firebase
        const querySnapshot = await firebase.firestore().collection('foods').get();

        const foods = [];
        await querySnapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data();
            data.id = documentSnapshot.id;
            foods.push(data);
        });
        this.setState({foodsData: foods});

    };

    sendLabelerRequest = async () => {
        const filePath = this.props.navigation.state.params.imageData.uri;
        const labelData = await firebase.vision().cloudImageLabelerProcessImage(filePath, {
            confidenceThreshold: 0.5,
        });
        this.setState({labelData});
        console.log(labelData);
    };

    onFoodPress = (foodData) => {
        this.setState({sheetFoodData: foodData, sheetView: true});
    };

    updateMeal = portion => {
        const {calorie} = this.state.sheetFoodData;
        const mealType = this.props.navigation.state.params.type;
        const {id, activityRecords} = this.props.user;


        const today = moment();
        const month = String(today.month());
        const year = String(today.year());
        const day = String(today.date());

        let taken = calorie * portion;
        const newRecord = {...activityRecords};
        newRecord[year][month][day] = newRecord[year][month].hasOwnProperty(day) ? newRecord[year][month][day] : {};

        if(newRecord[year][month][day].hasOwnProperty(mealType)) {
            taken = taken + newRecord[year][month][day][mealType];
        }
        newRecord[year][month][day][mealType] = taken;

        firestore().doc(`users/${id}`).update({
            activityRecords: newRecord
        }).catch(e => console.log(e));

        this.setState({sheetFoodData: {}, sheetView: false});
        this.props.navigation.navigate("Home");


    };

    renderLabelData() {
        const {labelData, foodsData} = this.state;

        const selectedLabel = [];//labelData.filter(label => foodsData.find(food => food.name.search(label.text)) === -1);

        labelData.forEach(label => {
            foodsData.forEach(food => {
                if(food.name.toLowerCase().search(label.text.toLowerCase()) !== -1) {
                    selectedLabel.push(food);
                }
            });
        });
        console.log(selectedLabel);

        if (!selectedLabel.length) {
            return <ActivityIndicator animating={true} color={MAIN_COLOR}/>;
        }

        return <ScrollView>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15}}>
                {selectedLabel.map(food => <Chip mode="outlined"
                                             icon={null}
                                             textStyle={{
                                                 fontSize: 18,
                                                 paddingRight: 15,
                                                 textTransform: 'capitalize'
                                             }}
                                             style={{
                                                 paddingTop: 3,
                                                 paddingBottom: 3,
                                                 borderColor: MAIN_COLOR,
                                                 borderWidth: 2,
                                                 margin: 4,
                                             }}
                                             onPress={() => this.onFoodPress(food)}
                >{food.name} ({food.calorie} cal)</Chip>)}
            </View>
        </ScrollView>;

    }

    render() {
        const {imageData} = this.props.navigation.state.params;

        return <View style={{flex: 1}}>

            <Card style={{flex: 1}}>

                <Card.Cover source={imageData} style={{flex: 2}}/>
                <Card.Content style={{flex: 2}}>
                    {this.renderLabelData()}
                </Card.Content>
            </Card>

            {this.state.sheetView && SheetView.Show({
                title: "Select portion:",
                items: [
                    { title: "Full", value: 1, subTitle: "Full"},
                    { title: "Half", value: 0.5, subTitle: "Half" },
                    { title: "Quarter", value: 0.25, subTitle: "Quarter" },
                ],
                theme: "light",
                selection: 3,
                onSelection: (index, value) => {
                    // value is optional
                    this.setState({sheetView: false});
                    this.updateMeal(value);
                },
                onCancel: () => console.log('Closing the bottom SheetView!!!')
            })}
        </View>;
    }
}


const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ScannedImageViewScreen);
