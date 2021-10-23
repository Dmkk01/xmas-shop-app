import { MyContext } from "../context/state";
import { useContext} from 'react';
import styles from '../styles/Cart.module.scss'
import Product from "./Product";

const Cart = ({index}) => {
  const { state, setState } = useContext(MyContext);

  return (
    <div>  
        {state && (
            <div className={styles.cart}> 
                <div className={styles.name}>
                    <h2> {state[index].name}</h2> 
                </div>
                <div className={styles.cards}>
                    {
                        state[index].products.map((product) => <Product id={product.id} key={product.id}/>)
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default Cart