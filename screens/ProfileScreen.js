import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Profile Screen
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  text: {
    fontSize: 24, 
    fontWeight: "600", 
    color: "gray"
  }
});
