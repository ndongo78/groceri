import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Animated } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
export const CategoriesWeb = ({ item }) => {
    const navigation = useNavigation();
    return (
        <View style={tw`items-center`}>
            <TouchableOpacity
                style={tw`bg-[#e9f7ef] shadow items-center justify-center rounded-xl mr-4 ml-4 mt-4 w-22 h-22 `}
                onPress={() => navigation.navigate("Articles", { name: item.name })}
            >
                <Image
                    source={item.icon.toString()}
                    alt={item.name}
                    style={tw`w-15 h-15 p-5`}
                />
            </TouchableOpacity>
            <Text style={tw`text-xl p-1 `}> {item.name} </Text>
        </View>
    );
};


