import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { registerInitial, getAllDayah, submit } from '../actions/RegisterActions';
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
      dayahSelected: '0',
      nik: '',
      password: '',
      passwordKonfirmasi: '',
      error: {
        dayah: '',
        nik: '',
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
    this.props.getAllDayah();
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

    if (this.state.passwordKonfirmasi != this.state.password) {
      error.passwordKonfirmasi = 'Password konfirmasi dan Password tidak sama';
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
        <Input 
          placeholder="Password Konfirmasi"
          secureTextEntry={true}
          value={this.state.passwordKonfirmasi}
          onChangeText={
            text => this.setState({ 
              password: passwordKonfirmasi,
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
  arrDayah: state.register.arrDayah,
  loading: state.register.loading,
  formState: state.register.formState,
  status: state.register.status,
  message: state.register.message,
})

export default connect(
  mapStateToProps,
  { 
    registerInitial,
    getAllDayah,
    submit
  }
)(RegisterPage);