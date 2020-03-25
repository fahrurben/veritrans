import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';import moment from 'moment';
moment.locale('id');
import { Layout, Input, Text, Select, Button, Popover, Spinner, Modal, ListItem } from '@ui-kitten/components';
import { styles } from '../Styles';
import { getAllData } from '../actions/TransactionListActions';

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

  componentDidMount() {
    this.props.getAllData();
  }

  render() {
    const PopoverContent = () => (
      <Layout style={styles.popoverContent}>
        <Spinner size='giant'/>
      </Layout>
    );

    let arrTransaction = this.props.arrTransaction;
    let loading = this.props.loading;

    return (
      <Layout style={styles.container}>
        <Text category='h5'>Daftar Transaksi</Text>
        <ScrollView>
        {
          arrTransaction &&
          arrTransaction.length > 0 &&
          arrTransaction.map((trans, key) => {
            var dateObj = moment(trans.date);
            var dateFormatted = dateObj.format("DD/MM/YYYY");
            var nominalFormatted = trans.amount;

            return (
              <ListItem key={key} style={styles.transList}>
                <Layout>
                  <Text category='h6'>Transfer {dateFormatted}, Rp {nominalFormatted}</Text>
                  <Text category='p1'>{trans.bank_name}</Text>
                  <Text category='p1'>{trans.status_name}</Text>
                </Layout>
              </ListItem>
            );
          })
        }
        </ScrollView>
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
})

export default connect(
  mapStateToProps,
  { 
    getAllData,
  }
)(TransactionListPage);