import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; 
import axios from 'axios';
import { useClicks } from '../context/clickContext';
import { FloatingCounter } from './floatingCounter';

import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Linking
} from 'react-native';

// Import additional icons if necessary, for example, FontAwesome icons
import { FontAwesome } from '@expo/vector-icons'; 

const Sports = () => {
    const [sportsData, setSportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { incrementCount } = useClicks();
  
    useEffect(() => {
      fetchSportsData();
    }, []);
  
    const fetchSportsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
        );
        
        // Assuming the response contains a list of leagues
        setSportsData(response.data.leagues);
      } catch (error) {
        console.error('Error fetching sports data', error);
      } finally {
        setLoading(false);
      }
    };

    const getSportIcon = (sport) => {
      switch(sport) {
        case 'Soccer':
          return <FontAwesome name="futbol-o" size={24} color="#666" />;
        case 'Basketball':
          return <Feather name="circle" size={24} color="#666" />;  // You can replace with any other icon
        case 'Baseball':
          return <FontAwesome name="baseball-ball" size={24} color="#666" />;
        case 'Tennis':
          return <FontAwesome name="tennis-ball" size={24} color="#666" />;
        default:
          return <Feather name="activity" size={24} color="#666" />;  // Default icon
      }
    };
    
  
    return (
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>Sports Leagues</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading sports leagues...</Text>
          </View>
        ) : (
          <ScrollView style={styles.sportContainer}>
            <View style={styles.cardContainer}>
              {sportsData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    incrementCount();
                    // This can be linked to a page with more details about the league
                    Linking.openURL(`https://www.thesportsdb.com/league/${item.idLeague}`);
                  }}
                  style={styles.cardWrapper}
                >
                  <View style={styles.sportCard}>
                    <View style={styles.sportHeader}>
                      {getSportIcon(item.strSport)} {/* Render the sport icon */}
                      <Text style={styles.sportSource}>{item.strLeague}</Text>
                    </View>

                    <Text style={styles.sportTitle}>{item.strLeagueAlternate || 'No alternate name'}</Text>
                    <Text style={styles.sportDescription}>
                      {item.strSport || 'Sport type not available'}
                    </Text>
                    <View style={styles.readMoreButton}>
                      {/* Only icon, no text */}
                      <Feather name="arrow-right" size={16} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
  
        <FloatingCounter />
      </View>
    );
  };

export default Sports;

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sportContainer: {
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow cards to wrap
    justifyContent: 'space-between', // Space cards evenly
  },
  cardWrapper: {
    width: '48%',  // Set each card width to 48% of the container (for 2 cards per row)
    marginBottom: 20,
  },
  sportCard: {
    backgroundColor: '#fff',
    borderRadius: 10,  // Reduced border radius for a more square-like appearance
    padding: 16,  // Adjusted padding for a cleaner appearance
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },  // Increased shadow height for depth
    shadowOpacity: 0.15,  // Subtle shadow
    shadowRadius: 6,  // Reduced shadow radius for sharper corners
    elevation: 6,  // Stronger shadow effect for a raised look
    height: 200,
  },
  sportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,  // Adjust the icon size if needed
    height: 30,
    borderRadius: 5,
    marginRight: 8, // Space between the image and the text
  },
  sportSource: {
    fontSize: 14,
    color: '#666',
  },
  sportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sportDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AF8F55',  // Updated color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',  // Move the icon to the right
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
