import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Button, Image} from 'react-native';
import {Searchbar, List, ActivityIndicator, Colors, Text, Avatar, FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {MAIN_COLOR} from '../constants/color';


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

    // state = {
    //     index: 0,
    //     routes: [
    //         { key: 'first', title: 'Search Food' },
    //         { key: 'second', title: 'Capture Food' },
    //     ],
    // };
    //
    // firstRoute = () => (
    //     <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
    // );
    //
    // secondRoute = () => (
    //     <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    // );

//     render() {
//         return (
//             {/*<TabView*/}
//             {/*    navigationState={this.state}*/}
//             {/*    renderScene={SceneMap({*/}
//             {/*        first: this.firstRoute,*/}
//             {/*        second: this.secondRoute,*/}
//             {/*    })}*/}
//             {/*    onIndexChange={index => this.setState({ index })}*/}
//             {/*    initialLayout={{ width: Dimensions.get('window').width }}*/}
//             {/*/>*/}
//
//         );
//     }

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


    // updateMonthlyWActivity = (userId, date, type, calorie) => {
    //     firestore().collection('users').
    // };


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
        console.log(this.props.user);

        let facebook = <Icon family={'FontAwesome'} name={'facebook'} color={'#000000'} size={30}/>;
        let instagram = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30}/>;

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
                onPress={() => this.props.navigation.navigate('Camera')}
            />

            <RNBottomActionSheet.SheetView visible={this.state.sheetView} title="Select portion:" theme={'light'}
                                           onSelection={(index, value) => {
                                               // value is optional
                                               console.log('selection: ' + index + ' ' + value);
                                           }}>
                <RNBottomActionSheet.SheetView.Item title={'Full'} value={1} subTitle={'Full'} />
                <RNBottomActionSheet.SheetView.Item title={'Half'} value={0.5} subTitle={'Half'} />
                <RNBottomActionSheet.SheetView.Item title={'Quarter'} value={0.25} subTitle={'Quarter'} />
            </RNBottomActionSheet.SheetView>

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
