import React from "react";
import { Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MenuIcon = ({ iconLibrary: IconLibrary, iconName, label }) => {
  return (
    <View style={styles.flexCenter}>
      <View style={styles.icone}>
        <IconLibrary name={iconName} size={30} color="white" />
      </View>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

function Home() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sol}>$27,852</Text>
        </View>
        <View style={styles.menu}>
          <MenuIcon
            iconLibrary={Feather}
            iconName="arrow-down-left"
            label="Receive"
          />
          <MenuIcon
            iconLibrary={Feather}
            iconName="arrow-up-right"
            label="Send"
          />
          <MenuIcon
            iconLibrary={Feather}
            iconName="refresh-cw"
            label="Exchange"
          />
          <MenuIcon
            iconLibrary={FontAwesome}
            iconName="money"
            label="Cash out"
          />
        </View>
       

      </View>
    </>
  );
}

export default Home;

const styles = {
  container: {
    flex: 1 / 3,
    backgroundColor: "#3674B5",
    justifyContent: "space-around",
    
  },
  text: {
    color: "white",
    fontSize: 20,
    marginTop: 5,
  },
  header: {
    // backgroundColor :"red",
    justifyContent: "center",
    alignItems: "center",
  },
  sol: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  icone: {
    backgroundColor: "#578FCA",
    width: 70,
    height: 70,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    flex: 1 / 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
};
