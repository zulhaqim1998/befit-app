import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,ImageBackground,Dimensions,TextInput, ScrollView} from 'react-native';
import { Divider, ToggleButton, IconButton, Avatar} from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import {connect} from 'react-redux';
import {MAIN_COLOR} from '../constants/color';
import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';

const {width: WIDTH} = Dimensions.get('window')
class AccountManagement extends React.Component {

    static navigationOptions = {
        title: "Account"
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            phone:'',
            weight: 0,
            height:0
        }
    };

    componentDidMount(){
        const {fullname, email, phone, weight,height} = this.props.user;

        this.setState({
            name: fullname,
            email,
            phone,
            weight: String(weight),
            height: String(height)
        })
    };

    render(){
        console.log(this.props.user);
        return (

            <ImageBackground
                style={styles.backgroundContainer}
                source={require('../../assets/images/bg1.jpg')}>
                 <ScrollView>
                     <Text style={styles.text}>Manage Your Account</Text>
                    <Avatar.Image
                        size={130}
                        style={styles.image}
                        source={require('../../assets/images/person.jpg')} />

                     <Text style={styles.ideal}>Your Ideal Weight Is : 50 KG</Text>
                        <Text style={styles.labelText}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Name'}
                            label='Name'
                            placeholderTextColor={'rgba(255,255,255, 0.7)'}
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                        />
                        <Text style={styles.labelText}>Email:</Text>
                         <TextInput
                             style={styles.input}
                             placeholder={'Email'}
                             placeholderTextColor={'rgba(255,255,255, 0.7)'}
                             underlineColorAndroid='transparent'
                             value={this.state.email}
                             onChangeText={text => this.setState({ name: text })}
                         />
                        <Text style={styles.labelText}>Phone:</Text>
                         <TextInput
                             style={styles.input}
                             placeholder={'Phone'}
                             placeholderTextColor={'rgba(255,255,255, 0.7)'}
                             underlineColorAndroid='transparent'
                             value={this.state.phone}
                             onChangeText={text => this.setState({ name: text })}
                         />
                        <Text style={styles.labelText}>Weight:</Text>
                         <TextInput
                             style={styles.input}
                             placeholder={'Weight'}
                             placeholderTextColor={'rgba(255,255,255, 0.7)'}
                             keyboardType="number-pad"
                             underlineColorAndroid='transparent'
                             value={this.state.weight}
                             onChangeText={text => this.setState({ name: text })}
                         />
                        <Text style={styles.labelText}>Height:</Text>
                         <TextInput
                             style={styles.input}
                             placeholder={'Height'}
                             placeholderTextColor={'rgba(255,255,255, 0.7)'}
                             keyboardType="number-pad"
                             underlineColorAndroid='transparent'
                             value={this.state.height}
                             onChangeText={text => this.setState({ name: text })}
                         />
                     <Button
                         containerStyle={[styles.facebookContainer, {marginTop: 10}]}
                         style={styles.facebookText}
                         onPress={null}
                     >
                         <Text style={styles.buttonText}>Next</Text>
                     </Button>
               </ScrollView>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    labelText: {
        color: 'rgba(255,255,255,1)',
        paddingLeft: 40,
        paddingRight: 40,
        marginRight: 'auto',
        marginBottom: 2,
        fontWeight: 'bold',
        fontSize: 16,
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
    facebookContainer: {
        width: WIDTH - 55,
        height: 35,
        backgroundColor: '#9F6AC9',
        color: '#9F6AC9',
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 50,
        marginBottom: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    backgroundContainer:{
      flex:1,
        width: null,
      alignItems:'center',
    },
    image:{
      // alignItems:'center',
      // justifyContent: 'center',
      // margin:10,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text:{
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:'bold',
        marginBottom:15,
        fontSize:25,
        color: 'rgba(255,255,255,1)',
        fontFamily: 'sans-serif-condensed'
    },
    ideal:{
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:'bold',
        marginBottom:10,
        fontSize:15,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'sans-serif-condensed'
    },
    input: {
        width: WIDTH-55,
        height: 40,
        borderRadius:25,
        fontSize: 14,
        marginBottom:8,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal:25
    },
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(AccountManagement);
