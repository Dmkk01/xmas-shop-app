import { MyContext } from "../context/state";
import { useContext} from 'react';
import styles from '../styles/Cart.module.scss'
import Product from "./Product";
import Image from 'next/image'

const Cart = ({index}) => {
  const { state, setState } = useContext(MyContext);

  return (
    <div>  
        {state && (
            <div data-cy="cart-component" className={styles.cart}> 
                <div className={styles.name}>
                    <h2> <span>{state[index].name}</span> would like these items:</h2> 
                </div>
                <div className={styles.cards}>
                    {
                        state[index].products.map((product, productIndex) => <Product userIndex={index} productIndex={productIndex} key={product.id}/>)
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default Cart