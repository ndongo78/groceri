import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';

export const PromoCard = () => {
  return (
    <View style={tw`bg-[#bee7cf] m-4 rounded-xl`}>
    <View style={tw`flex-row w-50`}>
        <Image source={require("../../assets/des-legumes.png")} style={tw`w-25 h-25 m-2`} alt={"item"} />
        <View>
            <Text style={tw`text-xl font-bold text-center mt-1 text-[#096920]`}>20% de remise sur les légumes</Text>
            <Text style={tw`text-sm font-bold text-center mt-1 text-[#096950]`}> offre valable jusq'a demain apres-midi</Text>
        </View>
    </View>
    <TouchableOpacity style={tw`self-center mb-2`}>
        <Text style={tw`text-xl font-bold text-center mt-1 text-[#096920]`}>Acheter</Text>
    </TouchableOpacity>
</View>
  )
}



const styles = StyleSheet.create({})