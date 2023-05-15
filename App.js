import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {TabBar} from "./src/navigations/TabNavigation";
import 'react-native-gesture-handler';
import CartProvider from "./src/context/CartProvider"





export default function App() {

  return (
      <CartProvider>
        <TabBar />
      </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
