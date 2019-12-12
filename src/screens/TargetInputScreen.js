import React from 'react';
import {View, TextInput, StyleSheet, Text, ImageBackground, Dimensions} from 'react-native';
import {Chip} from 'react-native-paper';
import {MAIN_COLOR} from '../constants/color';
import {AppStyles} from '../AppStyles';
import Button from 'react-native-button';
import firebase from '@react-native-firebase/app';
import moment from 'moment';

const {width: WIDTH} = Dimensions.get('window')
class TargetInputScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            targetLoss: '',
        };
    }

    onRegister = () => {
        const {navigation} = this.props;
        const signupData = navigation.getParam('data');
        const {targetLoss} = this.state;

        const {
            email, password, fullname, phone,
            weight, height, birthday, gender,
        } = signupData;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const data = {
                    email: email,
                    fullname: fullname,
                    phone: phone,
                    weight: Number(weight),
                    height: Number(height),
                    birthday: moment(birthday).toDate(),
                    gender: gender,
                    targetLoss: Number(targetLoss),
                };
                let user_uid = response.user._user.uid;
                console.log('Sucessful, user ID: ', user_uid);
                firebase
                    .firestore()
                    .collection('users')
                    .doc(user_uid)
                    .set(data);
                firebase
                    .firestore()
                    .collection('users')
                    .doc(user_uid)
                    .get()
                    .then(function (user) {
                        navigation.dispatch({type: 'Login', user: user});
                    })
                    .catch(function (error) {
                        const {code, message} = error;
                        alert(message);
                    });
            })
            .catch(error => {
                const {code, message} = error;
                alert(message);
            });
    };

    render() {
        const {targetLoss} = this.state;

        const isDisabled = targetLoss === '';

        return(
        <ImageBackground
            style={styles.backgroundContainer}
            source={require('../../assets/images/bg1.jpg')}>
            <View>
                <Text style={styles.toptittle}>Create new account</Text>
                <Text style={styles.textLabel}>How much you like to lose in a week?</Text>
                <View>
                    <Chip style={styles.chip} selected={targetLoss === 0.25}
                          textStyle={styles.chipText}
                          mode="outlined" onPress={() => this.setState({targetLoss: 0.25})}>0.25 kg</Chip>
                    <Chip style={styles.chip} selected={targetLoss === 0.5}
                          textStyle={styles.chipText}
                          mode="outlined" onPress={() => this.setState({targetLoss: 0.5})}>0.5 kg</Chip>
                    <Chip style={styles.chip} selected={targetLoss === 1.00}
                          textStyle={styles.chipText}
                          mode="outlined" onPress={() => this.setState({targetLoss: 1.00})}>1.00 kg</Chip>
                </View>
                <Button
                    containerStyle={styles.facebookContainer}
                    style={styles.facebookText}
                    onPress={null}
                    disabled={isDisabled}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </Button>
                <Button
                    containerStyle={[styles.facebookContainer, { marginTop: 10 }]}
                    style={styles.facebookText}
                    onPress={this.onRegister}
                    disabled={isDisabled}
                >
                    <Text style={styles.buttonText}>Complete Sign Up!</Text>
                </Button>

            </View>
        </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    backgroundContainer:{
        flex:1,
        width: null,
        alignItems:'center',
    },
    buttonText:{
        color: 'rgba(255,255,255,0.7)',
        paddingLeft:40,
        paddingRight:40,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'auto',
        marginBottom:'auto',
        fontWeight:'bold',
        fontSize:16
    },
    toptittle:{
        color: 'rgba(255,255,255,1)',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30,
        marginBottom:20,
        fontWeight:'bold',
        fontSize:35,
        fontFamily: 'sans-serif-condensed'
    },
    input: {
        height: 60,
        // borderColor: '#f5f5f5',
        // borderWidth: 2,
        borderRadius: 5,
        marginRight: 30,
        textAlign: 'center',
        // backgroundColor: '#ffefeb',
        fontSize: 30,
        color: '#ff9795',
    },
    textLabel: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 18,
        marginTop: 55,
        marginBottom: 15
    },
    divider: {
        marginTop: 20,
        marginBottom: 10,
    },
    toggleButton: {
        width: 60,
        height: 55,
    },
    facebookContainer: {
        width: WIDTH-85,
        height:35,
        backgroundColor: '#9F6AC9',
        color:'#9F6AC9',
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        marginRight:'auto',
        marginLeft:'auto'
    },
    facebookText: {
        color: AppStyles.color.white,
    },
    chip: {
        paddingTop: 3,
        paddingBottom: 3,
        borderColor: MAIN_COLOR,
        borderWidth: 2,
        margin: 4,
    },
    chipText: {
        fontSize: 18,
        paddingRight: 15,
        textAlign: 'center'
    }
});

export default TargetInputScreen;
