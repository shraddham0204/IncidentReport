import React,{Component} from 'react';
import {View,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

 class splashScreen extends Component {
   componentDidMount(){
    setTimeout(function() { Actions.webView(); }.bind(this), 5000);
   }
    render() {
      return (
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems: 'center'   }}>
          {/*<Image style={{ width: 150, height:150 }} source={{ uri: 'http://vmicsigehsap.metricstream.com:8055/images/logo-loader.gif' }}/>*/}
          <Image source={require('../logo-loader.gif')} />
        </View>);
    }
  }

  export default splashScreen;