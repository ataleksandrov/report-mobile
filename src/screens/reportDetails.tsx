import React from 'react';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import {Report} from '../models/report';

const styles = StyleSheet.create({
  container: {
    height: '20%',
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 25,
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    marginTop: 10,
    resizeMode: 'stretch',
    alignContent: 'center',
  },
  description: {
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'justify',
    fontSize: 15,
    alignContent: 'center',
  },
  date: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    alignContent: 'center',
  },
});

export default function ReportDetails(nav: {route: {params: Report}}) {
  const report = nav.route.params;
  console.log(report.photourl);
  return (
    <View style={{flex: 1, backgroundColor: '#f0f8ff'}}>
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: report.photourl}} />
        <Text style={styles.date}>{report.date}</Text>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.description}>
          {report.description +
            report.description +
            report.description +
            report.description +
            report.description +
            report.description +
            report.description +
            report.description +
            report.description +
            report.description +
            report.description}
        </Text>
      </ScrollView>
    </View>
  );
}
