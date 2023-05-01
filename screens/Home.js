import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import moment from 'moment';
import { baseUrl } from '../utils/host';
import { Icon } from '../components/';
import axios from "axios";
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('screen');

export default function Home() {
  const trips = useSelector(state => state.trips);

  useEffect(() => {
    // Any side effects you want to apply when the component mounts
  }, []);

  const settleTrip = (tripId) => {
    axios
      .post(`${baseUrl}/passengertrips/settle-trip`, {
        passenger_trip: tripId,
      })
      .then((response) => {
        console.log("I settled trip",response.data);
        Alert.alert(response.data)
        // Update state to re-render the component with updated data
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const showTrip = (items) => {
    if (items != null ) {
      return items.map((x, k) => {
        return (
          <Card key={x.id} >
            <CardTitle subtitle={`Name : ${x.passenger.user.email}`} />
          <CardContent text={`From : ${x.trip.pick_up_location}`} />
          <CardContent text={`To : ${x.trip.destination}`} />
          <CardContent text={`Status: ${x.trip.status} `} />
          <CardAction separator={true} inColumn={false}>
              <CardButton onPress={() => settleTrip(x.id)} title="Settle Trip" color="#FEB557" />
            </CardAction>
          </Card>
        );
      });
    } else {
      return (<Card >
        <CardTitle subtitle={`No Trips found`} />
      </Card>)
    }
  };
  
  
  
  const ApprovedTripss =  showTrip(trips);
  

  return (
    <ScrollView>
      {ApprovedTripss}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
