import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { styles } from '../Styles';
import { checkAuthenticated, logout } from '../services/Auth';
import {
  SUBMITTING,
  SUBMITTED,
  STATUS_SUCCESS,
  STATUS_ERROR
} from '../Constants';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };

    this.logoutClicked = this.logoutClicked.bind(this);
  }

  async componentDidMount() {
    let isAuthenticated = false;
    try {
      isAuthenticated = await checkAuthenticated();
      this.setState({isAuthenticated: isAuthenticated});
    } catch (e) { }
  }

  async logoutClicked() {
    await logout();
    
    this.setState({isAuthenticated: false});
  }

  render() {
    let isAuthenticated = this.state.isAuthenticated;

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

export default HomePage;