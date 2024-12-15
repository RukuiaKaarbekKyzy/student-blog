import React from "react";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import MapView from "react-native-maps";


const AppFooter = () => {
  return (
    <View style={styles.container}>
      {/* Map View */}
      <Text style={styles.title}>Address</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.603738,
          longitude: -58.38157,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300, // Устанавливаем фиксированную высоту для компонента
    padding: 10,
    backgroundColor: "#fff", // Можно установить фон, чтобы избежать белого пространства
    borderRadius: 10,
  },
  map: {
    width: "100%",
    height: 200, // Устанавливаем фиксированную высоту для карты
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});
export default AppFooter;
