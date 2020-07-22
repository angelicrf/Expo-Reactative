import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPost } = useContext(Context);

  useEffect(() => {
    getBlogPost();
    const listner = navigation.addListener("didFocus", () => {
      getBlogPost();
    });
    return () => {
      listner.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={txt => txt.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
IndexScreen.navigationOptions = ({ navigation }) => {
  //console.log(props);
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    )
  };
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});
export default IndexScreen;
