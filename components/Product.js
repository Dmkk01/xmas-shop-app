import React, {useEffect, useState, useContext} from 'react'
import { MyContext } from "../context/state";
import styles from '../styles/Product.module.scss'
import axios from 'axios';
import Image from 'next/image'

const Product = ({productIndex, userIndex}) => {
    const [product, setProduct] = useState(null)
    const { state, setState } = useContext(MyContext);

    const [buttonState, setButtonState] = useState(state[userIndex].products[productIndex].decision)
    useEffect(() => {
        const fetchData = async () => {
          await axios(`https://fakestoreapi.com/products/${state[userIndex].products[productIndex].id}`).then(response => {
            var temp = state
            temp[userIndex].products[productIndex].details = response.data
            setProduct(response.data)
            setState(temp)
          });
        };
        fetchData();

      }, []);

    const ApproveButton = () => {
        var temp = state
        temp[userIndex].products[productIndex].decision = 'approve'
        setState(temp)
        setButtonState('approve')
    }

    const DiscardButton = () => {
        var temp = state
        temp[userIndex].products[productIndex].decision = 'discard'
        setState(temp)
        setButtonState('discard')
    }
    
    const CapitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return (
        (
            product ? (
                <div className={styles.card}>
                    <div className={styles.image}> <Image src={product.image} layout="intrinsic" width={50} height={50}/> </div>
                    <div className={styles.category}> {CapitalizeFirstLetter(product.category)}</div>
                    <div className={styles.title}> {CapitalizeFirstLetter(product.title)}</div>
                    <div className={styles.price}> {product.price} $</div>
                    <div className={styles.description}> {CapitalizeFirstLetter(product.description)}</div>
                    <div className={styles.select}> 
                        <div onClick={() => ApproveButton()} className={buttonState === 'approve' ? styles.colorbutton : styles.borderbutton }> Approve</div>
                    </div>
                    <div className={styles.discard}> 
                        <div onClick={() => DiscardButton()} className={buttonState === 'discard' ? styles.colorbutton : styles.borderbutton }> Discard</div>
                    </div>
                </div>
            ) : <div className={styles.loader}></div>
        )
    )
}

export default Product
