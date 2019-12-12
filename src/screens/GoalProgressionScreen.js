import React from "react";
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import LineChart from 'react-native-responsive-linechart';
import moment from 'moment';

class GoalProgressionScreen extends React.Component {





    renderChart = () => {

        const today = moment();

        const data = [0, -10, -15, 40, 19, ];
        const labels = [null, 'Week 1', 'Week 2', 'Week 3', 'Week 4',];
        const config = {
            line: {
                strokeWidth: 1,
                strokeColor: "#216D99"
            },
            xAxis: {
                labelColor: "#c8d6e5",
                visible: true
            },
            area: {
                gradientFrom: "#2e86de",
                gradientFromOpacity: 1,
                gradientTo: "#87D3FF",
                gradientToOpacity: 1
            },
            yAxis: {
                labelColor: "#c8d6e5"
            },
            grid: {
                strokeColor: "#c8d6e5",
                stepSize: 30
            },
            insetY: 10,
            insetX: 10,
            interpolation: "spline",
            backgroundColor: "#fff"
        };


        return <LineChart xLabels={labels} style={{ flex: 1 }} config={config} data={data} />;
    };

    render() {
        return <View style={{flex: 1}}>


            <View style={{flex: 1}}>
                {this.renderChart()}
            </View>
            <View style={{flex: 1}}></View>
        </View>
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(GoalProgressionScreen);
