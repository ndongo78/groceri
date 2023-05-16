import { StyleSheet, Text, Animated,View ,FlatList,TouchableOpacity,Pressable,Image} from 'react-native'
import React, { useState ,useContext,useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { articles } from '../constants/Articles'
import tw from 'twrnc';
import globalStyles from '../constants/GlobalStyle';
import { CardItems } from '../components/CardItems';
import { cartContext } from '../context/CartProvider';
import { CartCard } from '../components/CartCard';

const CartScreen = () => {
    const navigation=useNavigation()
    const {cart}=useContext(cartContext)
   const totals=cart.reduce((acc,item)=>acc+item.price,0)

    useEffect(() => {
      navigation.addListener('focus', () => {
           navigation.setOptions({
            title: "Panier",
           })
           
            
        });
    
      }, [navigation]);
     

  return (
    <View style={[globalStyles.background,tw`flex-1`]}>
        <View style={[tw`bg-[#f4f5f7] flex-1 mt-3`,styles.container]}>
       <View style={tw`flex-1  bg-white m-4 rounded-2xl mb-35`}>
        {
          cart.length > 0 ?
          <FlatList
       showsVerticalScrollIndicator={false}
        data={cart}
        keyExtractor={(item)=>item.name}
        renderItem={({item})=><CartCard item={item}  />}
       />
       :
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={tw`text-2xl font-bold`}>Votre panier est vide</Text>
        </View>
        }
    </View>
       {
        totals != 0 && (
          <View style={[tw`justify-end h-45 w-full bg-[#e9f7ef] absolute bottom-0`,styles.bottomCard]}>
          <View style={tw`flex-row mb-27 justify-around`}>
          <Text style={tw`text-2xl font-bold`}>Total: {totals}€</Text>
          <TouchableOpacity style={tw`bg-[#2b6] items-center justify-center rounded-md`}>
           <Text style={tw`text-white p-3 font-bold`}>Player ma commande {'>>'} </Text>
          </TouchableOpacity>
          </View>
         </View>
        )
       }
    </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    container:{
      backgroundColor:"#e9f7ef",
      borderTopRightRadius:35,
      borderTopLeftRadius:35,
    },
    btn:{
        borderTopLeftRadius:15,
    },
    bottomCard:{
      borderTopRightRadius:35,
      borderTopLeftRadius:35,
    }
})