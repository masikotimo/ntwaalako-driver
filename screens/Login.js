/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { baseUrl } from '../utils/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#4e4e4e',
    padding: 12,
    marginBottom: 5,
  },
});

export class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {}

  getProfile=(user)=>{
    const {setProfile} = this.props
    axios
      .get(`${baseUrl}users/${user}/`)
      .then((response) => {
        const items = response.data
       setProfile(items)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkFirstTime=async(driver)=>{
    try {
      await AsyncStorage.getItem('driverTokenSaved').then(async(value) => {
        if (value == null) {
              await this.saveTokenToDB(driver);
              AsyncStorage.setItem('driverTokenSaved', '1' );
          };
      });
    } catch (e) {
      // saving error
    }
  }

  saveTokenToDB=async(driver)=>{

   
    
      try {
        const value = await AsyncStorage.getItem('drivernotificationtoken')
        if(value !== null) {
          axios
          .post(`${baseUrl}drivernotification/create/`, {
            driver: driver,
            expo_token: value,
          })
          .then(async (response) => {
            console.log('saved token to the db');
          })
          .catch((error) => {
            console.log(' token not saved to the db');
          });
        }
      } catch(e) {
        // error reading value
      }
   
  }


  loginUser = async (credentials) => {
    const { navigation, setdriverDetails } = this.props;
    axios
      .post(`${baseUrl}drivers/account/login/`, {
        email: credentials.email,
        password: credentials.password,
      })
      .then(async (response) => {
        let data=response.data
        setdriverDetails(data);
        this.checkFirstTime(data.driver_id)
        this.getProfile(data.user_id)
        navigation.navigate('App');
 
        Alert.alert('Car Booking', 'You have Logged in ');
      })
      .catch((error) => {
        Alert.alert('Car Booking', 'Oops you have to be connected to the Internet ');
      });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => this.loginUser(values)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(4).required(),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TextInput
                value={values.email}
                style={styles.inputStyle}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="E-mail"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
              )}
              <TextInput
                value={values.password}
                style={styles.inputStyle}
                onChangeText={handleChange('password')}
                placeholder="Password"
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
              )}
              <Button color="#3740FE" title="Submit" disabled={!isValid} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationToken: state.notificationToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setdriverDetails: (driverDetails) =>
      dispatch({ type: 'SET_DRIVER_DETAILS', driverDetails }),
    setProfile: (profile) =>
      dispatch({ type: 'SET_PROFILE', profile }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
