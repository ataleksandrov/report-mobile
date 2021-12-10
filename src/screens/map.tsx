import MapView, {LatLng, MapEvent, Marker, Point} from 'react-native-maps';
import React, {Component, useState} from 'react';
import {Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';

const MobileMap = ({navigation}) => {
  const [marker, setMarker] = useState({latitude: 1, longitude: 1});
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        showsUserLocation={true}
        minZoomLevel={5}
        onLongPress={(event: MapEvent) => {
          setMarker(event.nativeEvent.coordinate);
          console.log('Coordinates are:', marker);
        }}
        onMarkerPress={(_: MapEvent) => {
          setModalVisible(true);
        }}>
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={'My maker'}
          description={'My maker description'}
        />
      </MapView>
      <Modal
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
      </Modal>
    </View>
  );
};

export default MobileMap;
