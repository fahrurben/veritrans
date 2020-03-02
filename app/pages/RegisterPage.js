import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button } from '@ui-kitten/components';
import { getAllDayah } from '../actions/RegisterActions';

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
      }
    };

    this.submitClick = this.submitClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllDayah();
  }

  submitClick(e) {
    let error = {
      dayah: '',
      nik: '',
      password: '',
      passwordKonfirmasi: ''
    };

    if (this.state.dayahSelected == '0') {
      error.dayah = 'Institusi harus dipilih';
      this.setState({error: error});
    }

    if (this.state.nik == '') {
      error.nik = 'Nik harus diisi';
      this.setState({error: error});
    }

    if (this.state.password == '') {
      error.password = 'Password harus diisi';
      this.setState({error: error});
    }

    if (this.state.passwordKonfirmasi != this.state.password) {
      error.passwordKonfirmasi = 'Password konfirmasi dan Password tidak sama';
      this.setState({error: error});
    }
  }

  render() {
    let arrDayah = this.props.arrDayah && 
                    this.props.arrDayah.map( dayah => { return { value: dayah.id, text: dayah.name } });
    

    return (
      <Layout style={styles.container}>
        <Select 
          placeholder="Pilih Institusi"
          data={arrDayah}
          selectedOption={this.state.dayahSelected}
          onSelect={
            (data) => {
              let index = _.findIndex(arrDayah, (obj) => { return obj.id == data.id });
              this.setState({dayahSelected: arrDayah[index]});
            }
          }
          status={this.state.error.dayah == '' ? '' : 'danger'}
          caption={this.state.error.dayah}
          style={styles.select}
        />
        <Input 
          placeholder="NIK Siswa"
          value={this.state.nik}
          onChangeText={text => this.setState({ nik: text })}
          status={this.state.error.nik == '' ? '' : 'danger'}
          caption={this.state.error.nik}
        />
        <Input 
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          status={this.state.error.password == '' ? '' : 'danger'}
          caption={this.state.error.password}
        />
        <Input 
          placeholder="Password Konfirmasi"
          secureTextEntry={true}
          value={this.state.passwordKonfirmasi}
          onChangeText={text => this.setState({ passwordKonfirmasi: text })}
          status={this.state.error.passwordKonfirmasi == '' ? '' : 'danger'}
          caption={this.state.error.passwordKonfirmasi}
        />
        <Button onPress={this.submitClick} style={styles.submitButton}>
          Submit
        </Button>
        <Button status="basic">
          Cancel
        </Button>
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
  }
});

const mapStateToProps = state => ({
  arrDayah: state.register.arrDayah
})

export default connect(
  mapStateToProps,
  { 
    getAllDayah, 
  }
)(RegisterPage);