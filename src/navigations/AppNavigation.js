import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import DrawerContainer from "../components/DrawerContainer";
import DataInputScreen from '../screens/DataInputScreen';
import CameraScreen from '../screens/CameraScreen';
import ScannedImageViewScreen from '../screens/ScannedImageViewScreen';
import InputMealScreen from '../screens/InputMealScreen';
import {MAIN_COLOR} from '../constants/color';
import TargetInputScreen from '../screens/TargetInputScreen';
import AccountManagement from '../screens/AccountManagement';
import GoalProgressionScreen from '../screens/GoalProgressionScreen';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const middleware = createReactNavigationReduxMiddleware(
  // "root",
  state => state.nav
);

// login stack
const LoginStack = createStackNavigator(
  {
    DataInput: { screen: DataInputScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Welcome: { screen: WelcomeScreen },
    TargetInput: { screen: TargetInputScreen }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Camera: { screen: CameraScreen },
    ScannedImage: { screen: ScannedImageViewScreen },
    InputMeal: { screen: InputMealScreen}
  },
  {
    initialRouteName: "Home",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: MAIN_COLOR,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack, navigationOptions: {
        tabBarLabel:"Home",
        tabBarIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../../assets/images/home.jpg')}
            />
        )
      }},

    AccountManagement: {screen: AccountManagement, navigationOptions: {
        tabBarLabel:"Profile Page",
        tabBarIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../../assets/images/person.jpg')}
            />
        )
      }},
    GoalProgression: { screen: GoalProgressionScreen, navigationOptions: {
            tabBarLabel:"Goal Diagram",
            tabBarIcon: ({ tintColor }) => (
                <Image
                    style={styles.icon}
                    source={require('../../assets/images/goal.jpg')}
                />
            )
        }},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = AppIcon.images.home;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Image
            style={{
              tintColor: focused ? MAIN_COLOR : AppStyles.color.grey
            }}
            source={iconName}
          />
        );
      }
    }),
    initialLayout: {
      height: 300
    },
    tabBarOptions: {
      activeTintColor: AppStyles.color.tint,
      inactiveTintColor: "gray",
      style: {
        height: Configuration.home.tab_bar_height
      }
    }
  }
);

// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    Tab: TabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tab",
    drawerWidth: 200,
    contentComponent: DrawerContainer
  }
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerStack }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "DrawerStack",
    transitionConfig: noTransitionConfig,
    navigationOptions: ({ navigation }) => ({
      color: "black"
    })
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
    fontFamily: AppStyles.fontName.main
  },
  icon: {
    resizeMode:'stretch',
    width:32,
    height:32
  }
});

export { RootNavigator, AppNavigator, middleware };
