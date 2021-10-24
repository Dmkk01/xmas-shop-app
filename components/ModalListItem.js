import React from 'react'
import styles from '../styles/ModalListItem.module.scss'

 const ModalListItem = ({product}) => {

    const getPrice = () => {
        if (product.times < 2) { return product.price}
        else {
            var newPercentage = 1 - (product.times / 10)
            return ((product.price * newPercentage) * product.times).toFixed(2)
        }
    }
    return (
        <div className={styles.item} data-cy="modal-item-list">
            <div className={styles.title}>
                <span> Title: </span> {product.title}
            </div>
            <div className={styles.amount}>
                <span> x</span>{product.times}
            </div>
            <div className={styles.price}>
                <span> Price: </span> {getPrice(product.price)} $
            </div>
        </div>
    )
}

export default ModalListItem
