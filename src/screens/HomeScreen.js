import React,{useRef,useState,useEffect} from 'react';
import {Platform, View, StatusBar, Text, TextInput, StyleSheet, TouchableOpacity, FlatList ,Image ,Animated,ScrollView} from "react-native";
import tw from 'twrnc';
import globalStyles from "../constants/GlobalStyle";
import {menuCategory} from "../constants/menuCategory";
import { useNavigation } from '@react-navigation/native';
import { HeaderComponent } from '../components/Header';
import { Deal } from '../components/Deal';
import { PromoCard } from '../components/PromoCard';
import { articles } from '../constants/Articles';
import { CardHome } from '../components/CardHome';
import header from "@react-navigation/stack/src/views/Header/Header";

const  HomeScreen=()=> {
   const scrollX = useRef(new Animated.Value(0)).current;
   const navigation=useNavigation()
   const [popularItems,setPopularItems]=useState(articles.map(item=>item.note >=4))
   const scrollY = useRef(new Animated.Value(0)).current;
  
   const renderItem=({item, index})=>{
    const translateY = scrollY.interpolate({
        inputRange: [index * 200, (index + 1) * 220 - 1],
        outputRange: [0, 200],
        extrapolate: 'clamp',
      });
   return (
   <Animated.View style={[tw`items-center ml-6`,{transform: [{ translateY }] }]}>
    <TouchableOpacity
        style={tw`bg-[#e9f7ef] shadow items-center justify-center rounded-xl mr-4 ml-4 mt-4 w-25 h-22 `}
        onPress={() => navigation.navigate("Articles", { name: item.name })}
    >
        <Image
        source={item.icon.toString()}
        alt={item.name}
        style={tw`w-15 h-15 p-5`}
        />
    </TouchableOpacity>
    <Text style={tw`text-xl p-1 `}> {item.name} </Text>
    </Animated.View>
   )
}

   
    return (
        <View style={[tw`flex-1`,globalStyles.background,{paddingTop:Platform.OS ==="android" ? StatusBar.currentHeight :0}]}>
             <HeaderComponent/>
            <View style={[tw`flex-1 bg-white mt-10`,styles.container]}>
            <Animated.ScrollView
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
              scrollEventThrottle={16}
            >
                <View style={tw`bg-white w-[93%] h-50 self-center mt-7 rounded-xl`}>
                 <View>
                    <View style={tw`flex-row justify-between`}>
                        <Text style={tw`text-xl font-bold m-2`}>Categories</Text>
                        <TouchableOpacity  style={tw` text-blue-400 m-2`} onPress={()=>navigation.navigate("Categories")} disabled={Platform.OS === "web"}>
                            <Text style={tw` text-blue-400 m-2`}>Voir plus</Text>
                        </TouchableOpacity>
                    </View>
                       <Animated.FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={menuCategory}
                        keyExtractor={(item)=>item.name+Math.round()}
                        renderItem={renderItem}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollY } } }],
                            { useNativeDriver: true },
                          )}
                          scrollEventThrottle={16}
                       />
                    </View>
                </View>
               <PromoCard />
               <View style={tw`bg-white w-[95%] rounded-2xl  self-center mb-15`}>
                <Deal />
                <Text style={tw`text-xl font-bold m-2 p-2`}>Produits les mieux notés</Text>
                <>
                <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={articles}
                keyExtractor={(item)=>item.name+Math.round()}
                renderItem={({item,index})=>item.note >= 4 && <CardHome item={item} index={index} scrollX={scrollX}/>}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true },
                  )}
                  scrollEventThrottle={16}
                />
                </>
                </View>
                
        </Animated.ScrollView>
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        borderTopRightRadius:40,
        backgroundColor:"#f4f5f7",
        borderTopLeftRadius:40,
    }
})