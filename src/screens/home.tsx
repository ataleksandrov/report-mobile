import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReportList from '../components/reportList';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {Report} from '../models/report';

const HomeScreen = ({navigation}) => {
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [sortingProp, setSortingProp] = useState('');

  // filter
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isCityFilterPickerVisible, setCityFilterPickerVisible] =
    useState(false);
  const [isLevelFilterPickerVisible, setLevelFilterPickerVisible] =
    useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  const [data, setData] = useState([]);

  const uniqueCities = [...new Set(data.map(x => x.city))].map(x => ({
    label: x,
    value: x,
  }));
  const uniqueLevels = [...new Set(data.map(x => x.level))].map(x => ({
    label: x,
    value: x,
  }));

 

  const getReports = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      var headers = new Headers();
      headers.append("Token", token);

      const response = await fetch('http://localhost:8080/v1/reports', {
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
    <View style={{flex: 1, backgroundColor: '#0a798d'}}>
      <Text style={headerStyles.title}>Получени сигнали</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingBottom: 10,
          backgroundColor: '#0a798d',
          width: '100%',
        }}>
        <Icon.Button
          name="filter"
          backgroundColor="#9dddee"
          onPress={() => {
            setFilterModalVisible(true);
          }}
          iconStyle={{marginLeft: '50%', color: 'black'}}
          style={{
            width: 194,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'flex-start',
            borderColor: '#0a798d',
            borderWidth: 2,
          }}
        />
        <Icon.Button
          name="sort"
          backgroundColor="#9dddee"
          onPress={() => {
            setSortModalVisible(true);
          }}
          iconStyle={{marginLeft: '50%', color: 'black'}}
          style={{
            width: 194,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'flex-start',
            borderColor: '#0a798d',
            borderWidth: 2,
          }}
        />
      </View>
      <ScrollView>
        {
          // durty workaround, as child is not reloaded after parent state change
          data
            .filter(x => filterCity === '' || x.city === filterCity)
            .filter(x => filterLevel === '' || x.level === filterLevel)
            .length !== 0 ? (
            <ReportList
              reports={data
                .filter(x => filterCity === '' || x.city === filterCity)
                .filter(x => filterLevel === '' || x.level === filterLevel)
                .sort((obj1, obj2) => {
                  if (sortingProp === '') {
                    return 0;
                  }
                  if (obj1[sortingProp] > obj2[sortingProp]) {
                    return 1;
                  }
                  if (obj1[sortingProp] < obj2[sortingProp]) {
                    return -1;
                  }
                  return 0;
                })}
            />
          ) : (
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                textAlign: 'center',
                paddingTop: 30,
              }}>
              Няма намерени резултати
            </Text>
          )
        }
      </ScrollView>

      {/* sorting modal */}
      <Modal
        isVisible={isSortModalVisible}
        onBackdropPress={() => setSortModalVisible(false)}
        style={sortModalStyles.modalStyle}>
        <View style={sortModalStyles.mainView}>
          <Text style={sortModalStyles.title}>Сортирай по:</Text>
          <TouchableOpacity
            style={{
              ...sortModalStyles.sortButtons,
              backgroundColor: sortingProp === 'date' ? 'grey' : '#DDDDDD',
            }}
            disabled={sortingProp === 'date'}
            onPress={() => {
              setSortingProp('date');
              setSortModalVisible(false);
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                paddingTop: 4,
              }}>
              Дата
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...sortModalStyles.sortButtons,
              backgroundColor: sortingProp === 'city' ? 'grey' : '#DDDDDD',
            }}
            disabled={sortingProp === 'city'}
            onPress={() => {
              setSortingProp('city');
              setSortModalVisible(false);
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                paddingTop: 4,
              }}>
              Град
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...sortModalStyles.sortButtons,
              backgroundColor: sortingProp === 'level' ? 'grey' : '#DDDDDD',
            }}
            disabled={sortingProp === 'level'}
            onPress={() => {
              setSortingProp('level');
              setSortModalVisible(false);
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                paddingTop: 4,
              }}>
              Ниво
            </Text>
          </TouchableOpacity>
          <Button
            title="Изчисти"
            color="#000000"
            onPress={() => {
              setSortingProp('');
              setSortModalVisible(false);
            }}
          />
        </View>
      </Modal>

      {/* filtering modal */}
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={() => setFilterModalVisible(false)}
        style={{flex: 1}}>
        <View style={filterModalStyles.mainView}>
          <Text style={filterModalStyles.title}>Филтриране по:</Text>
          <Text style={filterModalStyles.text}>Град:</Text>
          <DropDownPicker
            zIndex={3000}
            zIndexInverse={1000}
            items={uniqueCities}
            open={isCityFilterPickerVisible}
            style={filterModalStyles.filterStyles}
            containerStyle={filterModalStyles.filterContainerStyles}
            dropDownContainerStyle={filterModalStyles.filterStyles}
            setOpen={setCityFilterPickerVisible}
            placeholder={'Избери град'}
            setValue={setFilterCity}
            onClose={() => {
              setCityFilterPickerVisible(false);
              setFilterModalVisible(false);
            }}
            value={filterCity}
          />
          <Text style={filterModalStyles.text}>Ниво на опасност:</Text>
          <DropDownPicker
            zIndex={2000}
            zIndexInverse={2000}
            items={uniqueLevels}
            mode={'BADGE'}
            open={isLevelFilterPickerVisible}
            style={filterModalStyles.filterStyles}
            containerStyle={filterModalStyles.filterContainerStyles}
            dropDownContainerStyle={filterModalStyles.filterStyles}
            setOpen={setLevelFilterPickerVisible}
            placeholder={'Избери ниво'}
            setValue={setFilterLevel}
            onClose={() => {
              setLevelFilterPickerVisible(false);
              setFilterModalVisible(false);
            }}
            value={filterLevel}
          />
          <Button
            title="Изчисти"
            color="#000000"
            onPress={() => {
              setFilterCity('');
              setFilterLevel('');
              setFilterModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainerStyle: {
    backgroundColor: '#dfdfdf',
  },
});

const headerStyles = StyleSheet.create({
  title: {
    paddingTop: 60,
    paddingBottom: 30,
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#0a798d',
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
});

const filterModalStyles = StyleSheet.create({
  mainView: {
    height: 250,
    backgroundColor: '#0a798d',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 20,
    paddingBottom: '2%',
    paddingTop: '3%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    paddingBottom: '2%',
    paddingTop: '2%',
    paddingLeft: '6%',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  filterStyles: {width: '90%'},
  filterContainerStyles: {justifyContent: 'center', alignItems: 'center'},
});

const sortModalStyles = StyleSheet.create({
  sortButtons: {
    borderRadius: 40,
    width: '55%',
    height: 35,
    paddingBottom: 3,
    paddingTop: 3,
    marginTop: 10,
    marginBottom: 10,
  },
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '70%',
    backgroundColor: '#0a798d',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingBottom: '3%',
    paddingTop: '3%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
