import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';

export class VehicleDropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
    };
  }

  componentDidMount() {
    const { VehicleList } = this.props;
    this.setState({ vehicles: VehicleList });
  }

  onVehicleSelection = (selectedVehicle) => {
    const { setCurrentVehicleDetails } = this.props;
    setCurrentVehicleDetails(selectedVehicle);
    // alert(JSON.stringify(selectedVehicle));
  };

  render() {
    const { state } = this;
    // alert(this.props.Vehicle);
    // const { Vehicle } = this.props;
    return (
      <DropDownPicker
        items={state.vehicles}
        containerStyle={{ height: 40, marginBottom: 30 }}
        onChangeItem={(item) => {
          this.onVehicleSelection(item);
        }}
        placeholder="Select Vehicle"
        // defaultValue={Vehicle}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    VehicleList: state.vehicleList,
    Vehicle: state.vehicle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentVehicleDetails: (currentVehicleDetails) => {
      dispatch({
        type: 'SET_CURRENT_VEHICLE_DETAILS',
        currentVehicleDetails,
      });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(VehicleDropdownList);

VehicleDropdownList.propTypes = {
  setCurrentVehicleDetails: PropTypes.func.isRequired,
  VehicleList: PropTypes.array.isRequired,
};
