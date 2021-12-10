import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Report} from '../models/report';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 8,
  },
});

export default function ReportDetails(report: Report) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>
    </View>
  );
}
