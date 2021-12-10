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
    marginBottom: 16,
  },
});

export default function ReportList({reports, style}: ReportListProps) {
  return (
    <View style={style}>
      {reports.map(report => (
        <View key={report.reportId} style={styles.margin}>
          <ReportCard report={report} />
        </View>
      ))}
    </View>
  );
}
