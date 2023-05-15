//import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import Categories from '../screens/Categories';
import tw from 'twrnc';
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Articles from '../screens/Articles';
import Details from '../screens/Details';
import CartScreen from '../screens/CartScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// const Stack = createStackNavigator();
const Stack=createNativeStackNavigator()
const  HomeStack=() =>{
    const navigation=useNavigation()
    const route=useRoute()
  
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home"
            component={HomeScreen}
            options={{
                headerShown:false,
                headerShadowVisible:false,
            }}/>
            <Stack.Screen name="Categories" component={Categories} options={{
                headerShadowVisible:false,
                headerStyle:{
                    backgroundColor:"#2b6",
                },
                headerTitleStyle:{
                    fontWeight: "900",
                    color:"#fff",
                },
                headerTitleAlign: "center",
                headerLeft:()=>(
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="md-chevron-back-outline" style={tw`ml-1`} size={35} color={"#fff"} />
                 </TouchableOpacity>
                )
            }}/>
             <Stack.Screen name="Articles" component={Articles} options={{
                headerShadowVisible:false,
                headerStyle:{
                    backgroundColor:"#2b6",
                },
                headerTitleStyle:{
                    fontWeight: "900",
                    color:"#fff",
                },
                headerTitleAlign: "center",
                headerLeft:()=>(
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="md-chevron-back-outline" style={tw`ml-1`} size={35} color={"#fff"} />
                 </TouchableOpacity>
                )
            }}/>
            <Stack.Screen name="Detail" component={Details} options={{
                  headerShadowVisible:false,
                  headerStyle:{
                      backgroundColor:"#fff",
                  },
                  headerTitleAlign: "center",
                  headerTitle:'',
                  headerLeft:()=>(
                   <TouchableOpacity onPress={()=>navigation.goBack()}>
                      <Icon name="md-chevron-back-outline" style={tw`ml-1`} size={35} color={"#000"} />
                   </TouchableOpacity>
                  ),
            }}/>
             <Stack.Screen name="Cart" component={CartScreen} options={{
                headerShadowVisible:false,
                headerStyle:{
                    backgroundColor:"#2b6",
                },
                headerTitleStyle:{
                    fontWeight: "900",
                    color:"#fff",
                },
                headerTitleAlign: "center",
                headerLeft:()=>(
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="md-chevron-back-outline" style={tw`ml-1`} size={35} color={"#fff"} />
                 </TouchableOpacity>
                )
            }}/>
        </Stack.Navigator>
    );
}
export default HomeStack;