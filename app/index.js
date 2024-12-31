import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/league.png')}
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
                    style={styles.overlay}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.appName}>SportVision</Text>
                        </View>

                        <Text style={styles.tagline}>Your Gateway to Global Sports Leagues.</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => { router.push("/Welcome/login"); }}
                            >
                                <Text style={styles.secondaryButtonText}>Login</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => { router.push("/Welcome/signup"); }}
                            >
                                <LinearGradient
                                    colors={['#AF8F55', '#EEDFA8']}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.buttonText}>Sign up</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',  // Ensures the container spans the full width of the screen
    },
    backgroundImage: {
        flex: 1,
        width: '100%',  // Ensures the background image covers the full width
        height: height,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  // Full width for the overlay
        paddingHorizontal: 20, // Adds padding on the sides for better content alignment
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,  // Adjusted padding for better spacing on small screens
        paddingVertical: 40,     // Adjusted for better vertical spacing
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    appName: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#EEDFA8',
        fontFamily: 'serif',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    tagline: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 30,  // Reduced margin for better use of screen space
        lineHeight: 26,
        textAlign: 'center', // Centers the tagline text
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%',  // Full width for button container
    },
    primaryButton: {
        width: '80%',
        marginBottom: 15,  // Added a smaller margin for better spacing between buttons
        borderRadius: 10,  // Updated radius to 10
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    gradientButton: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,  // Updated radius to 10
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondaryButton: {
        width: '80%',
        borderWidth: 2,
        borderColor: '#EEDFA8',
        marginBottom: 15,  // Reduced margin to balance the layout
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,  // Updated radius to 10
    },
    secondaryButtonText: {
        color: '#EEDFA8',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default Home;
