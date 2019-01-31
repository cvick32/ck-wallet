import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Dimensions } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles.js';
import WalletRestApi from '../api/WalletRestApi';

export default class BalanceHeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {keys: [], user_id: "", token: "", receivingAddress: '', coinAmount: '0.00', balance: 0};
    AsyncStorage.getItem('balance').then((value) => this.setState({balance: value}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', }}> {this.state.balance} </Text>
        <Text style={{color: 'white'}}> K320 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 0,
  },
});
