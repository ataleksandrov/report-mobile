import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import Loader from '../components/loader';

const Signup = (props: {navigation: {navigate: (arg0: string) => void}}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userName) {
      alert('Моля въведете име');
      return;
    }
    if (!userEmail) {
      alert('Моля въведете имейл');
      return;
    }
    if (!userPassword) {
      alert('Моля въведете парола');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      "username": userName,
      "email": userEmail,
      "password": userPassword,
    };
    try {
    let response = await fetch('http://192.168.0.100:8080/v1/users', {
        method: 'POST',
        body: JSON.stringify(dataToSend) 
    });
    if (!response.ok){
      setLoading(false);
      setUserEmail('');
      setUserPassword('');
      return;  
    };
    setLoading(false);
    setIsRegistraionSuccess(true);
  }catch (error) {
    setLoading(false);
    setUserEmail('');
    setUserPassword('');
    console.log(error);
    console.log("could not set email or pass");
  }
  };

  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0a798d',
          justifyContent: 'center',
        }}>
        {/* <Image
          source={require('../assets/background.jpeg')}
          style={{
            width: '50%',
            height: '25%',
            resizeMode: 'contain',
            margin: 30,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        /> */}
        <Text style={styles.successTextStyle}>Успешна регистрация!</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Вход')}>
          <Text style={styles.buttonTextStyle}>Вход</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#0a798d'}}>
      <Loader loading={loading} />
      <Text style={headerStyles.title}>Регистрация</Text>
      <View
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Въведи име"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Въведи имейл"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Въведи парола"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Регистрация</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
    borderColor: '#dadae8',
    height: 50,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
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
