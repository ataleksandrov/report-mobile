import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReportList from '../components/reportList';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';

const HomeScreen = ({navigation}) => {
  // const { data: events } = useAsync(() => client.getEvents(), []);
  // todo add visible: true, after fetching from server
  const reports = [
    {
      reportId: 'id asd',
      title: 'title asd',
      date: '14.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://media.nationalgeographic.org/assets/photos/000/272/27281.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Бургас',
      level: 'low',
    },
    {
      reportId: 'id asd 2',
      title: 'title asd 2',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Пловдив',
      level: 'low',
    },
    {
      reportId: 'id asd 3',
      title: 'title asd 3',
      date: '12.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Варна',
      level: 'high',
    },
    {
      reportId: 'id asd 4',
      title: 'title asd 4',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'София',
      level: 'high',
    },
    {
      reportId: 'id asd 5',
      title: 'title asd 5',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Бургас',
      level: 'high',
    },
    {
      reportId: 'id asd 6',
      title: 'title asd 6',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Пловдив',
      level: 'medium',
    },
    {
      reportId: 'id asd 7',
      title: 'title asd 7',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Варна',
      level: 'medium',
    },
    {
      reportId: 'id asd 8',
      title: 'title asd 8',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'София',
      level: 'medium',
    },
    {
      reportId: 'id asd 9',
      title: 'title asd 9',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Бургас',
      level: 'low',
    },
    {
      reportId: 'id asd 10',
      title: 'title asd 10',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Бургас',
      level: 'low',
    },
    {
      reportId: 'id asd 11',
      title: 'title asd 11',
      date: '13.12.2021г.',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      photos: [
        'https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/11/2019_0520-plastic-pollution-aspect-ratio-2000-1200-1024x614.jpg',
      ],
      userId: 'userId string',
      visible: true,
      city: 'Бургас',
      level: 'high',
    },
  ];
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isCityFilterPickerVisible, setCityFilterPickerVisible] =
    useState(false);
  const [isLevelFilterPickerVisible, setLevelFilterPickerVisible] =
    useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  const [data, setData] = useState(reports);

  const uniqueCities = [...new Set(data.map(x => x.city))].map(x => ({
    label: x,
    value: x,
  }));
  const uniqueLevels = [...new Set(data.map(x => x.level))].map(x => ({
    label: x,
    value: x,
  }));

  return (
    <View style={{flex: 1}}>
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
            // setFilterPickerVisible(true);
          }}
          iconStyle={{marginLeft: '50%', color: 'black'}}
          style={{
            width: 207,
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
            width: 207,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'flex-start',
            borderColor: '#0a798d',
            borderWidth: 2,
          }}
        />
      </View>
      <ScrollView style={styles.mainView}>
        {data && (
          <ReportList
            reports={data
              .filter(x => filterCity === '' || x.city === filterCity)
              .filter(x => filterLevel === '' || x.level === filterLevel)}
          />
        )}
        {console.log('LOGGING ' + data.map(x => x.visible))}
      </ScrollView>

      {/* sorting modal */}
      <Modal
        isVisible={isSortModalVisible}
        onBackdropPress={() => setSortModalVisible(false)}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0a798d',
          }}>
          <Button
            title="по дата"
            style={{color: 'black'}}
            onPress={() => {
              setSortModalVisible(false);
            }}
          />
          <Button
            title="по локация"
            onPress={() => {
              // setVisibleByCity('Бургас');
              setSortModalVisible(false);
            }}
          />
          <Button
            title="изчисти"
            onPress={() => {
              setFilterCity('');
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
        <View
          style={{
            height: 250,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#0a798d',
            borderRadius: 25,
            borderWidth: 2,
            borderColor: 'black',
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingBottom: '5%',
              paddingTop: '3%',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Филтриране по:
          </Text>
          <Text
            style={{
              fontSize: 15,
              paddingBottom: '2%',
              paddingLeft: '6%',
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            Град:
          </Text>
          <DropDownPicker
            zIndex={3000}
            zIndexInverse={1000}
            items={uniqueCities}
            open={isCityFilterPickerVisible}
            style={filterStyles}
            containerStyle={filterContainerStyles}
            dropDownContainerStyle={filterStyles}
            setOpen={setCityFilterPickerVisible}
            placeholder={'Избери град'}
            setValue={setFilterCity}
            onClose={() => {
              setCityFilterPickerVisible(false);
              setFilterModalVisible(false);
            }}
            value={filterCity}
          />
          <Text
            style={{
              fontSize: 15,
              paddingBottom: '2%',
              paddingTop: '2%',
              paddingLeft: '6%',
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            Ниво на опасност:
          </Text>
          <DropDownPicker
            zIndex={2000}
            zIndexInverse={2000}
            items={uniqueLevels}
            mode={'BADGE'}
            open={isLevelFilterPickerVisible}
            style={filterStyles}
            containerStyle={filterContainerStyles}
            dropDownContainerStyle={filterStyles}
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
            color="Black"
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

const filterStyles = StyleSheet.create({
  width: '90%',
});

const filterContainerStyles = StyleSheet.create({
  justifyContent: 'center',
  alignItems: 'center',
});

export default HomeScreen;
