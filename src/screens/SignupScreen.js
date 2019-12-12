import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {MAIN_COLOR} from '../constants/color';

const {width: WIDTH} = Dimensions.get('window');

class SignupScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            fullname: '',
            phone: '',
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                loading: false,
                user,
            });
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    }


    goToDataInput = () => {
        const {email, password, fullname, phone} = this.state;
        const data = {
            email: email,
            fullname: fullname,
            phone: phone,
            password: password,
        };

        this.props.navigation.navigate('DataInput', {data});

    };


    render() {
        return (

            <ImageBackground
                style={styles.backgroundContainer}
                source={require('../../assets/images/bg1.jpg')}>
                <View>
                    <Text style={styles.toptittle}>Create new account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        onChangeText={text => this.setState({fullname: text})}
                        value={this.state.fullname}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        onChangeText={text => this.setState({phone: text})}
                        value={this.state.phone}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail Address"
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                    />
                    <Button
                        containerStyle={styles.facebookContainer}
                        style={styles.facebookText}
                        onPress={null}>
                        <Text style={styles.buttonText}>Back</Text>
                    </Button>
                    <Button
                        containerStyle={[styles.facebookContainer, {marginTop: 10}]}
                        style={styles.buttton}
                        onPress={this.goToDataInput}
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
    button: {
        color: '#9F6AC9',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'sans-serif-condensed',
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
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: MAIN_COLOR,
        marginTop: 20,
        marginBottom: 20,
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
    },
    content: {
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'center',
        fontSize: AppStyles.fontSize.content,
        color: AppStyles.color.text,
    },
    loginContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: MAIN_COLOR,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    loginText: {
        color: AppStyles.color.white,
    },
    placeholder: {
        fontFamily: AppStyles.fontName.text,
        color: 'red',
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main,
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
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

export default SignupScreen;
