import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Sports from '../../components/sports';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

const Dashboard = () => {
  const { username } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/NFLteams.png')} 
        style={styles.headerWrapper}
        imageStyle={styles.backgroundImage} 
      >

        <View style={styles.overlay} />
        <View style={styles.headerContentRow}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Welcome, {username}</Text>
            <Text style={styles.headerText}>Your personal NFL team catalogue</Text>
          </View>
        </View>
      </ImageBackground>
      <Sports />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', 
  },
  headerWrapper: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden', 
  },
  backgroundImage: {
    borderRadius: 10, 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18, 
    fontWeight: '800', 
    color: '#fff', 
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.5, 
  },
});
