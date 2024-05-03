// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => {
  ;<CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total = eachItem.price * eachItem.quantity
      })
      return (
        <div>
          <p>
            <span>Order Total: </span> {total}/-
          </p>
          <p>{cartList.length} items in cart</p>
          <button type="button">ordered</button>
        </div>
      )
    }}
  </CartContext.Consumer>
}
export default CartSummary
