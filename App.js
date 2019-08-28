import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { f, auth, database } from './config/config';
import * as Facebook from 'expo-facebook';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,

    };
    //this.registerUser('testemailadress@gmail.com', 'password');
    var that = this;
    //this.logOut();
    auth.onAuthStateChanged(user => {
      if (user) {
        //Logged in
        that.setState({ loggedIn: true })
        console.log('Logged in', user);
      }
      else {
        //Logged out
        that.setState({ loggedIn: false })
        console.log('Logged out');
      }
    })
  }

  async loginWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '2374098736000464',
      { permissions: ['email', 'public_profile'] }
    );

    if (type === 'success') {
      const credentials = await f.auth.FacebookAuthProvider.credential(token);
      console.log(credentials);
      try {
        f.auth().signInWithCredential(credentials);
      }
      catch (e) {
        console.log("Error:", e);
      }


    }
  }

  async loginUser(email, password) {
    if (email != '' && password != '') {
      try {
        let user = await auth.signInWithEmailAndPassword(email, password);
        console.log(user);

      } catch (error) {
        console.log(erro);
      }

    } else {
      alert('Missing email or password');
    }
  }

  async registerUser(email, password) {

    console.log(email, password);
    try {
      const user = auth.createUserWithEmailAndPassword(email, password);
      console.log(email, password, user);
    } catch (error) {
      console.log("error logging in", error);
    }

  }

  async signUserOut() {
    try {
      auth.signOut();
      console.log("Logged out...");
    } catch (e) {
      console.log("Error>", e);
    }
  }

  render() {
    return (

      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>-----</Text>
        {this.state.loggedIn == true ? (
          <View>
            <TouchableHighlight
              onPress={() => this.signUserOut()}
              style={{ backgroundColor: 'red' }}>
              <Text>Log out</Text>
            </TouchableHighlight>
            <Text>Logged in...</Text>
          </View>
        ) : (
            <View>


              {this.state.emailLogInView == true ? (
                <View>
                  <Text>Email:</Text>
                  <TextInput
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />


                  <Text>Password:</Text>
                  <TextInput
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                  />
                  <TouchableHighlight
                    onPress={() => this.loginUser(this.state.email,this.state.password)}
                    style={{ backgroundColor: 'red' }}>
                    <Text>Login</Text>
                  </TouchableHighlight>
                </View>
              ) : (
                  <View></View>
                )}
                
              <TouchableHighlight
                onPress={() => this.setState({ emailLogInView: true })}
                style={{ backgroundColor: 'green' }}>
                <Text style={{ color: 'white' }}>Login with Email</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => this.loginWithFacebook()}
                style={{ backgroundColor: 'green' }}>
                <Text style={{ color: 'white' }}>Login with Facebook</Text>
              </TouchableHighlight>
            </View>
          )}

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
