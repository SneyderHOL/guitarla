import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db"

function useCart() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  const cartIsEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal =  useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

  function addToCart(item) {
    const existedItem = cart.findIndex(element => element.id === item.id)
    if (existedItem === -1) {
      item.quantity = 1
      setCart([...cart, item])
    } else {
      if (cart[existedItem].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[existedItem].quantity++
      setCart(updatedCart)
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return {
    data,
    cart,
    cartIsEmpty,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  }
}

export default useCart