/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { baseUrl } from "../utils/host";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Dimensions, KeyboardAvoidingView } from "react-native";

import { Block, Button, Input, NavBar, Text } from "galio-framework";
import theme from "../constants/NewTheme";
import Images from "../constants/Images";

import axios from "axios";
const { height, width } = Dimensions.get("window");

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

  getProfile = (user) => {
    const { setProfile } = this.props;
    axios
      .get(`${baseUrl}users/${user}/`)
      .then((response) => {
        const items = response.data;
        setProfile(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkFirstTime = async (driver) => {
    try {
      await AsyncStorage.getItem("driverTokenSaved").then(async (value) => {
        if (value == null) {
          await this.saveTokenToDB(driver);
          AsyncStorage.setItem("driverTokenSaved", "1");
        }
      });
    } catch (e) {
      // saving error
    }
  };

  saveTokenToDB = async (driver) => {
    try {
      const value = await AsyncStorage.getItem("drivernotificationtoken");
      if (value !== null) {
        axios
          .post(`${baseUrl}drivernotification/create/`, {
            driver: driver,
            expo_token: value,
          })
          .then(async (response) => {
            console.log("saved token to the db");
          })
          .catch((error) => {
            console.log(" token not saved to the db");
          });
      }
    } catch (e) {
      // error reading value
    }
  };

  loginUser = async (credentials) => {
    const { navigation, setdriverDetails } = this.props;
    axios
      .post(`${baseUrl}drivers/account/login/`, {
        email: credentials.email,
        password: credentials.password,
      })
      .then(async (response) => {
        let data = response.data;
        console.log("loginned data",data)
        setdriverDetails(data);
        this.checkFirstTime(data.driver_id);
        this.getProfile(data.user_id);
        navigation.navigate("App");

        console.log("Done")
      })
      .catch((error) => {
        Alert.alert(
          "Car Booking",
          "Oops you have to be connected to the Internet "
        );
      });
  };

  render() {
    const { navigation } = this.props;

    const check = () => {
      return (
        <Block flex={2} center space="evenly">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => this.loginUser(values)}
            validationSchema={yup.object().shape({
              email: yup.string().email().required(),
              password: yup.string().min(4).required(),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <>
                <Block flex={2}>
                  <Text p>Email</Text>
                  <Input
                    rounded
                    type="email-address"
                    placeholder="Email"
                    autoCapitalize="none"
                    style={{ width: width * 0.9 }}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    value={values.email}
                  />

                  {touched.email && errors.email && (
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.email}
                    </Text>
                  )}
                  <Text p>Password</Text>
                  <Input
                    rounded
                    password
                    viewPass
                    placeholder="Password"
                    style={{ width: width * 0.9 }}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.password}
                    </Text>
                  )}
                </Block>
                <Block flex middle>
                  <Button
                    round
                    color="info"
                    style={{ marginTop: theme.SIZES.BASE }}
                    disabled={!isValid}
                    onPress={handleSubmit}
                  >
                    Login
                  </Button>
                </Block>
              </>
            )}
          </Formik>
        </Block>
      );
    };

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block
            flex
            center
            style={{
              marginTop: theme.SIZES.BASE * 1.875,
              marginBottom: height * 0.1,
            }}
          >
            <Text
              muted
              center
              size={theme.SIZES.FONT}
              style={{ paddingHorizontal: theme.SIZES.BASE }}
            >
              Hitch N Ride
            </Text>
          </Block>
          {check()}
        </KeyboardAvoidingView>
      </Block>
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
      dispatch({ type: "SET_DRIVER_DETAILS", driverDetails }),
    setProfile: (profile) => dispatch({ type: "SET_PROFILE", profile }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// return (
//   <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
//     <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
//       <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>
//         <Text muted center size={theme.SIZES.FONT } style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}>
//           Hitch N Ride
//         </Text>
//       </Block>

//       <Block flex={2} center space="evenly">
//         <Block flex={2}>
//           <Input
//             rounded
//             type="email-address"
//             placeholder="Email"
//             autoCapitalize="none"
//             style={{ width: width * 0.9}}
//             onChangeText={text => this.handleChange('email', text)}
//           />
//           <Input
//             rounded
//             password
//             viewPass
//             placeholder="Password"
//             style={{ width: width * 0.9 }}
//             onChangeText={text => this.handleChange('password', text)}
//           />
//           <Text
//             color={theme.COLORS.ERROR}
//             size={theme.SIZES.FONT * 0.75}
//             onPress={() => Alert.alert('Not implemented')}
//             style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
//           >
//             Forgot your password?
//           </Text>
//         </Block>
//         <Block flex middle>
//         <Button round color="info"  style={{ marginTop: theme.SIZES.BASE }}>
//               Login
//             </Button>
//         </Block>
//       </Block>

//       <Formik
//       initialValues={{
//         email: '',
//         password: '',
//       }}
//       onSubmit={(values) => this.loginUser(values)}
//       validationSchema={yup.object().shape({
//         email: yup.string().email().required(),
//         password: yup.string().min(4).required(),
//       })}
//     >
//       {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
//         <View style={styles.formContainer}>
//           <TextInput
//             value={values.email}
//             style={styles.inputStyle}
//             onChangeText={handleChange('email')}
//             onBlur={() => setFieldTouched('email')}
//             placeholder="E-mail"
//           />
//           {touched.email && errors.email && (
//             <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
//           )}
//           <TextInput
//             value={values.password}
//             style={styles.inputStyle}
//             onChangeText={handleChange('password')}
//             placeholder="Password"
//             onBlur={() => setFieldTouched('password')}
//             secureTextEntry
//           />
//           {touched.password && errors.password && (
//             <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
//           )}
//           <Button color="#3740FE" title="Submit" disabled={!isValid} onPress={handleSubmit} />
//         </View>
//       )}
//     </Formik>
//     </KeyboardAvoidingView>
//   </Block>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
});
