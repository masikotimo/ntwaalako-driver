import React, { useState,useEffect } from 'react';
import { View, Text,TouchableHighlight,StyleSheet,Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';
import { baseUrl } from '../utils/host';
// import DriverDropdownList from '../components/DriverDropdownList';

import axios from "axios";

export default function Rating(props) {
    const passengerId = useSelector((state) => state.passengerId);
    const reviews=["Terrible", "Bad",  "OK", "Good",  "Very Good"]
    const [rateValue, isRateValue] = useState(0);


    const submitRating = async () => {
        let updateDetails={
            rate_value: rateValue,
            reason: reviews[rateValue-1],
            passenger: passengerId,
        }
        
        console.log(updateDetails)

        axios
          .post(
            `${baseUrl}passenger-rating/create/`,
            updateDetails
            // this.headers
          )
          .then(async (response) => {
            Alert.alert('Hitch N Ride', 'Thank you for Rating that passenger ');
            props.navigation.navigate('Home');
          })
          .catch((error) => {
            Alert.alert('Hitch N Ride', 'Oops please contact the maintainer ');
          });
      };
    

    const ratingCompleted=(rating)=> {
        isRateValue(rating)
      }

    return (
        <View>
            {/* <DriverDropdownList/> */}
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad",  "OK", "Good",  "Very Good"]}
            defaultRating={1}
            size={40}
            onFinishRating={ratingCompleted}
            />
            <TouchableHighlight onPress={submitRating}>
                <View style={styles.button}>
                    <Text>Done</Text>
                </View>
             </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    },
    countText: {
      color: "#FF00FF"
    }
  });