import {StyleSheet, Text, Animated, View, FlatList, TouchableOpacity, Pressable, Image, Platform} from 'react-native'
import React, { useContext ,useRef,useEffect,useState} from 'react'
import tw from 'twrnc';
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"
import { cartContext } from '../context/CartProvider';
import LottieView from "lottie-react-native";


export const CardItems = ({item,index,scrollX}) => {
  const [isClicked, setIsClicked] = useState(false);
  const animation = useRef(null);
    const navigation=useNavigation()
    const inputRange = [1, 5];
    const outputRange = [1, 0.8];
    const {addCart}=useContext(cartContext);
    
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scalRef = useRef(new Animated.Value(0)).current
    const scale = fadeAnim.interpolate({inputRange, outputRange});
   
    useEffect(() => {
      if (animation.current && isClicked) {
          animation.current.play(15, 150);
      }
  }, [animation,isClicked]);
  
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
        tw`bg-[#e9f7ef] shadow   rounded-xl m-3  w-38 ${Platform.OS ==="web" && "w-[220px]"} `,
        {
          opacity: fadeAnim,
          transform: [{ scale }],
        },
      ]}
    >
      <Pressable
          onPress={() => navigation.navigate("Details", { item: item })}
      >
        <Image
          source={item.image}
          alt={item.name}
          style={tw`w-30 h-32 p-5 self-center`}
          resizeMode="contain"
        />
        <Text style={tw`text-xl ml-2 font-bold m-2`}> {item.name} </Text>
        <Text style={tw`text-sm ml-2 opacity-60`}>
          {" "}
          {item.price}€/{item.poids}{" "}
        </Text>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-[4] text-[#3B984B] ml-2 font-bold m-2`}>
            {" "}
            {item.price}€{" "}
          </Text>
          {
                isClicked ?
                    (
                        <LottieView
                            loop={false}
                            ref={animation}
                            source={require('../../assets/json.json')}
                            style={[styles.btn,tw`self-end items-end ml-15`]}
                        />
                    )
                    :
                    (
                      <TouchableOpacity style={[tw`bg-[#2b6]`, styles.btn]} onPress={()=>{
                          setIsClicked(true)
                          addCart(item)
                        }
                      }>
                      <Icon name="add-outline" style={tw`p-3 text-white font-bold `} />
                    </TouchableOpacity>
                    )
            }
          
        </View>
      </Pressable>
    </Animated.View>
  );
};

 

const styles = StyleSheet.create({
    btn:{
        borderTopLeftRadius:15,
        alignSelf:"flex-end"
    }
});
