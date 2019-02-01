import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, StatusBar } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles';
import { NavigationActions, DrawerActions } from 'react-navigation';
import TextInputWithLabelComponent from '../components/TextInputWithLabel';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent';
import HeaderComponent from '../components/HeaderComponent';


export default class WalletView extends React.Component {

  createWallet() {
    const api = new WalletRestApi();
    
    api.login(this.state.text, this.state.passwordText)
    .then(response => {
      if(response.success) {
        AsyncStorage.setItem("token", response.token);
        AsyncStorage.setItem("user_id", response.user_id);
        this.retrieveKeys(response.user_id, response.token);
        onSignIn().then(() => this.props.navigation.navigate("Main"));
      }
    })
    .catch(err => console.log(err));

  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <HeaderComponent
          title={"New Wallet"}
          onPressHandler={() => this.props.navigation.dispatch(DrawerActions.openDrawer()) }
          source={require('../assets/drawer_navigation.png')}
        />
         <View style={styles.walletContainer}>
           <View style={{ margin: 10}}>
             <TextInputWithLabelComponent placeholder={"Wallet Name"}/>
           </View>
           <View style={{ margin: 10}}>
             <TextInputWithLabelComponent placeholder={"Asset Name"}/>
           </View>
           <View style={{ margin: 10}}>
             <ButtonWithActionComponent onPressHandler={() => { this.createWallet()}} text={"Create New Wallet"}/>
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
})
