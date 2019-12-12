import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Button, Image} from 'react-native';
import {Searchbar, List, ActivityIndicator, Colors, Text, Avatar, FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons';
import {MAIN_COLOR} from '../constants/color';
import moment from 'moment';

let SheetView = RNBottomActionSheet.SheetView;



class InputMealScreen extends React.Component {
    static navigationOptions = {
        title: "Meal Input"
    };

    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            foodsData: null,
            sheetView: false,
            sheetFoodData: {},
        };
    }


    componentDidMount() {
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

    onFoodPress = (foodData) => {
        this.setState({sheetFoodData: foodData, sheetView: true});
    };

    updateMeal = portion => {
        const {calorie} = this.state.sheetFoodData;
        const mealType = this.props.navigation.state.params.type;
        const {id, activityRecords} = this.props.user;

        console.log("PRESSEDDDDDDDD!!!!!!!!!!")

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

        firebase.firestore().doc(`users/${id}`).update({
            activityRecords: newRecord
        }).catch(e => console.log(e));

        this.setState({sheetFoodData: {}, sheetView: false});
        this.props.navigation.navigate("Home");


    };

    renderFoodsList = () => {
        const {foodsData} = this.state;

        if (!foodsData) {
            return <ActivityIndicator animating={true} color={MAIN_COLOR}/>;
        }


        return <ScrollView>
            {foodsData.map((food, index) => {
                return <List.Item title={food.name}
                                  key={index}
                                  description="Item description"
                                  titleStyle={{textTransform: 'capitalize'}}
                                  onPress={() => this.onFoodPress(food)}
                                  right={props => <Text style={{marginRight: 10}}>{food.calorie}</Text>}
                                  left={props => <Avatar.Image size={50} source={{uri: food.imageUrl}}/>}
                />;
            })}
        </ScrollView>;
    };

    render() {
        const { sheetFoodData } = this.state;


        return <View style={{flex: 1}}>
            <Searchbar
                placeholder="Search"
                onChangeText={query => {
                    this.setState({firstQuery: query});
                }}
                value={this.state.firstQuery}
            />
            {this.renderFoodsList()}

            <FAB
                style={styles.fab}
                icon="camera"
                color={'#fff'}
                onPress={() => this.props.navigation.navigate('Camera', {type: this.props.navigation.state.params.type})}
            />

            {/*<RNBottomActionSheet.SheetView visible={this.state.sheetView} title="Select portion:" theme={'light'}*/}
            {/*                               onSelection={(index, value) => console.log(value)}>*/}
            {/*    <RNBottomActionSheet.SheetView.Item title={'Full'} value={1} subTitle={'Full'} />*/}
            {/*    <RNBottomActionSheet.SheetView.Item title={'Half'} value={0.5} subTitle={'Half'} />*/}
            {/*    <RNBottomActionSheet.SheetView.Item title={'Quarter'} value={0.25} subTitle={'Quarter'} />*/}
            {/*</RNBottomActionSheet.SheetView>*/}

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
                    this.updateMeal(value);
                },
                onCancel: () => console.log('Closing the bottom SheetView!!!')
            })}
        </View>;
    }
}


const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: MAIN_COLOR
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(InputMealScreen);
