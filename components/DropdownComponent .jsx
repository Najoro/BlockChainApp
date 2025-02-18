import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageTextCard from "@/navigation/screens/HomeContent/ImageTextCard";

const data = [
  {
    label: "CRYPTO",
    image:
      "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreidbtcki227qnikxjnj4jz6i34eso6vml6xtaquvdtszi23purydt4",
  },
  {
    label: "BT",
    image:
      "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreihaxcjvq6ugz5msv4axd5g6sh5jerxxfowhphdsucz2y4kabtvl5y",
  },
  {
    label: "PT",
    image:
      "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreidbtcki227qnikxjnj4jz6i34eso6vml6xtaquvdtszi23purydt4",
  },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={500}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => {
          setValue(item.value);
          setSelectedItem(item);
          setIsFocus(false);
        }}
        renderItem={(item) => (
          <View>
            <ImageTextCard
              imageSource={{
                uri: item.image,
              }}
              title={item.label}
              description=""
            />
          </View>
        )}
        // renderItem={(item) => {
        // //   <ImageTextCard imageSource={item.image} title={item.label} description={""} />;

        // }}
        flatListMode
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
