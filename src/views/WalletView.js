import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles';
import { DrawerActions } from 'react-navigation';
import ButtonComponent from '../components/ButtonComponent';
import HeaderComponent from '../components/HeaderComponent';
import WalletRestApi from '../api/WalletRestApi';


export default class WalletView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {walletName: "", assetName: ""};
  }

  createWallet() {
    const api = new WalletRestApi();
    
    /*
    api.login(this.state.w, this.state.passwordText)
    .then(response => {
      if(response.success) {
        AsyncStorage.setItem("token", response.token);
        AsyncStorage.setItem("user_id", response.user_id);
        this.retrieveKeys(response.user_id, response.token);
        onSignIn().then(() => this.props.navigation.navigate("Main"));
      }
    })
    .catch(err => console.log(err));
    */

    console.log(this.state.walletName);
    console.log(this.state.assetName);
    AsyncStorage.getItem("labelAndKeys")
      .then((value) => {
        console.log(value);
      }
    );
    

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
         <TextInput
              style={{padding: 10, marginTop: 15,
              marginBottom: 4, height: 40, width: 275,
              backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
              borderRadius: 5, color: DETAIL_TEXT_COLOR}}
              onChangeText={(walletName) => this.setState({walletName: walletName})}
              keyboardType="numbers-and-punctuation"
              placeholder="Wallet Name"
              placeholderTextColor={DETAIL_TEXT_COLOR}
            />
           <TextInput
              style={styles.inputs}
              onChangeText={(assetName) => this.setState({assetName: assetName})}
              keyboardType="numbers-and-punctuation"
              placeholder="Asset Name"
              placeholderTextColor={DETAIL_TEXT_COLOR}
            />
           <View style={{ margin: 10}}>
             <ButtonComponent onPressHandler={() => { this.createWallet()}} text={"Create New Wallet"}/>
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
