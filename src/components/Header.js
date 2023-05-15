import React from "react";
import {Platform, View, StatusBar, Text, TextInput, StyleSheet, TouchableOpacity, FlatList ,Image ,Animated,ScrollView} from "react-native";
import tw from 'twrnc';
import globalStyles from "../constants/GlobalStyle";
import {Avatar, Searchbar} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";


export const HeaderComponent = () => {
  return (
    <>
      <View style={[tw`flex-row justify-between items-center mt-5`]}>
        <View style={tw`ml-2`}>
          <Text style={[tw`text-2xl text-white`]}>Heureux 😊 de</Text>
          <Text style={[tw`text-2xl text-white`]}>vous revoir</Text>
        </View>
        <View style={tw`mr-3`}>
          <Avatar.Image source={{ uri: "https://picsum.photos/500" }} />
        </View>
      </View>
      <View style={styles.searchSection}>
        <Searchbar
          style={styles.input}
          placeholder="rechercher un article"
          onChangeText={(searchString) => {
            this.setState({ searchString });
          }}
          underlineColorAndroid="transparent"
        />
      </View>
    </>
  );
};



const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width:"80%",
        alignSelf: 'center',
        marginTop:30,
        borderRadius:15
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius:15
    },

});
