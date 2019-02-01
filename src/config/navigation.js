import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

import SignInView from '../views/SignInView';
import MainView from '../views/MainView';
import RegisterView from '../views/RegisterAccountView';
import SidebarView from '../views/SidebarView';
import WalletView from '../views/WalletView';
import GenerateKeyView from '../views/GenerateKeyView';
import BarCodeScannerComponent from '../components/BarCodeScannerComponent';

export const Drawer = createDrawerNavigator({
   Main: {
     screen: MainView,
   },
   Wallet: {
     screen: WalletView,
     navigationOptions: {
       header: null
     }
   },
   Key: {
     screen: GenerateKeyView,
     navigationOptions: {
       header: null
     }
   },
   SignOut: {
     screen: SignInView,
   }
}, {
  contentComponent: SidebarView,
  drawerWidth: 250,
  drawerPosition: 'left',
  drawerBackgroundColor: 'black',
});

const SignedInNav = createStackNavigator({
  Main: {
    screen: Drawer,
    navigationOptions: {
      header: null,
    }
  },
  Camera: {
    screen: BarCodeScannerComponent,
    navigationOptions: {
      header: null,
    }
  },
  initialRouteName: 'Main',
});

export const SignedIn = createAppContainer(SignedInNav);

const SignedOutNav = createStackNavigator({
  Profile: {
    screen: SignInView,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: SignedIn,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterView,
    navigationOptions: {
      header: null,
    },
  },
  initialRouteName: 'Profile',
});

export const SignedOut = createAppContainer(SignedOutNav);
