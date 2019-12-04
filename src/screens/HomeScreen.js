import React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    TouchableOpacity, View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {Surface, Text, Divider, Caption, Provider, Portal, FAB} from 'react-native-paper';

import {
    AppIcon,
    AppStyles,
} from '../AppStyles';

const textStyle = {
    fontSize: 20,
    textAlign: 'center',
};


class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Home',
        headerLeft: () => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    {navigation.state.params && navigation.state.params.menuIcon ? (
                        <FastImage
                            style={styles.userPhoto}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{uri: navigation.state.params.menuIcon}}
                        />
                    ) : (
                        <FastImage
                            style={styles.userPhoto}
                            resizeMode={FastImage.resizeMode.cover}
                            source={AppIcon.images.defaultUser}
                        />
                    )}
                </TouchableOpacity>
            );
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            open: false,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            menuIcon: this.props.user.profileURL,
        });
    }

    renderFAB() {
        return (
            <Provider>
                <Portal>
                    <FAB.Group
                        open={this.state.open}
                        icon={this.state.open ? 'close' : 'plus'}
                        actions={[
                            // {icon: 'plus', onPress: () => console.log('Pressed add')},
                            {icon: 'star', label: 'Breakfast', onPress: () => this.props.navigation.navigate('InputMeal')},
                            {icon: 'email', label: 'Lunch', onPress: () => this.props.navigation.navigate('InputMeal')},
                            {icon: 'bell', label: 'Dinner', onPress: () => this.props.navigation.navigate('InputMeal')}
                        ]}
                        onStateChange={({open}) => this.setState({open})}
                        onPress={() => {
                            if (this.state.open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </Provider>
        );
    }

    render() {
        console.log("Home!!");
        return (
            <View style={styles.container}>
                {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/}
                <Surface style={styles.surface}>
                    <View style={{flexDirection: 'row', marginBottom: 20, marginTop: 20}}>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>1995</Text>
                            <Caption style={styles.caption}>Goal</Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>-</Text>
                            <Caption></Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>1001</Text>
                            <Caption style={styles.caption}>Food</Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>+</Text>
                            <Caption></Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>400</Text>
                            <Caption style={styles.caption}>Exercise</Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>=</Text>
                            <Caption></Caption>
                        </View>
                        <View style={styles.formulaTextContainer}>
                            <Text style={textStyle}>1998</Text>
                            <Caption style={styles.caption}>Remaining</Caption>
                        </View>
                    </View>
                    <Divider/>
                </Surface>
                {/*<FAB*/}
                {/*    style={styles.fab}*/}
                {/*    small*/}
                {/*    icon="plus"*/}
                {/*    onPress={() => console.log('Pressed')}*/}
                {/*/>*/}
                {this.renderFAB()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        // padding: Configuration.home.listing_item.offset,

    },
    title: {
        fontFamily: AppStyles.fontName.bold,
        fontWeight: 'bold',
        color: AppStyles.color.title,
        fontSize: 25,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    surface: {
        marginTop: 10,
        minHeight: 200,
        marginLeft: 6,
        marginRight: 6,
        // elevation: 4,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 5,
        // paddingTop: 15,
    },
    formulaContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    formulaContent: {
        borderColor: 'red',
        width: 30,
        height: 30,
        borderWidth: 2,
        margin: 3,
    },
    formulaTextContainer: {
        flex: 1,
        width: 'auto',
        height: 'auto',
        fontSize: 18,
        justifyContent: 'center',
    },
    caption: {
        textAlign: 'center',
        fontSize: 9,
    },
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);
