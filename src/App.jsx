import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState } from "react"
import { db } from "./data/db"

function App() {
  console.log("Data: ", db)
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item) {
    const existedItem = cart.findIndex(element => element.id === item.id)
    if (existedItem === -1) {
      item.quantity = 1
      setCart([...cart, item])
    } else {
      const updatedCart = [...cart]
      updatedCart[existedItem].quantity++
      setCart(updatedCart)
    }
  }
  
  return (
    <>
      <Header/>
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
