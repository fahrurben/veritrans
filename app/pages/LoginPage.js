import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { styles } from '../Styles';
import { loginInitial, submit } from '../actions/LoginActions';
import {
  SUBMITTING,
  SUBMITTED,
  STATUS_SUCCESS,
  STATUS_ERROR
} from '../Constants';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hp: '',
      password: '',
      error: {
        hp: '',
        password: '',
      },
      formStatus: props.formStatus
    };

    this.submitClick = this.submitClick.bind(this);
    this.redirectClick = this.redirectClick.bind(this);
  }

  componentDidMount() {
    this.props.loginInitial();
  }

  static getDerivedStateFromProps(nextProps, state) {

    if (nextProps.formState == SUBMITTED && state.formState == SUBMITTING) {
      if (nextProps.status == STATUS_SUCCESS) {
        nextProps.navigation.navigate('Home');
      } else {

      }
    }

    return nextProps;
  }

  submitClick(e) {
    let error = {
      hp: '',
      password: '',
    };

    if (this.state.hp == '') {
      error.hp = 'No HP harus diisi';
    }

    if (this.state.password == '') {
      error.password = 'Password harus diisi';
    }

    this.setState({error: error});

    if (
      error.hp == '' &&
      error.password == ''
    ) {
      this.props.submit({
        hp: this.state.hp,
        password: this.state.password,
      });
    }
  }

  redirectClick(e) {
    this.props.navigation.navigate('Home');
  }

  render() {
    const PopoverContent = () => (
      <Layout style={styles.popoverContent}>
        <Spinner size='giant'/>
      </Layout>
    );

    let loading = this.props.loading;

    return (
      <Layout style={styles.container}>
        {
          this.state.status == STATUS_ERROR &&
            <Text style={{color:'red'}}>{this.state.message}</Text>
        }
        <Input 
          placeholder="Nomor HP"
          value={this.state.hp}
          onChangeText={
            text => this.setState({ 
              hp: text,
              error: { ...this.state.error, hp: '' }
            })
          }
          status={this.state.error.hp == '' ? '' : 'danger'}
          caption={this.state.error.hp}
        />
        <Input 
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={
            text => this.setState({ 
              password: text,
              error: { ...this.state.error, password: '' }
            })
          }
          status={this.state.error.password == '' ? '' : 'danger'}
          caption={this.state.error.password}
        />
        <Button onPress={this.submitClick} style={styles.submitButton}>
          Submit
        </Button>
        <Button status="basic" onPress={this.redirectClick}>
          Cancel
        </Button>
        <Popover
          backdropStyle={styles.backdrop}
          visible={loading}
          content={PopoverContent()}
        >
          <Text></Text>
        </Popover>
        <Modal visible={this.state.status == STATUS_SUCCESS} backdropStyle={styles.backdrop}>
          <Layout
            level='3'
            style={styles.modalContainer}>
            <Text>{this.state.message}</Text>
          </Layout>
        </Modal>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  formState: state.login.formState,
  status: state.login.status,
  message: state.login.message,
})

export default connect(
  mapStateToProps,
  { 
    loginInitial,
    submit
  }
)(LoginPage);