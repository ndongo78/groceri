import React,{useState,useContext} from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import { CurvedBottomBar  } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import HomeStack from './HomeStack';
import Details from '../screens/Details';
import { cartContext } from '../context/CartProvider';

export const TabBar = () => {
    const [first, setfirst] = useState(true)
    const {cart}=useContext(cartContext)
    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'Home':
                icon = 'ios-home-outline';
                break;
            case 'profile':
                icon = 'person-outline';
                break;
        }

        return (
            <Ionicons
                name={icon}
                size={30}
                color={routeName === selectedTab ? '#AACBAE' : 'black'}
            />
        );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
        <>
            <NavigationContainer>
                <CurvedBottomBar.Navigator
                    style={[styles.bottomBar,{display: first ? "flex":"none"}]}
                    strokeWidth={0.5}
                    strokeColor="#3B984B"
                    height={60}
                    circleWidth={60}
                    bgColor="#2b6"
                    initialRouteName="Home"
                    borderTopLeftRight
                    screenOptions={{
                       headerShown:false
                    }}
                    screenListeners={({ navigation ,route}) => ({
                        state: (e) => {
                          // Do something with the state
                         
                          if(route.name === "Details"){
                            setfirst(false);
                          }else{
                            setfirst(true);
                          }
                        },
                      })}
                    renderCircle={({ selectedTab, navigate }) => (
                        <Animated.View style={styles.btnCircle}>
                            {
                                cart.length != 0 && <View style={styles.btnCard}>
                                  <Text style={{color:"#fff",fontWeight: "900",
                                  }} >{cart.length}</Text>
                                </View>
                            }
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                                onPress={() => navigate("Cart")}>
                                <Ionicons name={'ios-cart-outline'} color="gray" size={25} />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    tabBar={renderTabBar}>
                    <CurvedBottomBar.Screen
                        name="Home"
                        position="LEFT"
                        component={HomeStack}
                        options={{
                            headerTitle:false
                        }}

                    />
                    <CurvedBottomBar.Screen
                        name="profile"
                        component={Profile}
                        position="RIGHT"
                    />
                    <CurvedBottomBar.Screen
                        name="Details"
                        component={Details}
                        position="CENTER"
                        options={{
                            headerTitle: '',
                            headerShown:false,
                        }}
                    />
                </CurvedBottomBar.Navigator>
            </NavigationContainer>
        </>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        marginVertical: 5,
    },
    bottomBar: {},
    btnCircle: {
        width: 60,
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 30,
        borderWidth:5,
        borderColor:"#3B984B",
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    img: {
        width: 30,
        height: 30,
    },
    btnCard:{
        backgroundColor:"orange",
        width: 30,
        height: 30,
        position:"absolute",
        zIndex: 1000,
        top: -17,
        borderBottomEndRadius:50,
        borderBottomLeftRadius:50,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        alignItems:"center"

    }
});