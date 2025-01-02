import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useClicks } from '../context/clickContext';
import { FloatingCounter } from './floatingCounter';

import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Modal, 
  Pressable 
} from 'react-native';

const Sports = () => {
  const [nflTeams, setNflTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { incrementCount } = useClicks();

  useEffect(() => {
    fetchNflTeams();
  }, []);

  const fetchNflTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://nfl-api-data.p.rapidapi.com/nfl-team-listing/v1/data',
        {
          headers: {
            'x-rapidapi-host': 'nfl-api-data.p.rapidapi.com',
            'x-rapidapi-key': 'e5d7c12088msh67f20a907ad73a8p1a48bajsn55007b86ea7f',
          },
        }
      );
      setNflTeams(response.data.map((item) => item.team));
    } catch (error) {
      console.error('Error fetching NFL teams:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>NFL Teams</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading NFL teams...</Text>
        </View>
      ) : (
        <ScrollView style={styles.teamContainer}>
          <View style={styles.cardContainer}>
            {nflTeams.map((team, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  incrementCount();
                  setSelectedTeam(team); // Open modal with team details
                }}
                style={styles.cardWrapper}
              >
                <View style={styles.teamCard}>
                  <Image
                    source={{ uri: team.logos[0]?.href }}
                    style={styles.teamLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.teamName}>{team.displayName}</Text>
                  <Text style={styles.teamNickname}>{team.nickname}</Text>
                  <Text style={[styles.teamLocation, { color: `#${team.color}` }]}>
                    {team.location}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

<Modal
  visible={!!selectedTeam}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setSelectedTeam(null)} 
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Pressable
        style={styles.closeButton}
        onPress={() => setSelectedTeam(null)}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </Pressable>
      {selectedTeam && (
        <>
          <Image
            source={{ uri: selectedTeam.logos[0]?.href }}
            style={styles.modalTeamLogo}
            resizeMode="contain"
          />
          <Text style={styles.modalTeamName}>{selectedTeam.displayName}</Text>
          <Text style={styles.modalTeamNickname}>{selectedTeam.nickname}</Text>
          <Text style={styles.modalTeamLocation}>
            Location: {selectedTeam.location}
          </Text>
          <Text style={styles.modalTeamColor}>
            Team Color: #{selectedTeam.color}
          </Text>

          <View
            style={[
              styles.colorPreview,
              { backgroundColor: `#${selectedTeam.color}` },
            ]}
          />
        </>
      )}
    </View>
  </View>
</Modal>


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
  teamContainer: {
    marginBottom: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
  },
  cardWrapper: {
    width: '48%',
    height: 180,
    marginBottom: 50,
    marginRight: '2%', 
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  teamLogo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  teamNickname: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  teamLocation: {
    fontSize: 14,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTeamLogo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  modalTeamName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modalTeamNickname: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  modalTeamLocation: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalTeamColor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
