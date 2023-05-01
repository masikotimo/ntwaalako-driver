import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../utils/host';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards'

import axios from "axios";

export class ApprovedTrips extends Component {
  static navigationOptions = {
    headerShown: false,
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isloaded: false,
      items:[]
    };
    this.credentials = this.props.headers;
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    const { driverDetails } = this.props;
    axios
      .get(`${baseUrl}passengertrips/`)
      .then((response) => {
        const items = response.data.filter((x) => {
          if (x.trip.driver === driverDetails.driver_id) {
            return true;
          }
          return false;
        });
        this.setState({ ...this.state, items, isloaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isloaded) {
      const ApprovedTripss = this.state.items.map((x, k) => {
        return (
          <Card key={k}>
            
            <CardTitle
              subtitle={x.trip.destination}
            />
            <CardContent text={`From ${x.trip.pick_up_location}`} />
            <CardContent text={`Status : ${x.trip.status}`} />
            <CardAction
              separator={true}
              inColumn={false}>
              <CardButton
                onPress={() => { }}
                title="Explore"
                color="#FEB557"
              />
            </CardAction>
          </Card>


        );
      });

      return (
        <ScrollView>
          {ApprovedTripss}

        </ScrollView>
        
      );
    }

    return (
      <ScrollView>
        <Card>
          
          <CardTitle
            subtitle="Number 6"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction
            separator={true}
            inColumn={false}>
            <CardButton
              onPress={() => { }}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => { }}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationToken: state.notificationToken,
    driverDetails: state.driverDetails,
    headers: state.requestHeaders,
  };
}

export default connect(mapStateToProps, null)(ApprovedTrips);

