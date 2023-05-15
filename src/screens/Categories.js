import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Platform} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import globalStyles from '../constants/GlobalStyle';
import { menuCategory } from '../constants/menuCategory';
import { useNavigation } from '@react-navigation/native';
import { CategoryCard } from '../components/CategoryCard';


const Categories = () => {
    const navigation=useNavigation()
    
  return (
    <View style={[globalStyles.background,tw`flex-1`]}>
      <View style={[tw`bg-[#f4f5f7] flex-1 mt-3`,styles.container]}>
       <View style={tw`flex-1 bg-white m-4 rounded-2xl`}>
       <FlatList
        showsHorizontalScrollIndicator={false}
        data={menuCategory}
        keyExtractor={(item)=>item.name}
        numColumns={3}
        renderItem={({item})=> <CategoryCard item={item} />}
        />
       </View>
      </View>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    container:{
        borderTopRightRadius:35,
        backgroundColor:"#f4f5f7",
        borderTopLeftRadius:35,
    }
})