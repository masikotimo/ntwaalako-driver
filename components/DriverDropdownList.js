import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';

export class DriverDropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
    };
  }

  componentDidMount() {
    const { DriverList } = this.props;
    this.setState({ drivers: DriverList });
  }

  ondriverselection = (selectedDriver) => {
    const { setCurrentDriverDetails } = this.props;
    setCurrentDriverDetails(selectedDriver);
  };

  render() {
    const { state } = this;
    // const { Driver } = this.props;
    return (
      <View style={{ zIndex: 10 }}>
        <DropDownPicker
          items={state.drivers}
          containerStyle={{ height: 40, marginBottom: 30 }}
          onChangeItem={(item) => {
            this.ondriverselection(item);
          }}
          placeholder="Select Driver"
          // defaultValue={Driver}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    DriverList: state.driverList,
    Driver: state.driver,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDriverDetails: (currentDriverDetails) => {
      dispatch({
        type: 'SET_CURRENT_DRIVER_DETAILS',
        currentDriverDetails,
      });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DriverDropdownList);

DriverDropdownList.propTypes = {
  setCurrentDriverDetails: PropTypes.func.isRequired,
  DriverList: PropTypes.array.isRequired,
};
