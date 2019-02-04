import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar, FlatList, AsyncStorage, Text } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, RED_COLOR } from '../constants/styles';
import { DrawerActions } from 'react-navigation';
import ButtonComponent from '../components/ButtonComponent';
import HeaderComponent from '../components/HeaderComponent';

import WalletRestApi from '../api/WalletRestApi';



export default class WalletView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {token: "", user_id: "", label: "", keys: "", error: ""};

    AsyncStorage.getItem('token').then((token) => this.setState({ token: token }));
    AsyncStorage.getItem('user_id').then((value) => this.setState({ user_id: value }));
    AsyncStorage.getItem('labelAndKeys').then((keys) => this.setState({ keys: JSON.parse(keys)}));
  }

  refreshKeys() {
    const api = new WalletRestApi(this.state.token);
    api.getKeys(this.state.user_id)
    .then(response => {
      AsyncStorage.setItem("labelAndKeys", JSON.stringify(response.keys));
      var publickeys = [];
      const keys = response.keys;
      for (var counter=0; counter < keys.length; counter++) {
        publickeys[counter] = keys[counter].publicKey;
      }
      AsyncStorage.setItem("keys", JSON.stringify(publickeys));
    })
    .then(response => response)
    .catch(err => console.log(err));


    AsyncStorage.getItem('labelAndKeys').then((keys) => this.setState({ keys: JSON.parse(keys)}));
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
            <FlatList
                scrollEnabled={true}
                data={this.state.keys}
                renderItem={({item}) =>
                <View key={item._id}>
                    <Text style={styles.text}>ID: {item._id}</Text>
                    <Text style={styles.text}>Label: {item.label}</Text>
                    <Text style={styles.text}>Public Key: {item.publicKey}</Text>
                    <Text style={styles.text}>Cipher Text: {item.cipherText}</Text>
                    <Text style={styles.text}>IV: {item.iv}</Text>
                    <Text style={styles.text}>Salt: {item.salt}</Text>
                </View>}
                keyExtractor={(item, index) => index.toString()}
            />
             <ButtonComponent onPressHandler={() => { this.refreshKeys()}} text={"Refresh Keys"}/>
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
  },
  text: {
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
