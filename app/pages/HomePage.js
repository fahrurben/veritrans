import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { styles } from '../Styles';

import {
  LOGOUT
} from '../Constants';

const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
  }
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.logoutClicked = this.logoutClicked.bind(this);
  }

  logoutClicked() {

    this.props.logout();
    this.props.navigation.navigate('Home');
  }

  render() {
    let isAuthenticated = this.props.isAuthenticated;

    return (
      <Layout style={styles.container}>
        {
          !isAuthenticated &&
          <Layout>
            <Button status="basic" onPress={() =>this.props.navigation.navigate('Register')}>
              Register
            </Button>
            <Button status="basic" onPress={() =>this.props.navigation.navigate('Login')}>
              Login
            </Button>
          </Layout>
        }

        {
          isAuthenticated &&
          <Layout>
            <Button onPress={() =>this.props.navigation.navigate('TransactionConfirmation')}>
              Konfirmasi Transfer
            </Button>
            <Button onPress={() =>this.props.navigation.navigate('TransactionList')}>
              Daftar Transaksi
            </Button>
            <Button status="basic" onPress={this.logoutClicked}>
              Logout
            </Button>
          </Layout>
        }
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.global.isAuthenticated,
})

export default connect(
  mapStateToProps,
  {
    logout: logout,
  }
)(HomePage);