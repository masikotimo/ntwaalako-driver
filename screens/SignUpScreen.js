// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-return-assign */
// import React from 'react';
// import { View, StyleSheet, Text, Alert } from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// import t from 'tcomb-form-native';
// import { styles as LoginStyles } from '../styles/LoginStyle';
// import { baseUrl } from '../utils/host';

// const { Form } = t.form;
// import axios from "axios";

// const RegistrationModel = t.struct({
//   email: t.String,
// });

// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 20,
//   },
// });

// export default class SignUpScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   SendEmail = (email) => {
//     const { navigation } = this.props;

//     axios
//       .post(
//         `${baseUrl}account/password/reset/`,
//         {
//           email,
//         }
//         // this.headers
//       )
//       .then(async (response) => {
//         Alert.alert('Hitch N Ride', 'An email has been sent');
//         navigation.navigate('LoginScreen');
//       })
//       .catch((error) => {
//         Alert.alert('Hitch N Ride', 'Oops you have to be connected to the Internet ');
//       });
//   };

//   HandleSubmit = () => {
//     const value = this.form.getValue();
//     if (value != null) {
//       this.SendEmail(value.email);
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View>
//           <Text>Reset your password</Text>
//         </View>
//         <View>
//           <Text>Enter your email to receive a password reset code </Text>
//         </View>

//         <Form ref={(c) => (this.form = c)} type={RegistrationModel} />

//         <TouchableHighlight
//           style={LoginStyles.button}
//           onPress={this.HandleSubmit}
//           underlayColor="#99d9f4"
//         >
//           <Text style={LoginStyles.buttonText}>Send Email</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
