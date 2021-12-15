import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReportList from '../components/reportList';
import Modal from 'react-native-modal';

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
    },
  ];
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(reports);

  var setAllVisible = function () {
    var newData = [];
    data.forEach(el => {
      el.visible = true;
      newData.push(el);
    });
    console.log('Saving new data');
    console.log(newData);
    setData(newData);
  };

  var setVisibleByCity = function (city: string) {
    var newData = [];
    data.forEach(el => {
      if (el.city !== city) {
        el.visible = false;
      }
      newData.push(el);
    });
    console.log('Saving by city');
    console.log(newData);
    setData(newData);
  };

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
            setModalVisible(true);
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
            setModalVisible(true);
          }}
          iconStyle={{ marginLeft: '50%', color: 'black' }}
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
        {data && <ReportList reports={data} />}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
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
              setModalVisible(false);
            }}
          />
          <Button
            title="по локация"
            onPress={() => {
              setVisibleByCity('Бургас');
              setModalVisible(false);
            }}
          />
          <Button
            title="изчисти"
            onPress={() => {
              setAllVisible();
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // width: '95%',
    contentContainerStyle: 'center',
    backgroundColor: '#9dddee',
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

export default HomeScreen;
