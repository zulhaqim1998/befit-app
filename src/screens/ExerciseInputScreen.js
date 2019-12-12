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

class ExerciseInputScreen extends React.Component {
    static navigationOptions = {
        title: "Meal Input"
    };

    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            exerciseData: null,
            sheetView: false,
            sheetExercise: {},
        };
    }


    componentDidMount() {
        this.getExercises();
    }

    getExercises = async () => {
        // TODO: get all foods data , limit, from firebase
        const querySnapshot = await firebase.firestore().collection('activities').get();

        const exercises = [];
        await querySnapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data();
            data.id = documentSnapshot.id;
            exercises.push(data);
        });
        this.setState({exerciseData: exercises});

    };

    onExercisePress = (exerciseData) => {
        this.setState({sheetExercise: exerciseData, sheetView: true});
    };

    updateExercise = duration => {
        const calorieBurnedPerMinute = this.state.sheetExercise["Calories burned per minute"];
        const {id, activityRecords} = this.props.user;

        const today = moment();
        const month = String(today.month());
        const year = String(today.year());
        const day = String(today.date());

        let exerciseRecord = [];

        let total = duration * calorieBurnedPerMinute;
        const newRecord = {...activityRecords};
        newRecord[year][month][day] = newRecord[year][month].hasOwnProperty(day) ? newRecord[year][month][day] : {};

        if(newRecord[year][month][day].hasOwnProperty("exercise")) {
            total = total + newRecord[year][month][day]["exercise"];
        }
        if(newRecord[year][month][day].hasOwnProperty("exerciseRecord")) {
            exerciseRecord = newRecord[year][month][day]["exerciseRecord"];
        }

        newRecord[year][month][day]["exercise"] = total;
        exerciseRecord.push(this.state.sheetExercise);
        newRecord[year][month][day]["exerciseRecord"] = exerciseRecord;

        firebase.firestore().doc(`users/${id}`).update({
            activityRecords: newRecord
        }).catch(e => console.log(e));

        this.setState({sheetExercise: {}, sheetView: false});
        this.props.navigation.navigate("Home");


    };

    renderExerciseList = () => {
        const {exerciseData} = this.state;

        if (!exerciseData) {
            return <ActivityIndicator animating={true} color={MAIN_COLOR}/>;
        }


        return <ScrollView>
            {exerciseData.map((exercise, index) => {
                return <List.Item title={exercise.name}
                                  key={index}
                                  description={`Calories burned per minute: ${exercise["Calories burned per minute"]}`}
                                  titleStyle={{textTransform: 'capitalize'}}
                                  onPress={() => this.onExercisePress(exercise)}
                                  // right={props => <Text style={{marginRight: 10}}>{food.calorie}</Text>}
                                  left={props => <List.Icon {...props} icon="human-handsup" />}
                />;
            })}
        </ScrollView>;
    };

    render() {
        const { sheetExercise } = this.state;


        return <View style={{flex: 1}}>
            <Searchbar
                placeholder="Search"
                onChangeText={query => {
                    this.setState({firstQuery: query});
                }}
                value={this.state.firstQuery}
            />
            {this.renderExerciseList()}

            <FAB
                style={styles.fab}
                icon="camera"
                color={'#fff'}
                onPress={() => this.props.navigation.navigate('Camera', {type: this.props.navigation.state.params.type})}
            />

            {this.state.sheetView && SheetView.Show({
                title: "Select duration:",
                items: [
                    { title: "5 Minutes", value: 5, subTitle: "5 minutes"},
                    { title: "15 Minutes", value: 15, subTitle: "15 minutes" },
                    { title: "30 Minutes", value: 30, subTitle: "30 minutes" },
                    { title: "1 Hour", value: 60, subTitle: "1 hour" },
                ],
                theme: "light",
                selection: 4,
                onSelection: (index, value) => {
                    // value is optional
                    this.updateExercise(value);
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

export default connect(mapStateToProps)(ExerciseInputScreen);
