import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal } from '@ui-kitten/components';
import { styles } from '../Styles';

import {
  SUBMITTING,
  SUBMITTED,
  STATUS_SUCCESS,
  STATUS_ERROR
} from '../Constants';

class TransactionListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

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
        <Popover
          backdropStyle={styles.backdrop}
          visible={loading}
          content={PopoverContent()}
        >
          <Text></Text>
        </Popover>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  arrTransaction: state.transList.arrTransaction,
  loading: state.transList.loading,
  status: state.transList.status,
  message: state.transList.message,
})

export default connect(
  mapStateToProps,
  { 
  }
)(TransactionListPage);