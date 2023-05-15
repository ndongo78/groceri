import { StyleSheet, Text, Animated,View ,TouchableOpacity,Image, Alert} from 'react-native'
import React, { useContext ,useRef,useEffect,useState} from 'react'
import tw from 'twrnc';
import Icon from "react-native-vector-icons/Ionicons"
import { cartContext } from '../context/CartProvider';


export const CartCard = ({item,index,scrollX}) => {
  const [isClicked, setIsClicked] = useState(false);
  const {
    addQty,
    removeQty,
    deleteItem
  }=useContext(cartContext);
 

    const inputRange = [1, 5];
    const outputRange = [1, 0.8];
    
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scalRef = useRef(new Animated.Value(0)).current
    const scale = fadeAnim.interpolate({inputRange, outputRange});


  
      useEffect(() => {
          Animated.timing(
              fadeAnim,
              {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
              }
          ).start();
      }, [fadeAnim])
  return (
    <Animated.View 
    style={[
        tw`bg-[#fff] shadow   rounded-xl m-3  w-[90%] `,
        {
          opacity: fadeAnim,
          transform: [{ scale }],
        },
      ]}
    >  
     
      <View style={tw`p-3`}>
      <View style={tw`self-end  absolute right-2`}>
      <TouchableOpacity onPress={()=>deleteItem(item)}>
      <Icon  name="md-trash-outline" size={25} style={tw`text-red-600`} />
      </TouchableOpacity>
     </View>
        <View style={tw`flex-row items-center justify-between`}>
         <View style={tw`flex-row`}>
         <Image source={item.image} style={tw`w-25 h-25`} resizeMode='contain' />
          <View style={tw`mt-3 ml-4`}>
          <Text style={tw`text-xl font-bold`}> {item.name} </Text>
          <Text style={tw`opacity-30  mt-1`}> {item.price}/{item.poids} </Text>
          <Text style={[tw`mt-1  text-xl font-bold`,{color:"#2b6"}]}> {item.price} €</Text>
          </View>
         </View>
         <View style={tw`items-end mt-10 items-center`}>
           <TouchableOpacity onPress={()=>addQty(item)}>
            <Icon name="add-outline" size={25} />
           </TouchableOpacity>
           <Text style={[tw`bg-[#2b6] text-white font-bold items-center w-8 h-8 p-2 rounded-full self-center`,{textAlign:'center'}]}> {item.qty} </Text>
           <TouchableOpacity onPress={()=>removeQty(item)}>
            <Icon name="remove-outline" size={25} />
           </TouchableOpacity>
         </View>
        </View>

      </View>

    </Animated.View>
  );
};

 

const styles = StyleSheet.create({
    btn:{
        borderTopLeftRadius:15,
        alignSelf:"flex-end"
    }
});
