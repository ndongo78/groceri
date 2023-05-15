import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from "react-native";
import React from "react";
import { plans } from "../constants/Plans";
import tw from 'twrnc';

export const Deal = () => {
  return (
    < >
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-xl font-bold m-2 p-2`}>Les bons plans</Text>
        <TouchableOpacity style={tw` text-blue-400 m-2`}>
          <Text style={tw` text-blue-400 m-2`}>Voir plus</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={plans}
          keyExtractor={(item) => item.image}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`w-50 h-40 mb-6 shadow ml-5 bg-[#e9f7ef] items-center justify-center rounded-2xl`}
            >
              <Image
                source={item.image}
                style={tw`w-55 h-30 m-4 `}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};



const styles = StyleSheet.create({});
