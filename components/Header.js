import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';
import { baseUrl } from '../utils/host';
import { connect } from 'react-redux';
import { set } from 'react-native-reanimated';

import axios from "axios";

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => console.log('pressed me')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => console.log('pressed me')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => console.log('pressed me')}>
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {

  componentDidMount=()=>{
    this.getItems()
  }

  getItems() {
    const { driverDetails,setTrips,setPendingTripsDetails,setApprovedTripsDetails } = this.props;
      axios
        .get(`${baseUrl}passengertrips/${driverDetails.driver_id}/`)
        .then((response) => {
          const items = response.data
          setTrips(items)

          const approvedTrips=response.data.filter((x) => {
            if (x.trip.status != 'Pending') {
              return true;
            }
            return false;
          });
          setApprovedTripsDetails(approvedTrips)
          const pendingTrips=response.data.filter((x) => {
            if (x.trip.status === 'Pending') {
              return true;
            }
            return false;
          });
  
          setPendingTripsDetails(pendingTrips)
        })
        .catch((error) => {
          console.log(error);
        });
  }
  
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === 'Title') {
      return [
        <ChatButton key='chat-title' navigation={navigation} isWhite={white} />,
      ]
    }

    switch (title) {
      case 'Home':
        return ([
          <ChatButton key='chat-home' navigation={navigation} isWhite={white} />,
        ]);
      case 'Deals':
        return ([
          <ChatButton key='chat-categories' navigation={navigation} />,
        ]);
      case 'Categories':
        return ([
          <ChatButton key='chat-categories' navigation={navigation} isWhite={white} />,
        ]);
      case 'Category':
        return ([
          <ChatButton key='chat-deals' navigation={navigation} isWhite={white} />,
        ]);
      case 'Profile':
        return ([
          <ChatButton key='chat-profile' navigation={navigation} isWhite={white} />,
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
        ]);
      case 'Search':
        return ([
          <ChatButton key='chat-search' navigation={navigation} isWhite={white} />,
        ]);
      case 'Settings':
        return ([
          <ChatButton key='chat-search' navigation={navigation} isWhite={white} />,
        ]);
      default:
        break;
    }
  }

  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => console.log('pressed me')}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />}
      />
    )
  }

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight,setTripToApproved,setTripToPending } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => setTripToPending()}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Upcoming Trips'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => setTripToApproved()}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Trips Approved'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderHeader = () => {
    const { search, tabs } = this.props;
    if (search || tabs) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      )
    }
    return null;
  }

  setWhichTrip=()=>{
    const { setTrip } = this.props;
    setTrip()

  }

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    // const { routeName } = navigation.state;
    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ flex: 0.3, paddingTop: 2  }}
          leftIconName={(back ? 'chevron-left' : 'navicon')}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            {color: theme.COLORS[white ? 'WHITE' : 'ICON']},
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}
function mapStateToProps(state) {
  return {
    driverDetails: state.driverDetails,
    headers: state.requestHeaders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTrips: (trips) =>
      dispatch({ type: 'SET_TRIPS', trips }),
    setTripToPending: () =>
    dispatch({ type: 'SET_TRIP_TO_PENDING' }),
    setTripToApproved: () =>
    dispatch({ type: 'SET_TRIP_TO_APPROVED' }),
    setApprovedTripsDetails: (tripDetails) =>
    dispatch({ type: 'SET_APPROVED_TRIP_DETAILS', tripDetails }),
    setPendingTripsDetails: (tripDetails) =>
    dispatch({ type: 'SET_PENDING_TRIP_DETAILS', tripDetails }),
      
  };
}




export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Header));

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
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
})