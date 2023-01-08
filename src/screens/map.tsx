import MapView, {LatLng, MapEvent, Marker, Point} from 'react-native-maps';
import React, {Component, useState, useEffect} from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';

const MobileMap = ({navigation}) => {
  // const [marker, setMarker] = useState({latitude: 1, longitude: 1});
  // const [isModalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);
  const getReports = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      var headers = new Headers();
      headers.append("Token", token);

      const response = await fetch('http://192.168.0.100:8080/v1/reports', {
      method: 'GET',
      headers: headers,
    });
     const json = await response.json();
     setData(json);
   } catch (error) {
     console.error(error);
     setData([]);
   }
 }

 useEffect(() => {
  getReports();
 }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        showsUserLocation={true}
        minZoomLevel={5}
        // onLongPress={(event: MapEvent) => {
        //   setMarker(event.nativeEvent.coordinate);
        //   // console.log('Coordinates are:', marker);
        // }}
        onMarkerPress={(e: MapEvent) => {
          let coordinate= e.nativeEvent.coordinate;
          let report = data.find(x => x.coordinatex == coordinate.latitude && x.coordinatey == coordinate.longitude)
          navigation.navigate('Детайли', report);
        }}
        >
          {data.map(report => (
             <Marker
             key={report.id}
              coordinate={{
                latitude: report.coordinatex,
                longitude: report.coordinatey,
              }}
              title={report.title}
              description={report.description}
            />
          ))}
      </MapView>
      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'purple',
            margin: 0,
          }}>
          <Text>
            Искате ли да изпратите тази локация?
            {marker.longitude},{marker.latitude}
          </Text>
          <Button
            title="Изпрати"
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Home');
            }}
          />
        </View>
      </Modal> */}
    </View>
  );
};

export default MobileMap;
