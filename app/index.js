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
                            <Text style={styles.appName}>National Football League</Text>
                        </View>

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
        width: '100%', 
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: height,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20, 
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20, 
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    appName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#EEDFA8',
        fontFamily: 'serif',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%', 
    },
    primaryButton: {
        width: '80%',
        marginBottom: 15, 
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    gradientButton: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,  
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
        marginBottom: 15, 
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10, 
    },
    secondaryButtonText: {
        color: '#EEDFA8',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default Home;
