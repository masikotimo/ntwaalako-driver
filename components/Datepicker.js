/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export const Datepicker = () => {
  // const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);

  // alert(currentDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    dispatch({ type: 'SET_DATE', currentDate });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('datetime');
  };

  const closeMode = () => {
    setShow(false);
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="select date" />
        <Button onPress={closeMode} title="done" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
