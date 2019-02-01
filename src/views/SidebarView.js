import React from 'react';
import { Image, StyleSheet, Text, View, Button,TouchableHighlight} from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { onSignOut,  } from '../helpers/auth';

export default class SideBarView extends React.Component {

  navigateToScreen = (route) => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())} style={{ flex: 1, alignItems: 'center'}}>
              <Image
                style = {{ width: 38, height: 38 }} defaultSource={require('../assets/leftarrow.png')}
              />
            </TouchableHighlight>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.headerStyleText}> Menu </Text>
            </View>
            <View style={{ flex: 1}} />
          </View>
          <View style={styles.drawerItemsContainer}>
            <View style={[styles.items, styles.border]}>
              <Button
                color={'white'}
                title={"Home"}
                onPress={() =>
                  { this.props.navigation.navigate('Main');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());}}
              />
            </View>
            <View style={[styles.items, styles.border]}>
              <Button title={"Create Wallet"}
                color={'white'}
                onPress={() => this.props.navigation.navigate('Wallet')}
              />
            </View>
            <View style={[styles.items, styles.border]}>
              <Button title={"Generate Key"}
                color={'white'}
                onPress={() => this.props.navigation.navigate('Key')}
              />
            </View>
            <View style={styles.items}>
              <Button
                color={'white'}
                title={"Sign Out"}
                onPress={() =>
                   { onSignOut();
                  this.props.navigation.navigate("SignOut"); }}
               />
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 250,
    alignItems: 'center',
  },
  headerContainer: {
    flex: 0.2,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  headerStyleText: {
    fontSize: 18,
    color: 'white'
  },
  items: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: 200, 
  },
  border: {
    borderColor: 'white', 
    borderBottomWidth: 1 
  }
})
