import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Loader from '../components/loader';

const ReportScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [polutionType, setPolutionType] = useState('');
  const [polutionLevel, setPolutionLevel] = useState('');

  const [typePickerVisible, setTypePickerVisible] = useState(false);
  const [levelPickerVisible, setLevelPickerVisible] = useState(false);
 
  var polutionTypes = [
    {value: 'Битови', label: 'Битови'},
    {value: 'Опасни', label: 'Опасни'},
  ];

  var polutionLevels = [
    {value: 'Ниско', label: 'Ниско'},
    {value: 'Средно', label: 'Средно'},
    {value: 'Високо', label: 'Високо'},
  ];

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Navigation');
    }, 2000);
  };

  return (
    <View style={styles.mainView}>
      <Text style={headerStyles.title}>Подай сигнал</Text>
      <View style={styles.mainBody}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            // justifyContent: 'center',
            // alignContent: 'center',
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
                Описание:
              </Text>
              <View style={{alignItems: 'center'}} />
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  multiline
                  numberOfLines={4}
                  onChangeText={UserEmail => setUserEmail(UserEmail)} // todo change
                  placeholder="Въведи описание"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              {errortext !== '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 15,
                }}>
                Вид замърсяване:
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
              <Text
                style={{
                  paddingLeft: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 15,
                }}>
                Ниво на заплаха:
              </Text>
              <DropDownPicker
                zIndex={2000}
                zIndexInverse={2000}
                items={polutionLevels}
                open={levelPickerVisible}
                style={filterModalStyles.filterStyles}
                containerStyle={filterModalStyles.filterContainerStyles}
                dropDownContainerStyle={filterModalStyles.filterStyles}
                setOpen={setLevelPickerVisible}
                placeholder={'Избери вид'}
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
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Сигнализирай</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
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
    // textDecorationLine: 'underline',
  },
});

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#9dddee',
  },
  mainBody: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#9dddee',
    // alignContent: 'center',
  },
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
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
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
