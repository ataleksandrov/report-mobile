import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Report} from '../models/report';
import {useNavigation} from '@react-navigation/native';

interface ReportCardProps {
  report: Report;
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f0f8ff',
    opacity: 0.95,
    borderColor: '#9dddee',
    borderWidth: 4,
    borderRadius: 10,
  },
});

export function ReportCard({report}: ReportCardProps) {
  const {navigate} = useNavigation();
  var date = new Date(report.date);
  let reportDate = date.getFullYear()+'/' +date.getMonth()+'/' +date.getDate();
  return (
    <Card
      elevation={5}
      style={styles.cardContainer}
      onPress={() => navigate('Детайли', report)}>
      <Card.Cover
        source={{
          uri: report.photourl,
        }}
      />
      <Card.Title
        title={report.title}
        subtitle={reportDate + ' ' + report.level}
      />
    </Card>
  );
}
