import  React, { Component }  from 'react';
import {AsyncStorage,View, WebView,Text} from 'react-native';
import {AuthActions} from '../actions'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { URL,CLIENT_ID,CLIENT_SECRET} from '../constants/serverDetails';


class Login extends Component{

    constructor(props){
        super(props);
        let token1 ='';
        var code_y=true;
    }

     receiveLoginDetails = (value) => {
        this.props.AuthActions(value);
        if(value!= null)
        {
            Actions.SelectIncident({image_path:require('./Images/logout.png')});
        }
    }
    componentWillMount(){
       AsyncStorage.getItem("token").then(this.receiveLoginDetails);
    }
    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    getAccessToken(code1){
        fetch(`${URL}/metricstream/oauth2/token`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
                },
            body: `grant_type=authorization_code&code=${code1}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}).then((response) => response.json())
.then((responseJson) => {
    if(this.props.token1==null || this.props.token1==''){
        const tokenJoin = responseJson.token_type+" "+responseJson.access_token;
        console.log(responseJson.token_type);
        console.log(tokenJoin);
        console.log(responseJson.user_name);
        if(tokenJoin && responseJson.user_name){
            AsyncStorage.multiSet([
                ['token',tokenJoin],
                ['userId',responseJson.user_name]
            ]);
            AsyncStorage.getItem('userId').then(function(){
            });
        } 
  const userName =responseJson.user_name;
  console.log(tokenJoin);
  this.props.AuthActions(tokenJoin);
  console.log(this.props.token1);
  if(this.props.token1){
  Actions.SelectIncident({image_path:require('./Images/logout.png')});
  }
    }
})
.catch((error) => {
  console.error(error);
});
}

render(){
return (
    <WebView
    source={{uri: `${URL}metricstream/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&state=2424`}}
    style={{ flex:1}} 
    onNavigationStateChange={x => {
        console.log("onNavigationStateChange "+x.url);
        let code1 = null;
         code1=this.getParameterByName('code',x.url);
         fetch(`${URL}/metricstream/auth/logout`, {
            method: 'GET',
            "headers": {
              "authorization": this.props.token1,
              "cache-control": "no-cache",
              "content-type": "application/json"
            }
        }).then((response) => {
        console.log(response);
        })
        .catch((error) => {
        console.error(error);
        });
        if(code1 != null && (this.props.token1==null||this.props.token1=='' )){
            console.log("code1 "+code1);
            this.getAccessToken(code1);
        }
    }
    }
  />
); 
    }
}


const mapStateToProps = state => {
    console.log(state.auth.token);
    return {
            token1:state.auth.token
    };
};

export default connect(mapStateToProps,{ AuthActions })(Login);