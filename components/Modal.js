import React from 'react'
import styles from '../styles/Modal.module.scss'
import { MyContext } from "../context/state";
import { useContext, useEffect, useState} from 'react';
import ModalListItem from './ModalListItem';

const Modal = ({setModal}) => {
    const { state } = useContext(MyContext);
    const [approved, setApproved] = useState([])
    const [discarded, setDiscarded] = useState([])

    useEffect(() => {
        var tempPricesA = []
        var tempPricesB = []
        state.forEach(element => {
            element.products.forEach(product => {
                if (product.decision === 'approve') {
                    if (tempPricesA.filter(e => e.id === product.id).length > 0) {
                        tempPricesA.filter(e => e.id === product.id)[0].times = tempPricesA.filter(e => e.id === product.id)[0].times + 1
                    } else {
                        tempPricesA.push({
                            id: product.id,
                            price: product.details.price,
                            times: 1,
                            title: product.details.title
                        })
                    }
                } else if (product.decision === 'discard') {
                    if (tempPricesB.filter(e => e.id === product.id).length > 0) {
                        tempPricesB.filter(e => e.id === product.id)[0].times = tempPricesB.filter(e => e.id === product.id)[0].times + 1
                    } else {
                        tempPricesB.push({
                            id: product.id,
                            price: product.details.price,
                            times: 1,
                            title: product.details.title
                        })
                    }
                }
            })
        });
        setApproved(tempPricesA)
        setDiscarded(tempPricesB)
    }, [])

    const getPrice = () => {
        var sum = 0;
        approved.forEach(product => {
            if (product.times < 2) { sum = sum +  product.price}
            else {
                var newPercentage = 1 - (product.times / 10)
                sum = sum + ((product.price * newPercentage) * product.times)
            }
        })
        return sum.toFixed(2)
    }

    const submitProducts = () => {
        alert('Your items were submitted! \nThank you for using Droppe Xmas')
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modalcontent}>
            <div className={styles.modalheader}>
                <span className={styles.close} onClick={() => setModal(false)}>&times;</span>
            </div>
            <div className={styles.modalbody}>
                <p>Here is your final list: </p>
                <p className={styles.approvedtext}>Approved</p>
                <hr className={styles.approvedline}/>
                {
                    approved.length > 0 ?
                    approved.map(element => <ModalListItem key={element.id} product={element}/>)
                    : <div className={styles.message}> No elements to display</div>
                }
                <p className={styles.declinedtext}>Discarded</p>
                <hr className={styles.declinedline}/>
                {
                    discarded.length > 0 ?
                    discarded.map(element => <ModalListItem key={element.id} product={element}/>)
                    : <div className={styles.message}> No elements to display</div>
                }
                <div className={styles.price}>
                    <span> Total Price: </span> {getPrice()}$
                </div>
                <div className={styles.submit} onClick={() => submitProducts()}>
                    Submit
                </div>
            </div>
            </div>
        </div>
    )
}
export default Modal