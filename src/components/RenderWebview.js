import React, { Component } from 'react';
import { WebView } from 'react-native';
import { AuthActions } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { URL, CLIENT_ID, CLIENT_SECRET } from '../constants/serverDetails';
class RenderWebView extends Component {
    constructor(props) {
        super(props);
        let token1 = '';
    }
    componentWillMount() {
        fetch(`${URL}/metricstream/auth/logout`, {
            method: 'GET',
            "headers": {
                "authorization": this.props.auth,
                "cache-control": "no-cache",
                "content-type": "application/json"
            }
        }).then((response) => {
            console.log(response);
            response.json();
        })
            .then((responseJson) => {
            console.log(responseJson);
        })
            .catch((error) => {
            console.error(error);
        });
        this.props.AuthActions('');
    }
    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    getAccessToken(code1) {
        console.log("inside getaccessToken " + code1);
        fetch(`${URL}/metricstream/oauth2/token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=${code1}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        }).then((response) => response.json())
            .then((responseJson) => {
            if (this.props.token == '') {
                console.log(responseJson);
                const tokenJoin = responseJson.token_type + " " + responseJson.access_token;
                const userName = responseJson.user_name;
                console.log(tokenJoin);
                console.log(userName);
                this.props.AuthActions(tokenJoin);
                console.log(this.props.token);
                Actions.SelectIncident();
            }
        })
            .catch((error) => {
            console.error(error);
        });
    }
    render() {
        return (<WebView source={{ uri: `${URL}metricstream/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&state=2424` }} style={{ flex: 1 }} onNavigationStateChange={x => {
            console.log("onNavigationStateChange " + x.url);
            let code1 = null;
            code1 = this.getParameterByName('code', x.url);
            if (code1 != null) {
                console.log("code1 " + code1);
                this.getAccessToken(code1);
            }
        }}/>);
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};
export default connect(mapStateToProps, { AuthActions })(RenderWebView);
