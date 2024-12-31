import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

      Alert.alert("Success", "Login successful", [
        { text: "OK", onPress: () => router.push('/Dashboard') }
      ]);
    } catch (error) {
      console.error("Login error", error);
      let errorMessage = "Login error";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "User does not exist";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid credentials";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <ImageBackground source={require('../../assets/login.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <View style={styles.titleContainer}>
           
            <Text style={styles.title}>Login</Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <TextInput
                  style={[styles.input, touched.email && errors.email && styles.inputError]}
                  placeholder="Email"
                  placeholderTextColor="#B5B5B5"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  style={[styles.input, touched.password && errors.password && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor="#B5B5B5"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={() => router.push('/Welcome/signup')}
                >
                  <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Get Started</Text></Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formWrapper: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#AF8F55',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#AF8F55',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#AF8F55',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#666',
  },
  linkHighlight: {
    color: '#AF8F55',
    fontWeight: 'bold',
  },
});

export default Login;
