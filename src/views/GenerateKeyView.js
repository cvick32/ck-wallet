import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TextInput, AsyncStorage, Text } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, RED_COLOR } from '../constants/styles';
import { DrawerActions } from 'react-navigation';
import ButtonComponent from '../components/ButtonComponent';
import HeaderComponent from '../components/HeaderComponent';
import WalletRestApi from '../api/WalletRestApi';

import { genKey } from '../helpers/keyHelper';


export default class WalletView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {token: "", user_id: "", label: "", password: "", keyPair: false, error: ""};

    AsyncStorage.getItem('token').then((token) => this.setState({ token: token }));
    AsyncStorage.getItem('user_id').then((value) => this.setState({ user_id: value }));
  }

  submitKey() {
    const api = new WalletRestApi(this.state.token);
    if (!this.state.keyPair) {
      this.setState({error: "Empty keypair"});
    } else {
      console.log(keyPair);
        api.generateKey(this.state.user_id).then((keysObject) => {
        console.log(keysObject);
        });
      }
  }

  createKey() {
    if (this.state.label === "" || this.state.password === "") {
      this.setState(({error: "Label and Password fields are required"}));
    } else {
      
      genKey(this.state.label, this.state.password).then((newKey) => {
          this.state.keyPair = newKey;
        }
      );
    }
  }

  handleText(event) {
    const {name, type, value} = event.nativeEvent;
    console.log(name);
    console.log(type);
    console.log(value);
    if (name === "label") {
      this.setState({label: value});
      this.setState({error: ""});
    } else {
      this.setState({password: value});
      this.setState({error: ""});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <HeaderComponent
          title={"Keys"}
          onPressHandler={() => this.props.navigation.dispatch(DrawerActions.openDrawer()) }
          source={require('../assets/drawer_navigation.png')}
        />
         <View style={styles.walletContainer}>
           <View style={{ margin: 10}}>
            <TextInput
              name="label"
              style={{padding: 10, marginTop: 15,
              marginBottom: 4, height: 40, width: 275,
              backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
              borderRadius: 5, color: DETAIL_TEXT_COLOR}}
              onChangeText={(label) => this.setState({label: label, error: ""})}
              keyboardType="numbers-and-punctuation"
              placeholder="Label for Key Pair"
              placeholderTextColor={DETAIL_TEXT_COLOR}
              value={this.state.label}
            />
            <TextInput
              name="password"
              style={{padding: 10, marginTop: 15,
              marginBottom: 4, height: 40, width: 275,
              backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
              borderRadius: 5, color: DETAIL_TEXT_COLOR}}
              onChangeText={(password) => this.setState({password: password, error: ""})}
              keyboardType="numbers-and-punctuation"
              secureTextEntry
              placeholder="Your Password"
              placeholderTextColor={DETAIL_TEXT_COLOR}
              value={this.state.password}
            />
             <ButtonComponent onPressHandler={() => { this.createKey()}} text={"Generate Key Pair"}/>
             <ButtonComponent onPressHandler={() => { this.submitKey()}} text={"Submit"}/>
             <Text style={{color: RED_COLOR}}>{this.state.error}</Text>
           </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  HeaderComponent: {
    marginTop: 50
  },
  walletContainer: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputs: {
    padding: 10, 
    marginTop: 15,   
    marginBottom: 4, 
    height: 40, 
    width: 275,   
    backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
    borderRadius: 5, 
    color: DETAIL_TEXT_COLOR
  }
})
