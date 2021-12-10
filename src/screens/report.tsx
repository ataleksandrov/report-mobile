import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

const ReportScreen = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <Text>Подай сигнал</Text>
      <Button
        title="Избери на картата"
        onPress={() => {
          navigation.navigate('Map');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReportScreen;
