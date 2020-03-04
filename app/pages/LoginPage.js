import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { styles } from '../Styles';
import { loginInitial, getAllDayah, submit } from '../actions/LoginActions';
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
      dayahSelected: '0',
      nik: '',
      password: '',
      error: {
        dayah: '',
        nik: '',
        password: '',
      },
      formStatus: props.formStatus
    };

    this.submitClick = this.submitClick.bind(this);
  }

  componentDidMount() {
    this.props.loginInitial();
    this.props.getAllDayah();
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
      dayah: '',
      nik: '',
      password: '',
      passwordKonfirmasi: ''
    };

    if (this.state.dayahSelected.value == '0') {
      error.dayah = 'Institusi harus dipilih';
    }

    if (this.state.nik == '') {
      error.nik = 'Nik harus diisi';
    }

    if (this.state.password == '') {
      error.password = 'Password harus diisi';
    }

    this.setState({error: error});

    if (
      error.dayah == '' &&
      error.nik == '' &&
      error.password == '' &&
      error.passwordKonfirmasi == ''
    ) {
      this.props.submit({
        dayah: this.state.dayahSelected.value,
        nik: this.state.nik,
        password: this.state.password,
      });
    }
  }

  render() {
    const PopoverContent = () => (
      <Layout style={styles.popoverContent}>
        <Spinner size='giant'/>
      </Layout>
    );

    let arrDayah = this.props.arrDayah && 
                    this.props.arrDayah.map( dayah => { return { value: dayah.id, text: dayah.name } });
    
    let loading = this.props.loading;

    return (
      <Layout style={styles.container}>
        {
          this.state.status == STATUS_ERROR &&
            <Text style={{color:'red'}}>{this.state.message}</Text>
        }
        <Select 
          placeholder="Pilih Institusi"
          data={arrDayah}
          selectedOption={this.state.dayahSelected}
          onSelect={
            (data) => {
              let index = _.findIndex(arrDayah, (obj) => { return obj.id == data.id });
              this.setState({
                dayahSelected: arrDayah[index],
                error: { ...this.state.error, dayah: '' }
              });
            }
          }
          status={this.state.error.dayah == '' ? '' : 'danger'}
          caption={this.state.error.dayah}
          style={styles.select}
        />
        <Input 
          placeholder="NIK Siswa"
          value={this.state.nik}
          onChangeText={
            text => this.setState({ 
              nik: text,
              error: { ...this.state.error, nik: '' }
            })
          }
          status={this.state.error.nik == '' ? '' : 'danger'}
          caption={this.state.error.nik}
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
  arrDayah: state.login.arrDayah,
  loading: state.login.loading,
  formState: state.login.formState,
  status: state.login.status,
  message: state.login.message,
})

export default connect(
  mapStateToProps,
  { 
    loginInitial,
    getAllDayah,
    submit
  }
)(LoginPage);