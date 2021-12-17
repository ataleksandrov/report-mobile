import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Report} from '../models/report';
import {ReportCard} from '../components/reportCard';

interface ReportListProps {
  reports: Report[];
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  margin: {
    // marginBottom: 16,
  },
});

export default function ReportList({reports}: ReportListProps) {
  return (
    <View style={{marginTop: 4}}>
      {reports.map(report => (
        <View key={report.reportId} style={styles.margin}>
          <ReportCard report={report} />
        </View>
      ))}
    </View>
  );
}
