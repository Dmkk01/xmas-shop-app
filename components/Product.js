import React, {useEffect, useState} from 'react'
import styles from '../styles/Product.module.scss'
import axios from 'axios';
import Image from 'next/image'

const Product = ({id}) => {
    const [product, setProduct] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
          await axios(`https://fakestoreapi.com/products/${id}`).then(response => setProduct(response.data));
        };
        fetchData();
      }, []);
    return (
        (
            product && (
                <div className={styles.card}>
                    <div className={styles.image}> <Image src={product.image} layout="responsive" width={400} height={400}/> </div>
                    <div className={styles.category}> {product.category}</div>
                    <div className={styles.title}> {product.title}</div>
                    <div className={styles.price}> {product.price} $</div>
                    <div className={styles.description}> {product.description}</div>
                    <div className={styles.select}> Select</div>
                    <div className={styles.discard}> Discard</div>
                </div>
            )
        )
    )
}

export default Product
