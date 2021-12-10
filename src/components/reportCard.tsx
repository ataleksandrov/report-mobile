import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Report} from '../models/report';
import {useNavigation} from '@react-navigation/native';

interface ReportCardProps {
  report: Report;
}

const styles = StyleSheet.create({
  cardContainer: {backgroundColor: 'white', opacity: 0.95},
});

export function ReportCard({report}: ReportCardProps) {
  const {navigate} = useNavigation();

  return (
    <Card
      elevation={5}
      style={styles.cardContainer}
      onPress={() => navigate('ReportDetails', report)}>
      {/* <Card.Cover
        source={{
          uri: report.coverPhoto,
        }}
      /> */}
      <Card.Title title={report.title} subtitle={report.date} />
    </Card>
  );
}
