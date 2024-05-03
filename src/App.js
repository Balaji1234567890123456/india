import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedData = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedData})
  }

  decrementCartItem = id => {
    const {cartList} = this.state
    const y = cartList.find(eachItem => eachItem.id === id)
    if (y.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const k = eachItem.quantity - 1
            return {...eachItem, quantity: k}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }
  /* removeCartItem = id => {
    const {cartList} = this.state
    const updatedData = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedData})
  } */

  addCartItem = product => {
    const {cartList} = this.state
    const y = cartList.find(eachItem => eachItem.id === product.id)
    if (y) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (y.id === eachItem.id) {
            const v = eachItem.quantity + product.quantity
            return {...eachItem, quantity: v}
          }
          return eachItem
        }),
      }))
    } else {
      const u = [...cartList, product]
      this.setState({cartList: u})
    }
  }

  onRemoveAllItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItem,
          decrementCartItemQuantity: this.decrementCartItem,
          removeAllCartItems: this.onRemoveAllItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
