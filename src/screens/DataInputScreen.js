import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Divider, ToggleButton, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Button from "react-native-button";
import {AppStyles} from '../AppStyles';
import firebase from '@react-native-firebase/app';
import {MAIN_COLOR} from '../constants/color';



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

    goToTargetInput = () => {
        const { email, password, fullname, phone } = this.state;
        const signupData = this.props.navigation.getParam("data");
        const data = {
            email: email,
            fullname: fullname,
            phone: phone,
            password: password,
            ...signupData
        };

        this.props.navigation.navigate("TargetInput", {data})

    };

    render() {
        const {showDatePicker, birthday, weight, height, gender} = this.state;
        const isDisabled = weight === '' || height === '' || gender === '' || birthday === '';

        return <View style={{flex: 1, backgroundColor: 'white', paddingTop: 50}}>
            <View style={{marginRight: 40, marginLeft: 40}}>
                <Text style={styles.textLabel}>Weight (kg)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({weight: text})}
                    value={this.state.weight}
                    underlineColorAndroid={MAIN_COLOR}
                    maxLength={5}
                />


                <Text style={styles.textLabel}>Height (cm)</Text>
                <TextInput //onFocus={this.focusedInput}
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({height: text})}
                    value={this.state.height}
                    underlineColorAndroid={MAIN_COLOR}
                    maxLength={5}
                />

                <Text style={styles.textLabel}>Birthday</Text>
                <TextInput //onFocus={this.focusedInput}
                    style={styles.input}
                    underlineColorAndroid={MAIN_COLOR}
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
                    <ToggleButton style={styles.toggleButton} size={50} color={MAIN_COLOR} icon="gender-male" value="male"/>
                    <ToggleButton style={styles.toggleButton} size={50} color={MAIN_COLOR} icon="gender-female"
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
                onPress={this.goToTargetInput}
                disabled={isDisabled}
            >
                Next
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
        color: MAIN_COLOR,
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
        backgroundColor: MAIN_COLOR,
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

