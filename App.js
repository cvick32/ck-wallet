import React from 'react';

import { SignedIn, SignedOut } from './src/config/navigation';
import { isSignedIn } from "./src/helpers/authHelper";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    if (signedIn) {
      return <SignedIn />;
    } else {
      return <SignedOut />;
    }
  }

}
