import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import {Report} from '../models/report';
import Loader from '../components/loader';

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

const statusMap = {
  "new": "Нов",
  "in-progress": "Предаден на екип",
  "done": "Завършен"
}


export default function ReportDetails(nav: {route: {params: Report}}) {
  const [loading, setLoading] = useState(false);
  const report = nav.route.params;
  var date = new Date(report.date);
  var mounth = date.getMonth()+1
  if (mounth <= 9){
    mounth = "0"+ mounth;
  }
  let reportDate = date.getFullYear()+'/' +mounth+'/' +date.getDate();
  return (
    <View style={{flex: 1, backgroundColor: '#f0f8ff'}}>
      <ScrollView style={styles.container}>
        <Image 
        style={styles.image} 
        source={{uri: report.photourl}} 
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        />
        <Loader loading={loading} />

        <Text style={styles.date}>РИОС: {report.city}</Text>
        <Text style={styles.date}>Статус: {statusMap[report.status]}</Text>
        <Text style={styles.date}>Получен на: {reportDate}</Text>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.description}>
          {report.description}
        </Text>
      </ScrollView>
    </View>
  );
}
