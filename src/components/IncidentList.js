import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, ActivityIndicator } from "react-native";
import { List, ListItem } from 'react-native-elements';
class IncidentList extends Component {
    constructor(props) {
        super(props);
        this.renderSeparator = () => {
            return (<View style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%"
            }}/>);
        };
        this.renderFooter = () => {
            if (!this.state.loading)
                return null;
            return (<View style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}>
          <ActivityIndicator animating size="large"/>
        </View>);
        };
        this.state = { data: []
        };
    }
    componentDidMount() {
        //this.setState({data: "[{\"name\":\"saket\",\"age\":25}]"});
        AsyncStorage.getItem('form_Data').then((value) => {
            let stored_data = JSON.parse(value);
            this.setState({ data: stored_data.form_d
            });
            console.log(this.state.data);
        });
    }
    render() {
        return (<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList data={this.state.data} extraData={this.state} renderItem={({ item }) => (<ListItem title={item.l_event_title} subtitle={item.l_event_details} hideChevron/>)} keyExtractor={item => item.l_event_details} ItemSeparatorComponent={this.renderSeparator} ListFooterComponent={this.renderFooter}/>
      </List>);
    }
}
export default IncidentList;
