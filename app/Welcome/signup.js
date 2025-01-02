import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useRouter } from 'expo-router';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email")
    .label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 10 characters")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
    .label("Confirm Password"),
});

const Signup = () => {
  const router = useRouter();

  const handleSignup = async (values) => {
    try {
      const { email, password } = values;
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.push("/Dashboard") },
      ]);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("An account with this email already exists");
      } else {
        Alert.alert("Registration Failed", error.message);
      }
    }
  };

  return (
    <ImageBackground source={require('../../assets/login.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Create an Account</Text>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={handleSignup}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>

                <TextInput
                  style={[styles.input, touched.email && errors.email && styles.inputError]}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  style={[styles.input, touched.password && errors.password && styles.inputError]}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TextInput
                  style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.inputError]}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={() => router.push('/Welcome/login')}
                >
                  <Text style={styles.linkText}>Have an account? <Text style={styles.linkHighlight}>Login</Text></Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
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
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
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

export default Signup;
