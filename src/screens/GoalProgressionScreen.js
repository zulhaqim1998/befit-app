import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import LineChart from 'react-native-responsive-linechart';
import moment from 'moment';
import {AppStyles} from '../AppStyles';

class GoalProgressionScreen extends React.Component {


    renderChart = () => {

        const today = moment();

        const data = [1574, 1600, 1665, 1585, 1695];
        const labels = [null, 'Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const config = {
            line: {
                strokeWidth: 1,
                strokeColor: '#216D99',
            },
            xAxis: {
                labelColor: '#c8d6e5',
                visible: true,
            },
            area: {
                gradientFrom: '#2e86de',
                gradientFromOpacity: 1,
                gradientTo: '#87D3FF',
                gradientToOpacity: 1,
            },
            yAxis: {
                labelColor: '#c8d6e5',
            },
            grid: {
                strokeColor: '#c8d6e5',
                stepSize: 30,
            },
            insetY: 10,
            insetX: 10,
            interpolation: 'spline',
            backgroundColor: '#fff',
        };


        return <LineChart xLabels={labels} style={{flex: 1}} config={config} data={data}/>;
    };

    render() {
        return (
            <ImageBackground
                style={styles.backgroundContainer}
                source={require('../../assets/images/bg3.jpg')}>
                <View style={{flex: 1}}>

                    <Text style={styles.text}>Your Calories Intake Diagram</Text>
                    <View style={{flex: 1}}>
                        {this.renderChart()}
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

const styles = StyleSheet.create({
    backgroundContainer:{
        flex:1,
        width: null,
        alignItems:'center',
    },
    text: {
        marginTop: 110,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        marginBottom: 35,
        fontSize: 25,
        color: 'rgb(0,0,0)',
        fontFamily: 'sans-serif-condensed',
    },
});

export default connect(mapStateToProps)(GoalProgressionScreen);
