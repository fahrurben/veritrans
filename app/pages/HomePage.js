import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { styles } from '../Styles';
import { checkAuthenticated } from '../services/Auth';
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
  }

  async componentDidMount() {
    let isAuthenticated = false;
    try {
      isAuthenticated = await checkAuthenticated();
      this.setState({isAuthenticated: isAuthenticated});
    } catch (e) { }
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
            <Button status="basic" onPress={() =>this.props.navigation.navigate('Register')}>
              Logout
            </Button>
          </Layout>
        }
      </Layout>
    );
  }
}

export default HomePage;