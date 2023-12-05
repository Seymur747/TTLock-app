
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  StatusBar,
  TextInput,
  Pressable, 
  Alert
} from 'react-native';
import { useLoginMutation } from '../store/api/api';
import { hashMd5 } from '../utils/hashMd5';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDatas } from '../store/slices/auth.slice';
// import {login as loginAction} from './../store/slices/auth.slice.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
    height:70,
    width:70
  },

  inputView: {
    backgroundColor: 'yellow',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    // width:100
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});




console.log(hashMd5('RoomShare2023!'))
function AuthScreen({ navigation }) {

  
  const [credentials,setCredentials] = useState({clientId:'19968d4cd33c44a5b3d6ad8899b55e74',clientSecret:'c6cb6d7989079958603eac19919ce78d',username:'partner11@rmshare.ru',password:'RoomShare2023!'})

  // const [credentials,setCredentials] = useState({clientId:'',clientSecret:'',username:'',password:''})
  const [login,{isError,isLoading}]= useLoginMutation();
  const dispatch = useDispatch()
  const handleLogin = () => {

    const isValidInputs = Object.values(credentials).every(v=>v!='')
    if(!isValidInputs){
      Alert.alert('Invalid input values')
      return
    }

    login({...credentials,password:hashMd5(credentials.password)})
      .then(({data}:any) => {
        if(data?.errcode){
          Alert.alert(data?.errmsg,data?.description)
        }
        else{
          const {access_token,refresh_token} = data
          dispatch(setUserDatas({...credentials,access_token,refresh_token}))
          navigation.navigate('LockList')
        }
      })
      .catch((error) => {
        console.error('Login error', error);
      });
  };

  

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logo-white.png')}
      />
      <View style={styles.inputView}>
        <TextInput
          style={{...styles.TextInput,borderColor:'red'} }
          placeholder="Client id"
          placeholderTextColor="#003f5c"
          value={credentials.clientId}
          id='name'
          onChangeText={clientId => setCredentials({...credentials,clientId})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Client secret"
          placeholderTextColor="#003f5c"
          value={credentials.clientSecret}
          onChangeText={clientSecret => setCredentials({...credentials,clientSecret})}    
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          value={credentials.username}
          onChangeText={username => setCredentials({...credentials,username})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={credentials.password}
          onChangeText={password => setCredentials({...credentials,password})}
        />
      </View>
      <Pressable onPress={handleLogin} style={styles.loginBtn}>
      <Text style={styles.text}>Login</Text>
    </Pressable>
    </View>
  );
}



export default AuthScreen;
