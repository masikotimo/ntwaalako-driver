/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { SideBarStyles } from '../styles/SideBarStyles';

const sideBarImageBackground = require('../assets/images/Sidebarheader.jpg');
const profileImage = require('../assets/images/profileImage.jpeg');

export class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: 'Loading...',
        subscriptionExpiryDate: 'Loading...',
      },
    };
  }

  componentDidMount() {}

  setCurrentUserInfo = async () => {};

  render() {
    const { user } = this.state;
    return (
      <ScrollView>
        <ImageBackground style={SideBarStyles.img} source={sideBarImageBackground}>
          <Image style={SideBarStyles.profile} source={profileImage} />
          <View style={SideBarStyles.Details}>
            <Text style={SideBarStyles.Name}>
              {typeof user.username === 'undefined' ? '' : user.username}
            </Text>
            <Text style={SideBarStyles.Number}>
              {typeof user.subscriptionExpiryDate === 'undefined'
                ? ''
                : user.subscriptionExpiryDate}
            </Text>
          </View>
        </ImageBackground>

        <View style={SideBarStyles.container}>
          <DrawerNavigatorItems {...this.props} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(SideBar);

SideBar.propTypes = {};
