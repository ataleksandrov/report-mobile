import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button,
  Modal,
  AsyncStorage,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import MapView, {MapEvent, Marker} from 'react-native-maps';

import Loader from '../components/loader';

const ReportScreen = ({navigation}) => {
  const emptyPhoto = {
    uri: '',
    fileName:'',
    type: ''
  };
  const [photo, setPhoto] = useState(emptyPhoto);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [marker, setMarker] = useState({latitude: 1, longitude: 1});

  const [polutionType, setPolutionType] = useState('');
  const [polutionLevel, setPolutionLevel] = useState('');

  const [typePickerVisible, setTypePickerVisible] = useState(false);
  const [levelPickerVisible, setLevelPickerVisible] = useState(false);

  const [duplicate, setDuplicate] = useState('');


  var polutionTypes = [
    {value: 'Битови', label: 'Битови'},
    {value: 'Опасни', label: 'Опасни'},
  ];

  var polutionLevels = [
    {value: 'Ниско', label: 'Ниско'},
    {value: 'Средно', label: 'Средно'},
    {value: 'Високо', label: 'Високо'},
  ];

  const launchImageLibrary = () => {
    let options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };

  const launchCamera = () => {
    let options = {
      mediaType: 'photo',
    };
    ImagePicker.launchCamera(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };


  const createFormData = (selectedPhoto, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: selectedPhoto.fileName,
      type: selectedPhoto.type,
      uri: Platform.OS === 'ios' ? selectedPhoto.uri.replace('file://', '') : selectedPhoto.uri,
    });

    return data;
  };

  async function uploadReport (force){
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      var headers = new Headers();
      headers.append("Token", token);
      if(force){
        headers.append("Force", true);
      } 

      const data = new FormData();
      data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      const photoResp = await fetch("http://192.168.0.100:8080/v1/photos", {
        method: 'POST',
        headers: headers,
        body: data
      });


      const response = await fetch('http://192.168.0.100:8080/v1/reports', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "title": title,
        "description": description,
        "photourl" :"http://192.168.0.100:8080/v1/photos/"+ photo.fileName,
        "level" :polutionLevel,
        "kind":polutionType,
        "coordinatex": marker.latitude,
        "coordinatey": marker.longitude,
      })});

      if (response.status === 409){
        const json = await response.json();
        setDuplicate(json.id);
        setLoading(false);
        return;
      }
       console.log("added");
       setTitle("");
       setDescription("");
       setPhoto(emptyPhoto);
       this.titleInput.clear();
       this.descriptionInput.clear();
       setPolutionLevel("");
       setPolutionType("");
       setMarker({latitude: 1, longitude: 1});
       if (force){
        setDuplicate('');
       }
       setLoading(false);

       navigation.navigate('Home');
     } catch (error) {
       console.error(error);
      //  navigation.navigate('Home');
     }
  }

  return (
    <View style={styles.mainView}>
      <Text style={headerStyles.title}>Подай сигнал</Text>
      <ScrollView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
          }}>
          <View>
            <KeyboardAvoidingView enabled>
            <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 30,
                }}>
                Заглавие
              </Text>
              <View style={{alignItems: 'center'}} />
              <View style={styles.SectionStyle}>
                <TextInput
                  ref={input => { this.titleInput = input }}
                  style={styles.inputStyle}
                  onChangeText={(title) => {setTitle(title)}} // todo change
                  placeholder="Въведи заглавие"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  clearButtonMode="always"
                />
              </View>
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 30,
                }}>
                Описание
              </Text>
              <View style={{alignItems: 'center'}} />
              <View style={styles.SectionStyle}>
                <TextInput
                  ref={input => { this.descriptionInput = input }}
                  style={styles.inputStyle}
                  multiline
                  numberOfLines={4}
                  onChangeText={(description) => {setDescription(description)}} // todo change
                  placeholder="Въведи описание"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  clearButtonMode="always"
                />
              </View>
              {/*  */}
              {/*  */}
              {/* Photo */}
              {/*  */}
              {/*  */}
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 30,
                  paddingBottom: 10,
                }}>
                Снимка
              </Text>
              {
               photo.uri !== '' && (
                <View>
                  <Image source={{uri: photo.uri}} style={styles.images} />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setPhoto(emptyPhoto);
                    }}>
                    <Text style={styles.imagesDeleteButton}>Изчисти</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <TouchableOpacity
                  style={styles.imagesUploadButtons}
                  activeOpacity={0.5}
                  onPress={launchImageLibrary}>
                  <Text style={styles.ImageButtonTextStyle}>
                    Прикачи снимка
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imagesUploadButtons}
                  activeOpacity={0.5}
                  onPress={launchCamera}>
                  <Text style={styles.ImageButtonTextStyle}>Отвори камера</Text>
                </TouchableOpacity>
              </View>
              {/*  */}
              {/*  */}
              {/* Map */}
              {/*  */}
              {/*  */}
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 20,
                }}>
                Местоположение
              </Text>
              {marker.latitude !== 1 && (
                <View>
                  <Text
                    style={{
                      paddingLeft: 40,
                      paddingTop: 10,
                      paddingBottom: 10,
                      color: 'green',
                    }}>
                    Избраните кординати са:
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 45,
                      fontWeight: 'bold',
                      paddingTop: 5,
                      paddingBottom: 10,
                      // color: 'green',
                    }}>
                    ({marker.longitude},{' '}{marker.latitude})
                  </Text>
                </View>
              )}
              <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '20%'}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.imagesUploadButtons}
                  onPress={() => {
                    setMapModalVisible(true);
                  }}>
                  <Text style={styles.ImageButtonTextStyle}>
                    Отбележи на картата
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                style={styles.mapViewStyle}
                visible={isMapModalVisible}
                onBackdropPress={() => setMapModalVisible(false)}>
                <MapView
                  style={{flex: 1}}
                  showsUserLocation={true}
                  minZoomLevel={5}
                  onLongPress={(event: MapEvent) => {
                    setMarker(event.nativeEvent.coordinate);
                    console.log('Coordinates are:', marker);
                  }}>
                  <Marker
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={'My maker'}
                    description={'My maker description'}>
                    <MapView.Callout>
                      <View style={styles.mapViewStyle}>
                        <Text style={{textAlign: 'justify', paddingBottom: 20}}>
                          Искате ли да използвате тази локация?
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          // style={styles.mapViewStyle}
                          onPress={() => {
                            setMapModalVisible(false);
                          }}>
                          <Text
                            style={{
                              borderColor: 'black',
                              borderWidth: 1,
                            }}>
                            да
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </MapView.Callout>
                  </Marker>
                </MapView>
              </Modal>
              {/*  */}
              {/*  */}
              {/* Polution */}
              {/*  */}
              {/*  */}
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 15,
                }}>
                Вид замърсяване
              </Text>
              <DropDownPicker
                zIndex={3000}
                zIndexInverse={1000}
                items={polutionTypes}
                open={typePickerVisible}
                style={filterModalStyles.filterStyles}
                containerStyle={filterModalStyles.filterContainerStyles}
                dropDownContainerStyle={filterModalStyles.filterStyles}
                setOpen={setTypePickerVisible}
                placeholder={'Избери вид'}
                setValue={setPolutionType}
                listMode="SCROLLVIEW"
                onClose={() => {
                  setTypePickerVisible(false);
                }}
                value={polutionType}
              />
              {/*  */}
              {/*  */}
              {/* Level */}
              {/*  */}
              {/*  */}
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 15,
                }}>
                Ниво на заплаха
              </Text>
              <DropDownPicker
                zIndex={2000}
                zIndexInverse={4000}
                items={polutionLevels}
                open={levelPickerVisible}
                style={filterModalStyles.filterStyles}
                containerStyle={filterModalStyles.filterContainerStyles}
                dropDownContainerStyle={filterModalStyles.filterStyles}
                setOpen={setLevelPickerVisible}
                placeholder={'Избери ниво'}
                setValue={setPolutionLevel}
                listMode="SCROLLVIEW"
                onClose={() => {
                  setLevelPickerVisible(false);
                }}
                value={polutionLevel}
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={async () => {
                  uploadReport(false);
                }}>
                <Text style={styles.buttonTextStyle}>Сигнализирай</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <Modal
              visible={duplicate!=''}
              // onBackdropPress={() => setDuplicate('')}
              style={{
                height: '100vh',
                width: '100vd',
                backgroundColor: '#0a798d',
              }}>
              <View style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#0a798d',
                borderRadius: 25,
                borderWidth: 2,
                borderColor: 'black',

              }}>
                 <Text style={{
                  fontSize: 20,
                  paddingBottom: '2%',
                  marginTop: '45%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>{"Внимание!"}</Text>
                 <Text style={{
                  fontSize: 20,
                  paddingBottom: '2%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>{"Вече същестува сигнал в радиус от 500 метра."}</Text>
                 <View
                style={{
                  // fontSize: 25,
                  // paddingBottom: '2%',
                  marginTop: '6%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: 'black',
                  width: '70%',
                  marginLeft: '15%'
                }}>
                <Loader loading={loading} />
                <Button 
                style={{
                  fontSize: 15,
                  // paddingBottom: '2%',
                  // paddingTop: '8%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: 'black',
                }} 
                color="black"
                title={"Прегледай"} 
                onPress={async () => {
                  setLoading(true);
                  const token = await AsyncStorage.getItem('token');
                  var headers = new Headers();
                  headers.append("Token", token);
                  const response = await fetch("http://192.168.0.100:8080/v1/reports/"+ duplicate, {
                    method: 'GET',
                    headers: headers});
                  let report = await response.json();
                  setDuplicate('');
                  setLoading(false);
                  navigation.navigate('Детайли', report);
                }}/>
                </View>
                <View
                style={{
                  // fontSize: 25,
                  // paddingBottom: '2%',
                  marginTop: '6%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: 'black',
                  width: '70%',
                  marginLeft: '15%'
                }}>
                <Button 
                style={{
                  fontSize: 15,
                  paddingBottom: '2%',
                  paddingTop: '8%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: 'black',
                }}
                color="black"
                title={"Добави"} 
                onPress={async () => {
                  uploadReport(true);
                }}/>
                </View>
                <View
                style={{
                  // fontSize: 25,
                  // paddingBottom: '2%',
                  marginTop: '6%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: 'black',
                  width: '70%',
                  marginLeft: '15%'
                }}>
                <Button 
                title={"Назад"} 
                color="black"
                onPress={async () => {
                  setDuplicate('');
                  setTitle("");
                  setDescription("");
                  setPhoto(emptyPhoto);
                  this.titleInput.clear();
                  this.descriptionInput.clear();
                  setPolutionLevel("");
                  setPolutionType("");
                  setMarker({latitude: 1, longitude: 1});
                  navigation.navigate('Home');
                }}/>
                </View>
                </View>
              </Modal>
          </View>
          <Loader loading={loading} />

        </ScrollView>
      </ScrollView>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  title: {
    paddingTop: 60,
    paddingBottom: 30,
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#0a798d',
    fontWeight: 'bold',
    // paddingBottom: 10,
    // textDecorationLine: 'underline',
  },
});

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#9dddee',
  },
  // mainBody: {
  //   // flex: 1,
  //   // backgroundColor: '#9dddee',
  //   // paddingTop: 30,
  // },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    color: '#FFFFFF',
    height: 45,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0a798d',
    height: 50,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  images: {
    width: 200,
    height: 100,
    marginHorizontal: '25%',
    borderRadius: 10,
  },
  imagesDeleteButton: {
    color: '#FFFFFF',
    paddingTop: 10,
    fontSize: 16,
    marginHorizontal: '42%',
  },
  imagesUploadButtons: {
    backgroundColor: '#9dddee',
    borderColor: '#0a798d',
    borderWidth: 1,
    height: 35,
    borderRadius: 10,
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  ImageButtonTextStyle: {
    color: 'black',
    paddingVertical: 7,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
  },
  mapViewStyle: {
    // flex: 1,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
    // backgroundColor: 'purple',
    // margin: 0,
  },
});

const filterModalStyles = StyleSheet.create({
  filterStyles: {width: '83%', paddingLeft: 15, paddingRight: 15},
  filterContainerStyles: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportScreen;
