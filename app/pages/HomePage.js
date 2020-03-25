import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
moment.locale('id');
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal, ListItem } from '@ui-kitten/components';
import { styles } from '../Styles';
import { getAllData } from '../actions/HomeActions';

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
    let arrTransaction = this.props.arrTransaction;

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
              Status Transfer
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
  arrTransaction: state.home.arrTransaction,
  loading: state.home.loading,
})

export default connect(
  mapStateToProps,
  {
    logout: logout,
    getAllData: getAllData,
  }
)(HomePage);