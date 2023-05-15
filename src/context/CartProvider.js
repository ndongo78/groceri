import { StyleSheet, Text, View } from 'react-native'
import React,{createContext,useState,useEffect} from 'react'

export const cartContext=createContext()

const CartProvider = ({children}) => {
    const [cart,setCart]=useState([])

    //add to cart
    const addCart =(item)=>{
        const exist =cart.some(article=>article.name === item.name)
        if(!exist){
            setCart([...cart,{...item,qty:1}])
        }else{
            exist.qty += 1
        }
    }
    //add qty
    const addQty = (item) => {
      const exist = cart.find(product => product.name === item.name)
      // console.log("items", exist)
      if (exist) {
          exist.qty += 1;
          return setCart((prevState => [...prevState]))
      } else {
        addCart(item)
      }
  }

  const removeQty = (item) => {
      const exist = cart.find(product => product.name === item.name)
      if (exist && exist.qty !== 1) {
          exist.qty -= 1;
          return setCart((prevState => [...prevState]))
      }
  }
  const deleteItem=(item)=>{
     const newItems=cart.filter(product=>product.name !== item.name)
     setCart(newItems)
  }
  return (
    <cartContext.Provider
     value={{
        cart,
        addCart,
        addQty,
        removeQty,
        deleteItem
     }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider

const styles = StyleSheet.create({})