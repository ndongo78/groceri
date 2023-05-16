import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, {useState, useRef, useEffect, useContext} from "react";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {cartContext} from "../context/CartProvider";

export const CardHome = ({ item, index, scrollX }) => {
  const navigation = useNavigation();
  const inputRange = [1, 5];
  const outputRange = [1, 0.8];
  const [isClicked, setIsClicked] = useState(true);
  const {addCart} = useContext(cartContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scalRef = useRef(new Animated.Value(0)).current;
  const scale = fadeAnim.interpolate({ inputRange, outputRange });
  const translateY = scrollX.interpolate({
    inputRange: [index * 200, (index + 1) * 220 - 1],
    outputRange: [0, 200],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View
      style={[
        tw`bg-[#e9f7ef] shadow   rounded-xl m-3  w-40 h-57 mb-10 `,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Pressable
       onPress={() => navigation.navigate("Details", { item: item })}
      >
        <Image
          source={item.image.toString()}
          alt={item.name}
          style={tw`w-30 h-32 p-5 self-center`}
          resizeMode="contain"
        />
        <Text style={tw`text-xl ml-2 font-bold m-2`}> {item.name} </Text>
        <Text style={tw`text-sm ml-2 opacity-60`}>
          {" "}
          {item.price}€/{item.poids}{" "}
        </Text>
        <View style={tw`flex-row items-center justify-between items-center`}>
          <Text style={tw`text-[4] text-[#3B984B] ml-2 font-bold m-2`}>
            {" "}
            {item.price}€{" "}
          </Text>
          <TouchableOpacity style={[tw`bg-[#2b6]`, styles.btn]} onPress={()=> {
            addCart(item)
            setIsClicked(false)
          }}>
            {
              isClicked ? <Icon name="add-outline" style={tw`p-3 text-white font-bold `} />:<Icon  name="checkmark-circle" style={tw`p-2 text-[#fff]`}  />
            }
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderTopLeftRadius: 15,
  },
});
