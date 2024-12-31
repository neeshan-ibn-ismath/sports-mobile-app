import { useClicks } from "../context/clickContext";

import { 
    StyleSheet, 
    Text, 
    View
  } from 'react-native';
export const FloatingCounter = () => {
  const { clickCount } = useClicks();
  
  return (
    <View style={styles.floatingCounter}>
      <Text style={styles.counterText}>{clickCount}</Text>
      <Text style={styles.counterLabel}>Clicks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    infoValue: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    floatingCounter: {
      position: 'absolute',
      right: 20,
      bottom: 10,
      backgroundColor:'#AF8F55',
      width: 60,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    counterText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    counterLabel: {
      color: '#fff',
      fontSize: 12,
    },
  });
  
  