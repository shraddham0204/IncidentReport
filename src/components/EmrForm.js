import React, { Component } from 'react';
import { ScrollView, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { verticalScale } from './view/scaling';
import RadioButton from './view/RadioButton';
import DateCustom from './view/DateCustom';
class EmiratesForm extends Component {
    constructor(props) {
        super(props);
        this.handleReportChange = (report_type_val) => {
            console.log(report_type_val);
            this.setState({ report_type: report_type_val });
            if (report_type_val == 1) {
                if (this.state.event == 2) {
                    this.setState({ event: 1 });
                }
                else if (this.state.event == 6) {
                    this.setState({ event: 3 });
                }
            }
            else if (report_type_val == 2) {
                if (this.state.event == 1) {
                    this.setState({ event: 2 });
                }
                else if (this.state.event == 3) {
                    this.setState({ event: 6 });
                }
            }
        };
        this._changeDate = (value) => {
            this.setState({ select_date: value });
        };
        this._selectedTime = (value) => {
            console.log(value);
            this.setState({ select_time: value });
        };
        this.handleEventChange = (value) => {
            this.setState({ event: value });
        };
        this.state = {
            report_type: 1,
            select_date: "",
            select_time: "",
            maxdate1: "",
            event: 1,
            eventTitle: "",
            eventDetails: "",
            latitude: "",
            longitude: "",
            language: "",
            flight_num: "EK-055",
            injured: 1,
            ImageSource: null,
            name: ""
        };
    }
    componentWillMount() {
        console.log("ihjj");
        //get the current and time
        let date1 = new Date();
        let dd = date1.getDate();
        let mm = date1.getMonth() + 1; //January is 0!
        let yyyy = date1.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let today = mm + '/' + dd + '/' + yyyy;
        console.log(today);
        let time1 = date1.getHours() + ":" + date1.getMinutes();
        this.setState({ maxdate1: today });
    }
    componentDidMount() {
        //this.setState({select_time:time1});
        console.log(this.state.maxdate1);
        //Geolocation Fed Latitude and Longitude
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }
    render() {
        const event_types = [
            { label: 'Air Safety   ', value: 1 },
            { label: 'Ground Safety', value: 2 }
        ];
        const event_air_safety = [
            { label: 'Wake Turbulence   ', value: 1 },
            { label: 'Loss of Communication', value: 3 }
        ];
        const event_ground_Safety = [
            { label: 'GSE Accident   ', value: 2 },
            { label: 'GSE Malfunction', value: 6 }
        ];
        return (<ScrollView style={{ backgroundColor: 'white' }}>
                <RadioButton title="Report Event" event_types={event_types} onRadioChange={this.handleReportChange}/>
                <DateCustom selected_date={this.state.select_date} selected_time={this.state.select_time} title="Date of Occurrence" max_date={this.state.maxdate1} onDateChangee={this._changeDate} onSelectTime={this._selectedTime}/>
                <RadioButton title="Event" event_types={(this.state.report_type == 1) ? event_air_safety : event_ground_Safety} onRadioChange={this.handleEventChange}/>
        </ScrollView>);
    }
}
const styles = {
    labelStyle: {
        fontSize: verticalScale(18),
        paddingLeft: verticalScale(20),
        color: '#006DB7',
        fontWeight: 'bold',
        marginTop: verticalScale(35),
        marginBottom: verticalScale(10)
    },
    TextStyle: {
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(10),
        paddingLeft: verticalScale(20),
        color: 'black',
        fontWeight: 'bold',
    },
    ImageContainer: {
        borderRadius: 10,
        width: verticalScale(100),
        height: verticalScale(100),
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        margin: verticalScale(25)
    },
    textOnImage: {
        paddingLeft: verticalScale(10),
        paddingRight: verticalScale(10)
    }
};
export default connect(null, null)(EmiratesForm);
