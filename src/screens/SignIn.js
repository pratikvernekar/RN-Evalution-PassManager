
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Buttons} from '../components/Buttons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn1 = ({navigation}) => {
  const loginValidationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(/(\d){10}\b/, 'Enter a valid Mobile Number')
      .required('Mobile Number is Required'),
    pin: yup
      .string()
      .min(4, ({min}) => `Mpin must be at least ${min} characters`)
      .max(4, ({max}) => `Mpin must be at least ${max} characters`)
      .required('Mpin is required'),
  });
  return (
    <LinearGradient
      colors={['#20BBFF', '#0E85FF']}
      style={styles.linearGradient}>
      <View style={styles.main}>
        <View style={styles.loginContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{mobile: '', pin: ''}}
            onSubmit={async values => {
              try {
                const jsonValue = await AsyncStorage.getItem(values.mobile);
                if (jsonValue != null) {
                  parseValue = JSON.parse(jsonValue);
                  console.log(parseValue);
                  if (
                    values.mobile === parseValue.mobile &&
                    values.pin === parseValue.pin
                  ) {
                    console.log('LOGIN SUCCESS');
                    navigation.navigate('PASS MANAGER');
                  } else {
                    alert('Wrong Mobile Number or Mpin');
                  }
                }
              } catch (err) {
                console.log(err);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <TextInput
                  name="mobile"
                  placeholder="   Mobile Number"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                />
                {errors.mobile && touched.mobile && (
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                )}
                <TextInput
                  name="pin"
                  placeholder="   Mpin"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  onChangeText={handleChange('pin')}
                  onBlur={handleBlur('pin')}
                  secureTextEntry
                  value={values.pin}
                />
                <Image
                  source={require('../images/02/Group/Password/eye/eyeon.png')}
                  style={styles.imgEye}
                />

                {errors.pin && touched.pin && (
                  <Text style={styles.errorText}>{errors.pin}</Text>
                )}
                <Text style={styles.forgotText}>Forgot your password?</Text>
                <View style={styles.button}>
                  <Buttons onPress={handleSubmit} name="SIGN IN" />
                </View>
              </>
            )}
          </Formik>
          <Image
            source={require('../images/02/fingerprint.png')}
            style={styles.imgFinger}
          />
          <View style={styles.bottonText}>
            <Text style={styles.textOR}>OR</Text>
            <Text style={styles.bottomText}>USE YOUR FINGERPRINT TO LOGIN</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    height: 54,
    width: 300,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    color: 'black',
    marginBottom: 30,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  forgotText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 155,
    width: 147,
    height: 17,
  },
  button: {
    marginTop: 40,
    marginRight: 170,
  },
  linearGradient: {
    flex: 1,
  },
  imgFinger: {width: 52.31, height: 54, marginTop: 150},
  bottonText: {
    flexDirection: 'row',
    marginTop: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imgEye: {width: 24, height: 15, left: 125, bottom: 63},
  textOR: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    height: 24,
    width: 40,
  },
  bottomText: {
    fontSize: 13,
    lineHeight: 25,
    color: '#FFFFFF',
    height: 21,
    width: 219,
  },
});

export default SignIn1;
