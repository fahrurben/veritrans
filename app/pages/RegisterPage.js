import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { registerInitial, getAllInstitusi, submit } from '../actions/RegisterActions';
import {
  SUBMITTING,
  SUBMITTED,
  STATUS_SUCCESS,
  STATUS_ERROR
} from '../Constants';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      institusiSelected: '0',
      nik: '',
      hp: '',
      password: '',
      passwordKonfirmasi: '',
      error: {
        institusi: '',
        nik: '',
        hp: '',
        password: '',
        passwordKonfirmasi: ''
      },
      formStatus: props.formStatus
    };

    this.submitClick = this.submitClick.bind(this);
    this.redirectClick = this.redirectClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, state) {

    if (nextProps.formState == SUBMITTED && state.formState == SUBMITTING) {
      if (nextProps.status == STATUS_SUCCESS) {
        console.log('Success');
      } else {

      }
    }

    return nextProps;
  }

  componentDidMount() {
    this.props.registerInitial();
    this.props.getAllInstitusi();
  }

  submitClick(e) {
    let error = {
      institusi: '',
      nik: '',
      hp: '',
      password: '',
      passwordKonfirmasi: ''
    };

    if (this.state.institusiSelected.value == '0') {
      error.institusi = 'Institusi harus dipilih';
    }

    if (this.state.nik == '') {
      error.nik = 'Nik harus diisi';
    }

    if (this.state.hp == '') {
      error.hp = 'HP harus diisi';
    }

    if (this.state.password == '') {
      error.password = 'Password harus diisi';
    }

    if (this.state.passwordKonfirmasi != this.state.password) {
      error.passwordKonfirmasi = 'Password konfirmasi dan Password tidak sama';
    }

    this.setState({error: error});

    if (
      error.institusi == '' &&
      error.nik == '' &&
      error.hp == '' &&
      error.password == '' &&
      error.passwordKonfirmasi == ''
    ) {
      this.props.submit({
        institusi_id: this.state.institusiSelected.value,
        nik: this.state.nik,
        hp: this.state.hp,
        password: this.state.password,
        passwordKonfirmasi: this.state.passwordKonfirmasi,
      });
    }
  }

  redirectClick(e) {
    this.props.registerInitial();
    this.props.navigation.navigate('Home');
  }

  render() {
    const PopoverContent = () => (
      <Layout style={styles.popoverContent}>
        <Spinner size='giant'/>
      </Layout>
    );

    let arrInstitusi = this.props.arrInstitusi &&
                    this.props.arrInstitusi.length > 0 &&
                    this.props.arrInstitusi.map( institusi => { return { value: institusi.id, text: institusi.name } });
    
    let loading = this.props.loading;

    return (
      <Layout style={styles.container}>
        {
          this.state.status == STATUS_ERROR &&
            <Text style={{color:'red'}}>{this.state.message}</Text>
        }
        <Select 
          placeholder="Pilih Institusi"
          data={arrInstitusi}
          selectedOption={this.state.institusiSelected}
          onSelect={
            (data) => {
              let index = _.findIndex(arrInstitusi, (obj) => { return obj.id == data.id });
              this.setState({
                institusiSelected: arrInstitusi[index],
                error: { ...this.state.error, institusi: '' }
              });
            }
          }
          status={this.state.error.institusi == '' ? '' : 'danger'}
          caption={this.state.error.institusi}
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
        <Input 
          placeholder="Password Konfirmasi"
          secureTextEntry={true}
          value={this.state.passwordKonfirmasi}
          onChangeText={
            text => this.setState({ 
              passwordKonfirmasi: text,
              error: { ...this.state.error, passwordKonfirmasi:'' }
            })
          }
          status={this.state.error.passwordKonfirmasi == '' ? '' : 'danger'}
          caption={this.state.error.passwordKonfirmasi}
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
            <Button onPress={this.redirectClick}>
              OK
            </Button>
          </Layout>
        </Modal>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  select: {
    marginBottom: 5,
  },
  submitButton: {
    marginBottom: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
});

const mapStateToProps = state => ({
  arrInstitusi: state.register.arrInstitusi,
  loading: state.register.loading,
  formState: state.register.formState,
  status: state.register.status,
  message: state.register.message,
})

export default connect(
  mapStateToProps,
  { 
    registerInitial,
    getAllInstitusi,
    submit
  }
)(RegisterPage);