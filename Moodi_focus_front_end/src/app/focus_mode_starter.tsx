import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>✧Moodi✧</Text>
      <Text style={styles.text}>Enable Focus Mode for Your Child</Text> 

      <Image
        source={require('../../assets/images/Moodi-Shield.webp')} //image of moodi
        style={styles.image}
      />

        <Text style={styles.expText}>
            Child’s Device{'\n'}
            Focus Mode is <Text style={styles.off}>OFF</Text> 
        </Text>

      <Pressable onPress={() => router.navigate("/focus_mode")} style={({pressed}) => [styles.Button1, pressed && styles.pressed]}>
        <Text style={styles.ButtonText}>Turn On Focus Mode</Text> 
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30205D',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  header: {
    color: "#D58BF3",
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: "#fff",
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 70,
    textAlign: 'center',
  },
  Button1: {
    backgroundColor: '#411C86',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    width: '60%',
    alignItems: 'center',
    borderColor: '#A443EE',
    marginTop: 20,
  },
  pressed: {
    opacity: 0.5
  },
  ButtonText: {
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
    expText: {
    color: '#26165A',
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    borderColor: '#F3E4FF',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DFC4FB',
    borderRadius: 5,
  },
    off: {
    color: '#FF0000',
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    fontWeight: "bold",
  },
});
