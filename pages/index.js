import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Layout.module.scss'
import { MyContext } from "../context/state";
import { useContext, useState} from 'react';
import Cart from "../components/Cart"
import Modal from "../components/Modal"

export default function Home() {
  const { state, setState } = useContext(MyContext);
  const [modal, setModal] = useState(false)

  // const checkIfAllSelected = () => {
  //   var x = false;
  //   for (let element of state) {
  //     if (element.products.some((x) => x.decision === 'none')) {x = true; break}
  //   }
  //   if (!x) {setModal(true)}
  // }
  return (
    <div> 
      {
        state.length > 0 ? 
        <>
        {modal && <Modal modal={modal} setModal={setModal}/>}
        <div className={styles.submit} onClick={() => setModal(true)}> Submit</div>
        {
          state.map((element, index) => (
            <Cart index={index} key={element.id}/>
          ))
        }
        </>
        : 
        <div className={styles.loader}></div>
      }
    </div>
  )
}