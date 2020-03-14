import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal, Datepicker } from '@ui-kitten/components';
import { styles } from '../Styles';
import { transConfirmInitial, getAllBankByInstitution, submit } from '../actions/TransactionConfirmationActions';

import {
  SUBMITTING,
  SUBMITTED,
  STATUS_SUCCESS,
  STATUS_ERROR
} from '../Constants';

class TransactionConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankSelected: '0',
      nominal: 0,
      tanggal: new Date(),
      error: {
        bank: '',
        nominal: '',
        tanggal: ''
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
    this.props.getAllBankByInstitution(1);
  }

  submitClick(e) {
    let error = {
      bank: '',
      nominal: '',
      tanggal: ''
    };

    if (this.state.bankSelected.value == '0') {
      error.dayah = 'Bank harus dipilih';
    }

    if (this.state.nominal == '') {
      error.nominal = 'Nominal harus diisi';
    }

    if (isNaN(this.state.nominal) == true) {
      error.nominal = 'Nominal harus angka';
    }

    if (this.state.tanggal == '') {
      error.tanggal = 'Tanggal harus diisi';
    }

    this.setState({error: error});

    if (
      error.bank == '' &&
      error.nominal == '' &&
      error.tanggal == ''
    ) {
      this.props.submit({
        bank: this.state.bankSelected.value,
        nominal: this.state.nominal,
        tanggal: this.state.tanggal,
      });
    }
  }

  redirectClick(e) {
    this.props.transConfirmInitial();
    this.props.navigation.navigate('Home');
  }

  render() {

    const PopoverContent = () => (
      <Layout style={styles.popoverContent}>
        <Spinner size='giant'/>
      </Layout>
    );

    let arrBank = this.props.arrBank && 
                    this.props.arrBank.length > 0 &&
                    this.props.arrBank.map( bank => { return { value: bank.code, text: bank.name } });
    
    let loading = this.props.loading;

    return (
      <Layout style={styles.container}>
        <Select 
          placeholder="Pilih Bank"
          data={arrBank}
          selectedOption={this.state.bankSelected}
          onSelect={
            (data) => {
              let index = _.findIndex(arrBank, (obj) => { return obj.id == data.id });
              this.setState({
                bankSelected: arrBank[index],
                error: { ...this.state.error, bank: '' }
              });
            }
          }
          status={this.state.error.bank == '' ? '' : 'danger'}
          caption={this.state.error.bank}
          style={styles.select}
        />
        <Input 
          placeholder="Jumlah Nominal Transfer (Rp)"
          value={this.state.nominal}
          onChangeText={
            text => this.setState({ 
              nominal: text,
              error: { ...this.state.error, nominal: '' }
            })
          }
          status={this.state.error.nominal == '' ? '' : 'danger'}
          caption={this.state.error.nominal}
        />
        <Datepicker
          date={this.state.tanggal}
          onSelect={
            (data) => {
              console.log(data);
              this.setState({
                tanggal: data,
                error: { ...this.state.error, tanggal: '' }
              });
            }
          }
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

const mapStateToProps = state => ({
  arrBank: state.transConfirm.arrBank,
  loading: state.transConfirm.loading,
  formState: state.transConfirm.formState,
  status: state.transConfirm.status,
  message: state.transConfirm.message,
})

export default connect(
  mapStateToProps,
  { 
    transConfirmInitial, getAllBankByInstitution, submit
  }
)(TransactionConfirmationPage);