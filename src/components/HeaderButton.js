import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { AppIcon, HeaderButtonStyle } from "../AppStyles";

export default class HeaderButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={AppIcon.container} onPress={() => this.props.navigation.dispatch({ type: "Logout" })}>
        <Image style={AppIcon.style} source={require('../../assets/images/person.jpg')} />
      </TouchableOpacity>
    );
  }
}
