import React from 'react';
import Button from 'react-native-button';
import {Text, View, StyleSheet, ImageBackground, Image, Dimensions} from 'react-native';
import {AppStyles} from '../AppStyles';
import {AsyncStorage, ActivityIndicator} from 'react-native';
// import firebase from "@react-native-firebase/app";
import {firebase} from '@react-native-firebase/auth';
import {MAIN_COLOR} from '../constants/color';
import {Avatar} from 'react-native-paper';


const {width: WIDTH} = Dimensions.get('window');
class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.tryToLoginFirst();
    }

    render() {
        if (this.state.isLoading === true) {
            return (
                <ActivityIndicator
                    style={styles.spinner}
                    size="large"
                    color={AppStyles.color.tint}
                />
            );
        }
        return (
            <ImageBackground
                style={styles.backgroundContainer}
                source={require('../../assets/images/bg2.jpg')}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/font.png')} />

                    <Button
                        containerStyle={styles.loginContainer}
                        style={styles.loginText}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        Log In
                    </Button>
                    <Button
                        containerStyle={styles.signupContainer}
                        style={styles.signupText}
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                        Sign Up
                    </Button>
                </View>
            </ImageBackground>
        );
    }

    async tryToLoginFirst() {
        const email = await AsyncStorage.getItem('@loggedInUserID:key');
        const password = await AsyncStorage.getItem('@loggedInUserID:password');
        const id = await AsyncStorage.getItem('@loggedInUserID:id');
        if (
            id != null &&
            id.length > 0 &&
            password != null &&
            password.length > 0
        ) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    const {navigation} = this.props;
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(id)
                        .get()
                        .then(function (doc) {
                            const d = doc.data();
                            var dict = {
                                id: id,
                                email: email,
                                fullname: d.fullname,
                                birthday: d.birthday.toDate(),
                                gender: d.gender,
                                height: d.height,
                                weight: d.weight,
                                targetLoss: d.targetLoss,
                                phone: d.phone,
                                activityRecords: d.activityRecords

                            };
                            if (doc.exists) {
                                navigation.dispatch({
                                    type: 'Login',
                                    user: dict,
                                });
                            }
                        })
                        .catch(function (error) {
                            const {code, message} = error;
                            alert(message);
                        });
                    this.state.isLoading = false;
                })
                .catch(error => {
                    const {code, message} = error;
                    alert(message);
                    // For details of error codes, see the docs
                    // The message contains the default Firebase string
                    // representation of the error
                });
            return;
        }
        const fbToken = await AsyncStorage.getItem(
            '@loggedInUserID:facebookCredentialAccessToken',
        );
        if (id != null && id.length > 0 && fbToken != null && fbToken.length > 0) {
            const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(result => {
                    var user = result.user;
                    var userDict = {
                        id: user.uid,
                        fullname: user.displayName,
                        email: user.email,
                        profileURL: user.photoURL,
                    };
                    this.props.navigation.dispatch({
                        type: 'Login',
                        user: userDict,
                    });
                })
                .catch(error => {
                    this.setState({isLoading: false});
                });
            return;
        }
        this.setState({isLoading: false});
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        alignItems: 'center',
    },
    image: {
        resizeMode:'contain',
        width:WIDTH-55,
        marginTop:-100,
        marginBottom:-40

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 150,
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: MAIN_COLOR,
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    loginContainer: {
        width: WIDTH - 125,
        backgroundColor: '#9F6AC9',
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
    },
    loginText: {
        color: AppStyles.color.white,
    },
    signupContainer: {
        width: WIDTH - 125,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 8,
        borderWidth: 1,
        borderColor: '#9F6AC9',
        marginTop: 15,
    },
    signupText: {
        color: '#9F6AC9',
    },
    spinner: {
        marginTop: 200,
    },
});

export default WelcomeScreen;
