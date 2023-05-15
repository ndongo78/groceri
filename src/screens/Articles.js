import {StyleSheet, Text, Animated, View, FlatList, TouchableOpacity, Pressable, Image, Platform} from 'react-native'
import React, { useState ,useRef,useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { articles } from '../constants/Articles'
import tw from 'twrnc';
import globalStyles from '../constants/GlobalStyle';
import { CardItems } from '../components/CardItems';

const Articles = () => {
    const navigation=useNavigation()
    const route=useRoute()
    const [listItems,setListItems]=useState(articles)
    const {name}=route.params;
   

    useEffect(() => {
      navigation.addListener('focus', () => {
           navigation.setOptions({
            title: name,
           })
            const listBy=listItems.filter(item=> item.category.toLowerCase() === name.toLowerCase())
            setListItems(listBy)
            
        });
    
      }, [navigation]);
     

  return (
    <View style={[globalStyles.background,tw`flex-1`]}>
        <View style={[tw`bg-[#f4f5f7] flex-1 mt-3`,styles.container]}>
       <View style={tw`flex-1  bg-white m-4 rounded-2xl`}>
      <FlatList
       showsVerticalScrollIndicator={false}
        data={listItems}
        keyExtractor={(item)=>item.name}
        renderItem={({item})=><CardItems item={item}  />}
        numColumns={Platform.OS ==="web"? 6:2}
       />
    </View>
    </View>
    </View>
  )
}

export default Articles

const styles = StyleSheet.create({
    container:{
        borderTopRightRadius:35,
        backgroundColor:"#f4f5f7",
        borderTopLeftRadius:35,
    },
    btn:{
        borderTopLeftRadius:15,
    }
})