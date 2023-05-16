import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, Platform,
} from "react-native";
import React, {useContext, useState ,useRef,useEffect} from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import { Pressable,Animated,FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import { articles } from "../constants/Articles";
import { cartContext } from "../context/CartProvider";
import LottieView from "lottie-react-native";

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [isDetail, setIsDetail] = useState("Detail");
  const [similar, setsimilar] = useState([])
  const [isClicked, setIsClicked] = useState(false);
  const {addCart}=useContext(cartContext);

//    console.log("first",route)
const animation = useRef(null);
    useEffect(() => {
      if (animation.current && isClicked) {
          animation.current.play(15, 150);
      }
      setTimeout(()=>{
        setIsClicked(false);
      },10000)
  }, [animation,isClicked]);

   const fadeAnim = useRef(new Animated.Value(0)).current
  
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
   
    React.useEffect(() => {
      navigation.addListener('focus', () => {
       
        const produc=articles.filter(article =>article.note === item.note && article.category === item.category)
        setsimilar(produc)
        });
      }, [navigation]);
      //console.log("listItems: " + listItems)
      const renderItem=({item,index})=>(
        <Pressable onPress={()=>navigation.navigate('Detail',{item:item})}>
         <Animated.View   
         style={[tw`bg-[#e9f7ef] shadow   rounded-xl m-3  w-38 `,
         {
            opacity: fadeAnim,
            transform: [
                {
                translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
            }
        ]

        }
        ]}
         >
           <Image 
           source={item.image} 
           alt={item.name} 
            style={
                tw`w-30 h-32 p-5 self-center`
                }
            resizeMode="contain"
            />
            <Text style={tw`text-xl ml-2 font-bold m-2`}> {item.name} </Text>
            <Text style={tw`text-sm ml-2 opacity-60`}> {item.price}€/{item.poids} </Text>
             <View style={tw`flex-row items-center justify-between`}>
             <Text style={tw`text-[4] text-[#3B984B] ml-2 font-bold m-2`}> {item.price}€ </Text>
             <TouchableOpacity style={[tw`bg-[#2b6]`,styles.btn]}>
                <Icon name='add-outline'  style={tw`p-3 text-white font-bold text-xl`} />
             </TouchableOpacity>
             </View>
           
           </Animated.View>
           </Pressable>
           )


  return (
    <View style={tw`flex-1 bg-[#e9f7ef]`}>
        <TouchableOpacity style={tw`m-4`} onPress={()=>navigation.goBack()}>
            <Icon name="md-chevron-back-outline" style={tw`ml-1`} size={35} color={"#000"} />
        </TouchableOpacity>
      <View style={tw` ${Platform.OS ==="web" && " mb-10 justify-center items-center self-center bg-[#e9f7ef]"}`}>
          <Image
              source={item.image}
              style={tw`absolute top-[-18] w-80 h-85 mt-3 `}
              resizeMode="contain"
          />
      </View>
      <View style={[tw` flex-1 mt-50`, styles.container]}>
        <ScrollView>
        <View style={tw`bg-white m-4 rounded-2xl items-center ${Platform.OS ==="web" && "w-86 self-center"}`}>
          <View style={tw`self-center`}>
            <Text style={tw`text-xl ml-2 font-bold m-1`}> {item.name} </Text>
            <Text style={tw`text-sm ml-2 opacity-60`}>
              {" "}
              {item.price}€/{item.poids}{" "}
            </Text>
          </View>
          <View style={tw`flex-row items-center justify-around w-90`}>
            <Text style={tw`text-xl ml-4`}> {item.price}€ </Text>
            <Text style={tw`text-xl ml-5`}> 15 calories </Text>
            <View style={tw`flex-row items-center ml-3`}>
              <Icon name="star-half" size={25} />
              <Text> {item.note} (100) </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`bg-[#2b6] m-2 rounded-full`}>
              <Icon name="add-outline" size={25} style={tw`p-1 text-white`} />
            </TouchableOpacity>
            <Text style={tw`p-1 text-2xl`}>1</Text>
            <TouchableOpacity style={tw`bg-[#2b6] m-2 rounded-full`}>
              <Icon
                name="remove-outline"
                size={25}
                style={tw`p-1 text-white`}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw` m-4 rounded-2xl items-center h-67`}>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              style={tw`mr-20`}
              onPress={() => setIsDetail("Detail")}
            >
              <Text style={tw`text-xl`}>Details</Text>
              {isDetail === "Detail" && (
                <View style={tw`border border-orange-600 rounded-xl m-1`} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={tw``} onPress={() => setIsDetail("Avis")}>
              <Text style={tw`text-xl`}>Avis</Text>
              {isDetail === "Avis" && (
                <View style={tw`border border-orange-600 rounded-xl m-1`} />
              )}
            </TouchableOpacity>
          </View>
          <View style={tw`bg-[#2b6] rounded-xl h-55 items-center justify-center`}>
            {isDetail === "Detail" ? (
              <View style={tw`w-96`}>
                  <Text style={tw`text-2xl ml-3`}>Description</Text>
                  <Text style={tw`text-[5] text-white p-2`}> {item.descript} </Text>
              </View>
            ) : (
              <>
                <View style={tw`w-90 flex-row items-center`}>
                  <View style={tw`w-90 flex-row`}>
                    <Avatar.Image
                      source={{ uri: "https://picsum.photos/500" }}
                      style={tw`m-1`}
                      size={50}
                    />
                    <View style={tw`ml-1`}>
                      <Text style={tw`text-xl font-bold`}>John Doe</Text>
                      <View style={tw`flex-row justify-between w-70`}>
                        <View style={tw`flex-row`}>
                          <Icon name="star" size={20} color="orange" />
                          <Icon name="star" size={20} color="orange" />
                          <Icon name="star" size={20} color="orange" />
                        </View>
                        <Text style={tw`text-white opacity-80`}>
                          01/01/2022
                        </Text>
                      </View>
                      <View style={tw`w-75`}>
                        <Text style={tw`font-bold p-2 `}>
                          il est prêt ou que la mise en page est achevée.
                          Généralement, on utilise un texte{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* avis 2 */}
                <View style={[tw`m-2`, styles.divider]} />
                <View style={tw`w-90 flex-row items-center`}>
                  <View style={tw`w-90 flex-row`}>
                    <Avatar.Image
                      source={{ uri: "https://picsum.photos/500" }}
                      style={tw`m-1`}
                      size={50}
                    />
                    <View style={tw`ml-1`}>
                      <Text style={tw`text-xl font-bold`}>Bob </Text>
                      <View style={tw`flex-row justify-between w-70`}>
                        <View style={tw`flex-row`}>
                          <Icon name="star" size={20} color="orange" />
                          <Icon name="star" size={20} color="orange" />
                          <Icon name="star" size={20} color="orange" />
                          <Icon name="star" size={20} color="orange" />
                        </View>
                        <Text style={tw`text-white opacity-80`}>
                          01/01/2022
                        </Text>
                      </View>
                      <View style={tw`w-75`}>
                        <Text style={tw`font-bold p-2 `}>
                          il est prêt ou que la mise en page est achevée.
                          Généralement, on utilise un texte{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
        <View>
        </View>
         <View style={tw`mb-5 bg-white`}>
         <Text style={tw`text-xl font-bold`}>Produits similaires</Text>
         <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={similar}
            keyExtractor={(item)=>item.name}
            renderItem={renderItem}
        />
         </View>
        </ScrollView>
      <View style={[tw`bg-[#e9f7ef] h-22 flex-row justify-between items-center `,styles.cart]}>
      <Text style={tw`text-xl font-bold items-end ml-3`}> {item.price}€ </Text>
      
         {
          isClicked  ?
              <>
              {
                Platform.OS ==="web" ?
                    <TouchableOpacity
                        style={tw`mr-5 flex-row items-center bg-[#2b6] rounded-xl`}
                        onPress={() => {
                            setIsClicked(true)
                            addCart(item)
                        }} desabled>
                        <Icon  name="checkmark-circle" style={tw`p-2 text-white`} size={30} />
                        <Text style={tw`text-xl p-2 text-white`}>Article ajouté au panier</Text>
                    </TouchableOpacity>
                :
                <LottieView
                    loop={false}
                    ref={animation}
                    source={require('../../assets/json.json')}
                    style={[styles.btn,tw`self-end items-end mr-5 w-20`]}
                />
              }
              </>

          :
          <TouchableOpacity 
          style={tw`mr-5 flex-row items-center bg-[#2b6] rounded-xl`}
          onPress={() => {
            setIsClicked(true)
            addCart(item)
          }} >
              <Icon  name="cart-outline" style={tw`p-2 text-white`} size={30} />
        <Text style={tw`text-xl p-2 text-white`}>Ajouter au panier</Text>
        </TouchableOpacity>
         }
      </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 40,
    backgroundColor: "#e9f7ef",
    borderTopLeftRadius: 40,
  },
  divider: {
    borderBottomWidth: 0.4,
  },
  btn:{
    borderTopLeftRadius:15,
},
cart:{
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
}
});
