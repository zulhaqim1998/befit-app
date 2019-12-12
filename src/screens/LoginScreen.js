import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import {AsyncStorage} from 'react-native';
import {MAIN_COLOR} from '../constants/color';
// const FBSDK = require("react-native-fbsdk");
// const { LoginManager, AccessToken } = FBSDK;

const {width: WIDTH} = Dimensions.get('window');

class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            email: '',
            password: '',
        };
    }

    onPressLogin = () => {
        const {email, password} = this.state;
        if (email.length <= 0 || password.length <= 0) {
            alert('Please fill out the required fields.');
            return;
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const {navigation} = this.props;
                let user_uid = response.user._user.uid;
                firebase
                    .firestore()
                    .collection('users')
                    .doc(user_uid)
                    .get()
                    .then(function (user) {
                        if (user.exists) {
                            AsyncStorage.setItem('@loggedInUserID:id', user_uid);
                            AsyncStorage.setItem('@loggedInUserID:key', email);
                            AsyncStorage.setItem('@loggedInUserID:password', password);
                            navigation.dispatch({type: 'Login', user: user});
                        } else {
                            alert('User does not exist. Please try again.');
                        }
                    })
                    .catch(function (error) {
                        const {code, message} = error;
                        alert(message);
                    });
            })
            .catch(error => {
                const {code, message} = error;
                alert(message);
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    };

    // onPressFacebook = () => {
    //   LoginManager.logInWithReadPermissions([
    //     "public_profile",
    //     "user_friends",
    //     "email"
    //   ]).then(
    //     result => {
    //       if (result.isCancelled) {
    //         alert("Whoops!", "You cancelled the sign in.");
    //       } else {
    //         AccessToken.getCurrentAccessToken().then(data => {
    //           const credential = firebase.auth.FacebookAuthProvider.credential(
    //             data.accessToken
    //           );
    //           const accessToken = data.accessToken;
    //           firebase
    //             .auth()
    //             .signInWithCredential(credential)
    //             .then(result => {
    //               var user = result.user;
    //               AsyncStorage.setItem(
    //                 "@loggedInUserID:facebookCredentialAccessToken",
    //                 accessToken
    //               );
    //               AsyncStorage.setItem("@loggedInUserID:id", user.uid);
    //               var userDict = {
    //                 id: user.uid,
    //                 fullname: user.displayName,
    //                 email: user.email,
    //                 profileURL: user.photoURL
    //               };
    //               var data = {
    //                 ...userDict,
    //                 appIdentifier: "rn-android-universal-listings"
    //               };
    //               firebase
    //                 .firestore()
    //                 .collection("users")
    //                 .doc(user.uid)
    //                 .set(data);
    //               this.props.navigation.dispatch({
    //                 type: "Login",
    //                 user: userDict
    //               });
    //             })
    //             .catch(error => {
    //               alert("Please try again! " + error);
    //             });
    //         });
    //       }
    //     },
    //     error => {
    //       Alert.alert("Sign in error", error);
    //     }
    //   );
    // };

    render() {
        return (
            <ImageBackground
                style={styles.backgroundContainer}
                source={require('../../assets/images/bg1.jpg')}>
                <View style={styles.container}>
                    <Text style={styles.toptittle}>Log in to Your Account!</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                    />
                    <Button
                        containerStyle={[styles.facebookContainer, {marginTop: 10}]}
                        style={styles.loginText}
                        onPress={() => this.onPressLogin()}
                    >
                        <Text style={styles.buttonText}>Log In !</Text>
                    </Button>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signup')}
                        style={styles.TO}
                    >
                        <Text style={{color: '#fcff72',fontWeight:'bold'}}>Don't have an account ?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    TO: {
        marginTop: 10,
        color: '#83DEDB',
    },
    toptittle: {
        color: 'rgba(255,255,255,1)',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        marginBottom: 60,
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'sans-serif-condensed',
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
    backgroundContainer: {
        flex: 1,
        width: null,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    or: {
        fontFamily: AppStyles.fontName.main,
        color: 'black',
        marginTop: 40,
        marginBottom: 10,
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

export default LoginScreen;
