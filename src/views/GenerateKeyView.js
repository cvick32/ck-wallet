import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles';
import { DrawerActions } from 'react-navigation';
import ButtonComponent from '../components/ButtonComponent';
import HeaderComponent from '../components/HeaderComponent';
import WalletRestApi from '../api/WalletRestApi';

import BlockHelper from '../helpers/keyHelper';


export default class WalletView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {token: "", user_id: "", label: ""};

    AsyncStorage.getItem('token').then((token) => { this.setState({ token: token }) } );
    AsyncStorage.getItem('user_id').then((value) => this.setState({ user_id: value }));

  }

  submitKey() {
      console.log(this.state.token);
    const api = new WalletRestApi(this.state.token);
    
    api.generateKey(this.state.user_id).then((keysObject) => {
        console.log(keysObject);
        
        });
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
              style={{padding: 10, marginTop: 15,
              marginBottom: 4, height: 40, width: 275,
              backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
              borderRadius: 5, color: DETAIL_TEXT_COLOR}}
              onChangeText={(label) => this.setState({label: label})}
              keyboardType="numbers-and-punctuation"
              placeholder="Label for Key Pair"
              placeholderTextColor={DETAIL_TEXT_COLOR}
            />
             <ButtonComponent onPressHandler={() => { this.createKey()}} text={"Generate Key Pair"}/>
             <ButtonComponent onPressHandler={() => { this.submitKey()}} text={"Submit"}/>
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
