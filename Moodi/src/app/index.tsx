import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>✧Moodi✧</Text>
      <Text style={styles.text}>Are you a parent or a child?</Text>

      <Image
        source={require('../../assets/images/Moodi-mascot.png')}
        style={styles.image}
      />

      <Pressable style={({pressed}) => [styles.Button1, pressed && styles.pressed]}>
        <Link href="/focus_mode_starter" style={styles.ButtonText}>
          <Text style={styles.ButtonText}>I'm a Parent</Text>
        </Link>
      </Pressable>

      <Pressable style={({pressed}) => [styles.Button2, pressed && styles.pressed]}>
        <Text style={styles.ButtonText}>I'm a Child</Text>
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
    borderRadius: 100,
    marginBottom: 20,
  },
  header: {
    color: "#D58BF3",
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 70,
    textAlign: "center",
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
  Button2: {
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
});
