import React from 'react';
import {View, TextInput, StyleSheet, Text, ImageBackground, Dimensions} from 'react-native';
import {Divider, ToggleButton, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';
import firebase from '@react-native-firebase/app';
import {MAIN_COLOR} from '../constants/color';


const {width: WIDTH} = Dimensions.get('window');

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
        const {email, password, fullname, phone} = this.state;
        const signupData = this.props.navigation.getParam('data');
        const data = {
            email: email,
            fullname: fullname,
            phone: phone,
            password: password,
            ...signupData,
        };

        this.props.navigation.navigate('TargetInput', {data});

    };

    render() {
        const {showDatePicker, birthday, weight, height, gender} = this.state;
        const isDisabled = weight === '' || height === '' || gender === '' || birthday === '';

        return (
            <ImageBackground
                style={styles.backgroundContainer}
                source={require('../../assets/images/bg1.jpg')}>
                <View>
                    <Text style={styles.toptittle}>Create new account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Weight"
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                        keyboardType="number-pad"
                        onChangeText={text => this.setState({weight: text})}
                        value={this.state.weight}
                        maxLength={5}
                    />
                    <TextInput //onFocus={this.focusedInput}
                        style={styles.input}
                        placeholder="Height"
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                        keyboardType="number-pad"
                        onChangeText={text => this.setState({height: text})}
                        value={this.state.height}
                        maxLength={5}
                    />
                    <TextInput //onFocus={this.focusedInput}
                        style={styles.input}
                        placeholder="Date of Birth"
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
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

                    <ToggleButton.Row
                        style={styles.genderButton}
                        onValueChange={value => this.setState({gender: value})}
                        value={this.state.gender}
                    >
                        <Text style={styles.genderText}>Choose your gender</Text>
                        <ToggleButton style={styles.toggleButton} size={50} color={MAIN_COLOR} icon="gender-male"
                                      value="male"/>
                        <ToggleButton style={styles.toggleButton} size={50} color={MAIN_COLOR} icon="gender-female"
                                      value="female"/>
                    </ToggleButton.Row>
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
                        containerStyle={styles.facebookContainer}
                        style={styles.facebookText}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Back</Text>
                    </Button>
                    <Button
                        containerStyle={[styles.facebookContainer, {marginTop: 10}]}
                        style={styles.facebookText}
                        onPress={this.goToTargetInput}
                        disabled={isDisabled}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </Button>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        alignItems: 'center',
    },
    buttonText: {
        color: 'rgba(255,255,255,0.7)',
        paddingLeft: 40,
        paddingRight: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold',
        fontSize: 16,
    },
    genderText: {
        marginRight: 25,
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'rgba(255,255,255,1)',
        fontSize: 20,
        fontFamily: 'sans-serif-condensed',
    },
    genderButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        color: '#9F6AC9',
    },
    toptittle: {
        color: 'rgba(255,255,255,1)',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'sans-serif-condensed',
    },
    input: {
        width: WIDTH - 55,
        height: 40,
        borderRadius: 25,
        fontSize: 14,
        marginTop: 15,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
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
        width: WIDTH - 85,
        height: 35,
        backgroundColor: '#9F6AC9',
        color: '#9F6AC9',
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    facebookText: {
        color: AppStyles.color.white,
    },
});


export default DataInputScreen;

