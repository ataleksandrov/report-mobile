import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import Modal from 'react-native-modal';

import Loader from '../components/loader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmitPress = async () => {
    setErrortext('');
    if (!userEmail) {
      // alert('Моля въведете Емейл');
      return;
    }
    if (!userPassword) {
      // alert('Моля въведете Парола');
      return;
    }

    setLoading(true);
    try {
      const base64 = require('base-64');
      var headers = new Headers();
      headers.append("Authorization", "Basic " + base64.encode(userEmail+':'+userPassword));
      let response = await fetch('http://192.168.0.100:8080/v1/login', {
        method: 'POST',
        headers: headers,
      });
      if (!response.ok){
        setLoading(false);
        setIsModalVisible(true);
        return;  
      };
      let data = await response.json();
      await AsyncStorage.setItem(
        'token',
        data.token
      );
      setLoading(false);
      navigation.navigate('Сигнали');
    } catch (error) {
      setLoading(false);
      setUserEmail('');
      console.log(error);
      console.log("could not set email or pass");
    }
  };

  return (
    <View style={styles.mainBody}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{}}>
        <View style={{
          height: '10%',
          width: '80%',
          backgroundColor: 'red',
          borderRadius: 25,
          borderWidth: 2,
          borderColor: 'black',
          marginLeft: '10%',
        }}>
          <Text style={{
            fontSize: 15,
            paddingBottom: '2%',
            paddingTop: '8%',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>Грешен имейл или парола, моля опитайте отново</Text>
          </View></Modal>
      <Loader loading={loading} />
      <Text style={headerStyles.title}>Вход</Text>
      <View
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          // justifyContent: 'center',
          // alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}} />
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Въведи имейл" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Въведи парола" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Вход</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Регистрация')}>
              Нямате профил? Регистрирайте се!
            </Text>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#0a798d',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 13,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

const headerStyles = StyleSheet.create({
  title: {
    paddingTop: 60,
    paddingBottom: 20,
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#0a798d',
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
});
