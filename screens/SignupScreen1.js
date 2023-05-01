// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-return-assign */
// import React from 'react';
// import { View, StyleSheet, Text, Alert } from 'react-native';
// import t from 'tcomb-form-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// import { styles as LoginStyles } from '../styles/LoginStyle';
// import { baseUrl } from '../utils/host';

// const { Form } = t.form;
// import axios from "axios";

// const RegistrationTwoModel = t.struct({
//   position: t.String, // a required string
//   department: t.String, // a required number
//   phoneNumber: t.Number,
// });

// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 20,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#008000',
//     height: 40,
//     borderRadius: 8,
//   },
// });

// export default class SignUpScreenTwo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {},
//     };
//   }

//   componentDidMount() {
//     const userDetails = this.props.navigation.getParam('userDetails');
//     this.setState({ user: userDetails });
//   }

//   registerUser = () => {
//     const { state } = this;
//     axios
//       .post(`${baseUrl}registration/`, {
//         email: state.user.email,
//         password1: state.user.password,
//         password2: state.user.confirmPassword,
//       })
//       .then((response) => {
//         console.log(response);
//         Alert.alert('Car Booking', 'You have successfully Signed up ');
//         this.props.navigation.navigate('LoginScreen');
//       })
//       .catch((error) => {
//         console.log(error);
//         Alert.alert('Car Booking', 'Oops you have to be connected to the Internet ');
//       });
//   };

//   HandleSubmit = () => {
//     const value = this.form.getValue();
//     const { state } = this;

//     if (value != null) {
//       state.user.position = value.position;
//       state.user.department = value.department;
//       state.user.phonenumber = value.phonenumber;

//       this.registerUser();
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Form ref={(c) => (this.form = c)} type={RegistrationTwoModel} />

//         <View>
//           <TouchableHighlight
//             style={LoginStyles.button}
//             onPress={this.HandleSubmit}
//             underlayColor="#99d9f4"
//           >
//             <Text style={LoginStyles.buttonText}>Submit</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     );
//   }
// }
