import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext()


export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user , setUser] = useState(false)
    const [isSeller , setIsSeller] = useState(false)
    const [showUserLogin , setShowUserLogin] = useState(false)
    const [products , SetProducts] = useState([])
    const [cartItems , setCartItems] = useState({}) 
    const [searchQuery , setSearchQuery] = useState({})

    const fetchProducts = async() => {
        SetProducts(dummyProducts)
    }
   
  
    // add to cart 
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)

        if(cartData[itemId]){
            cartData[itemId] += 1
        }else{
            cartData[itemId] = 1
        } 

        setCartItems(cartData)
        toast.success("Added To Cart")
    }

   //Update Cart Item Qunatity 

   const updateCartItems = (itemId , quantity) => {
     let cartData = structuredClone(cartItems)
     cartData[itemId] = quantity
     setCartItems(cartData)
     toast.success("Cart Updated")
   }

   //remove From cart

   const RemoveFromCart = (itemId) => {
     let cartData = structuredClone(cartItems)

      if(cartData[itemId]){
            cartData[itemId] -= 1
            if(cartData[itemId] === 0){
                delete cartData[itemId]
            }
        }
        toast.success("Removed From Cart")
        setCartItems(cartData)
   }


    useEffect(() => {
      fetchProducts()
    }, [])
    
   
   const value = { showUserLogin, setShowUserLogin,  navigate ,  user , setUser , isSeller , setIsSeller , products , currency , addToCart , updateCartItems , RemoveFromCart , cartItems , searchQuery , setSearchQuery
    }
   return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
} 