import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar, FlatList, AsyncStorage, Text } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, RED_COLOR, BUTTON_BACKGROUND_COLOR } from '../constants/styles';
import { DrawerActions } from 'react-navigation';
import ButtonComponent from '../components/ButtonComponent';
import HeaderComponent from '../components/HeaderComponent';

import WalletRestApi from '../api/WalletRestApi';



export default class WalletView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {token: "", user_id: "", keys: ""};

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

  deleteKey

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
            <FlatList
                scrollEnabled={true}
                data={this.state.keys}
                renderItem={({item}) =>
                <View key={item._id}>
                    <Text style={styles.text}>
                    <Text style={styles.bold}>Label: </Text>{item.label}{"\n"}
                    <Text style={styles.bold}>Public Key: </Text> {item.publicKey}{"\n"}
                    <Text style={styles.bold}>Cipher Text: </Text> {item.cipherText}{"\n"}
                    <Text style={styles.bold}>IV: </Text> {item.iv}{"\n"}
                    <Text style={styles.bold}>Salt: </Text> {item.salt}</Text>
                    <View style={{ margin: 10 }}>
                        <ButtonComponent color={RED_COLOR} onPressHandler={() => { this.deleteKey(item._id)}} text={"Delete Key"}/>
                    </View>
                </View>}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ margin: 10}}>
             <ButtonComponent color={BUTTON_BACKGROUND_COLOR} onPressHandler={() => { this.refreshKeys()}} text={"Refresh Keys"}/>
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
  bold: {
      fontWeight: "bold"
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
    width: 275,
    backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
    borderRadius: 5,
    color: DETAIL_TEXT_COLOR
  }
})
