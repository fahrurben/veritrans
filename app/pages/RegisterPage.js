import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Header, Content, Form, Item, Input, Picker } from 'native-base';
import { getAllDayah } from '../actions/RegisterActions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayahSelected: '0',
      nik: '',
      password: '',
      passwordKonfirmasi: '',
    };
  }

  componentDidMount() {
    this.props.getAllDayah();
  }

  render() {
    let arrDayah = this.props.arrDayah;

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Dayah"
                selectedValue={this.state.dayahSelected}
                onValueChange={(id) => {
                  this.setState({ dayahSelected: id });
                }}
              >
                <Picker.Item key={-1} label="- Pilih Institusi -" value="0" />
                { 
                  arrDayah &&
                  arrDayah.map((dayah, i) => 
                    (<Picker.Item key={i} label={dayah.name} value={dayah.id} />)
                  )
                }
              </Picker>
            </Item>
            <Item last>
              <Input 
                placeholder="NIK Siswa"
                value={this.state.nik}
                onChangeText={text => this.setState({ nik: text })}
               />
            </Item>
            <Item last>
              <Input 
                placeholder="Password"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
            <Item last>
              <Input 
                placeholder="Password Konfirmasi"
                secureTextEntry={true}
                value={this.state.passwordKonfirmasi}
                onChangeText={text => this.setState({ passwordKonfirmasi: text })}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  arrDayah: state.register.arrDayah
})

export default connect(
  mapStateToProps,
  { 
    getAllDayah, 
  }
)(RegisterPage);