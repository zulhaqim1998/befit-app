import React from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Divider, ToggleButton, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Button from "react-native-button";
import {AppStyles} from '../AppStyles';
import firebase from '@react-native-firebase/app';



class DataInputScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            weight: '',
            height: '',
            showDatePicker: false,
            date: new Date(),
            birthday: '',
            gender: '',

        };
    }

    onRegister = () => {
        const { navigation } = this.props;
        const signupData = navigation.getParam("data");
        const { weight, height, birthday, gender } = this.state;

        const {email, password, fullname, phone} = signupData;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const data = {
                    email: email,
                    fullname: fullname,
                    phone: phone,
                    weight: weight,
                    height: height,
                    birthday: moment(birthday).toDate(),
                    gender: gender
                };
                let user_uid = response.user._user.uid;
                console.log("Sucessful, user ID: ", user_uid)
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user_uid)
                    .set(data);
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user_uid)
                    .get()
                    .then(function(user) {
                        navigation.dispatch({ type: "Login", user: user });
                    })
                    .catch(function(error) {
                        const { code, message } = error;
                        alert(message);
                    });
            })
            .catch(error => {
                const { code, message } = error;
                alert(message);
            });
    };

    render() {
        const {showDatePicker, birthday, weight, height, gender} = this.state;
        const isDisabled = weight === '' || height === '' || gender === '' || birthday === '';

        return <View style={{flex: 1, backgroundColor: 'white', paddingTop: 50}}>
            <View style={{marginRight: 40, marginLeft: 40}}>
                <Text style={styles.textLabel}>Weight (kg)</Text>
                <TextInput //onFocus={this.focusedInput}
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({weight: text})}
                    ref={c => {
                        this.textInput = c;
                    }}
                    value={this.state.weight}
                    underlineColorAndroid={AppStyles.color.tint}
                    maxLength={5}
                />


                <Text style={styles.textLabel}>Height (cm)</Text>
                <TextInput //onFocus={this.focusedInput}
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({height: text})}
                    value={this.state.height}
                    ref={c => {
                        this.textInput = c;
                    }}
                    underlineColorAndroid={AppStyles.color.tint}
                    maxLength={5}
                />

                <Text style={styles.textLabel}>Birthday</Text>
                <TextInput //onFocus={this.focusedInput}
                    style={styles.input}
                    underlineColorAndroid={AppStyles.color.tint}
                    onFocus={() => this.setState({showDatePicker: true})}
                    value={birthday ? moment(birthday).format('DD/MM/YYYY') : ''}
                />
                {showDatePicker && <DateTimePicker value={new Date()}
                                                   mode={'date'}
                                                   display="spinner"
                                                   editable={false}
                                                   keyboardType={null}
                                                   showSoftInputOnFocus={false}
                                                   onChange={(e, date) => this.setState({
                                                       birthday: moment(date).toDate(),
                                                       showDatePicker: false,
                                                   })}
                />}

                <Text style={styles.textLabel}>Gender</Text>
                <ToggleButton.Row
                    onValueChange={value => this.setState({gender: value})}
                    value={this.state.gender}
                >
                    <ToggleButton style={styles.toggleButton} size={50} color={AppStyles.color.tint} icon="gender-male" value="male"/>
                    <ToggleButton style={styles.toggleButton} size={50} color={AppStyles.color.tint} icon="gender-female"
                                  value="female"/>
                </ToggleButton.Row>

            </View>
            {/*<View style={{*/}
            {/*    flexDirection: 'row',*/}
            {/*    justifyContent: 'space-between',*/}
            {/*    marginBottom: 0,*/}
            {/*    position: 'absolute',*/}
            {/*    bottom: 0,*/}
            {/*}}>*/}
            {/*    <Button style={{flex: 1}} title="Back" onPress={() => null} />*/}
            {/*    <Button style={{flex: 1}} title="Sign Up" onPress={() => null} />*/}
            {/*</View>*/}
            <Button
                containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
                style={styles.facebookText}
                onPress={this.onRegister}
                disabled={isDisabled}
            >
                Complete Sign Up!
            </Button>
        </View>;
    }
}

const styles = StyleSheet.create({
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
        color: AppStyles.color.tint,
        fontSize: 18,
        margin: 10,
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
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    facebookText: {
        color: AppStyles.color.white
    }
});


export default DataInputScreen;

