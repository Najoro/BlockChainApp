import React, { useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const TabsView = ({ routes, sceneMap }) => {
  const [index, setIndex] = useState(0);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((_, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap(sceneMap)}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    // paddingTop: StatusBar.currentHeight,
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: "bold",
    fontSize: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
  },
});

export default TabsView;
