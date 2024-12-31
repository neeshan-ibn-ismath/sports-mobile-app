import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Sports from '../../components/sports';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const Dashboard = () => {
  const { username } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContentRow}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Welcome, {username}</Text>
          </View>
        </View>
      </View>
      <Sports />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',  // Soft gray background
  },
  headerWrapper: {
    backgroundColor: '#AF8F55',  // New background color applied
    paddingVertical: 50,
    paddingHorizontal: 30,
    margin:20,
    borderRadius:10,
    alignItems: 'center',
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
    fontSize: 32,  // Larger, bold title for presence
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,  // Elegance through letter spacing
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginTop: 10,
  },
});
