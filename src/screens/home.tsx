import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import ReportList from '../components/reportList';

const HomeScreen = ({navigation}) => {
  // const { data: events } = useAsync(() => client.getEvents(), []);
  const reports = [
    {
      reportId: 'id asd',
      title: 'title asd',
      date: 'date string',
      description: 'description string',
      photos: [{}],
      userId: 'userId string',
    },
  ];
  return (
    <ScrollView style={styles.mainView}>
      <Text>Получени сигнали</Text>
      {reports && <ReportList reports={reports} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    contentContainerStyle: 'center',
  },
});

export default HomeScreen;
