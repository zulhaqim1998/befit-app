import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {Caption, Divider, FAB, Portal, Provider, Surface, Text, List, Avatar} from 'react-native-paper';

import {AppIcon, AppStyles} from '../AppStyles';
import {MAIN_COLOR} from '../constants/color';
import {getAge, getBMRMen, getBMRWomen} from '../constants/helper';
import moment from 'moment';

const textStyle = {
    fontSize: 20,
    textAlign: 'center',
};


class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Home',
        headerLeft: () => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    {navigation.state.params && navigation.state.params.menuIcon ? (
                        <FastImage
                            style={styles.userPhoto}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{uri: navigation.state.params.menuIcon}}
                        />
                    ) : (
                        <FastImage
                            style={styles.userPhoto}
                            resizeMode={FastImage.resizeMode.cover}
                            source={require('../../assets/images/person.jpg')}
                        />
                    )}
                </TouchableOpacity>
            );
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            open: false,
            weight: 0,
            birthday: 0,
            height: 0,
            targetLoss: 0,
            foods: 0,
            balance: 0,
            exercise: 0,
            goal: 0,
            gender: "male"
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            menuIcon: this.props.user.profileURL,
        });

        this.getData();

        // this.willFocusSubscription = this.props.navigation.addListener(
        //     'willFocus',
        //     () => {
        //         this.getData();
        //     }
        // );
    }

    // componentWillUnmount() {
    //     this.willFocusSubscription.remove();
    // }

    getData = () => {
        const {weight, birthday, height, targetLoss, gender} = this.props.user;

        const age = getAge(birthday);
        const bmr = gender === "male" ? getBMRMen(weight, height, age) : getBMRWomen(weight, height, age);

        const goalPercent = targetLoss === 0.25 ? 0.9
            : targetLoss === 0.5 ? 0.8 : 0.6;

        const goal = Math.round(bmr * goalPercent);

        console.log("bmr", bmr);
        console.log("age", age);
        console.log("goal", goal);

        const {activityRecords} = this.props.user;

        const today = moment();
        const todayData = activityRecords[today.year()][today.month()][today.date()];

        let dinner = 0;
        let lunch = 0;
        let breakfast = 0;
        let exercise = 0;

        if(!! todayData) {
            breakfast = !!todayData.breakfast ? todayData.breakfast : 0;
            lunch = !!todayData.lunch ? todayData.lunch : 0;
            dinner = !!todayData.dinner ? todayData.dinner : 0;
            exercise = !!todayData.exercise ? todayData.exercise : 0;
        }

        const foods = breakfast + lunch + dinner;
        const balance = goal - foods + exercise;

        this.setState({foods, balance, exercise, goal});
    };

    renderFAB() {
        return (
            <Provider>
                <Portal>
                    <FAB.Group
                        open={this.state.open}
                        icon={this.state.open ? 'close' : 'plus'}
                        fabStyle={{backgroundColor: '#9F6AC9'}}
                        color={'#fff'}
                        actions={[
                            {icon: 'plus', label: 'Exercise', onPress: () => this.props.navigation.navigate('ExerciseInput')},
                            {icon: 'star', label: 'Breakfast', onPress: () => this.props.navigation.navigate('InputMeal', {type: "breakfast"})},
                            {icon: 'email', label: 'Lunch', onPress: () => this.props.navigation.navigate('InputMeal', {type: "lunch"})},
                            {icon: 'bell', label: 'Dinner', onPress: () => this.props.navigation.navigate('InputMeal', {type: "dinner"})}
                        ]}
                        onStateChange={({open}) => this.setState({open})}
                        onPress={() => {
                            if (this.state.open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </Provider>
        );
    }

    renderMealToday = (type) => {

        const today = moment();
        const mealRecord = this.props.user
            .activityRecords[today.year()][today.month()][today.date()][`${type.toLowerCase()}Record`];

        return (
            <List.Section>
                <List.Subheader>{type}</List.Subheader>
                {!mealRecord && <Text style={{marginLeft: 30}}>No record.</Text>}
                {mealRecord && mealRecord.map((food, index) =>
                    <List.Item title={food.name} left={() => <List.Item title={food.name}
                                                                        key={index}
                                                                        // description="Item description"
                                                                        titleStyle={{textTransform: 'capitalize'}}
                                                                        // right={props => <Text>{food.calorie}</Text>}
                                                                        left={props => <Avatar.Image size={50} source={{uri: food.imageUrl}}/>}
                    />}
                />)}
            </List.Section>
        );
    };

    render() {
        const {foods, exercise, balance, goal} = this.state;

        return (
            <ScrollView style={styles.container}>
                {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/}
                <Surface style={styles.surface}>
                    <View style={{flexDirection: 'row', marginBottom: 20, marginTop: 20}}>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>{goal}</Text>
                            <Caption style={styles.caption}>Goal</Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>-</Text>
                            <Caption></Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>{foods}</Text>
                            <Caption style={styles.caption}>Food</Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>+</Text>
                            <Caption></Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>{exercise}</Text>
                            <Caption style={styles.caption}>Exercise</Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>=</Text>
                            <Caption></Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>{balance}</Text>
                            <Caption style={styles.caption}>Remaining</Caption>
                        </View>
                    </View>
                    <Divider/>
                    {/*<View>*/}
                        {this.renderMealToday("Breakfast")}
                        <Divider/>
                        {this.renderMealToday("Lunch")}
                        <Divider/>
                        {this.renderMealToday("Dinner")}
                    {/*</View>*/}
                </Surface>
                {/*<FAB*/}
                {/*    style={styles.fab}*/}
                {/*    small*/}
                {/*    icon="plus"*/}
                {/*    onPress={() => console.log('Pressed')}*/}
                {/*/>*/}
                {this.renderFAB()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        // padding: Configuration.home.listing_item.offset,

    },
    title: {
        fontFamily: AppStyles.fontName.bold,
        fontWeight: 'bold',
        color: AppStyles.color.title,
        fontSize: 25,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: MAIN_COLOR,
        color: '#fff'
    },
    surface: {
        marginTop: 10,
        minHeight: 200,
        // marginLeft: 6,
        // marginRight: 6,
        // elevation: 4,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 5,
        // paddingTop: 15,
    },
    formulaContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    formulaContent: {
        borderColor: 'red',
        width: 30,
        height: 30,
        borderWidth: 2,
        margin: 3,
    },
    formulaTextContainer: {
        flex: 1,
        width: 'auto',
        height: 'auto',
        fontSize: 18,
        justifyContent: 'center',
    },
    caption: {
        textAlign: 'center',
        fontSize: 9,
    },
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);
