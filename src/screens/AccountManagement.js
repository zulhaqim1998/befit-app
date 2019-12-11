import React from 'react';
import {StyleSheet, TouchableOpacity, View,ImageBackground,Dimensions,TextInput} from 'react-native';
import { Divider, ToggleButton, IconButton, Avatar} from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import {connect} from 'react-redux';
import {MAIN_COLOR} from '../constants/color';

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
            weight,
            height
        })
    };

    render(){
        console.log(this.props.user);
        return (
            <View>
                <Avatar.Image
                    size={150}
                    // style={styles}
                    source={require('../../assets/images/person.jpg')} />
                <TextInput
                    style={styles.input}
                    placeholder={'Name'}
                    placeholderTextColor={'rgba(255,255,255, 0.7)'}
                    underlineColorAndroid='transparent'
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    backgroundContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    input: {
        width: WIDTH-55,
        height: 45,
        borderRadius:25,
        fontSize: 16,
        marginTop:55,
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
