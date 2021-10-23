import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Layout.module.scss'
import { MyContext } from "../context/state";
import { useContext} from 'react';
import Cart from "../components/Cart"

export default function Home() {
  const { state, setState } = useContext(MyContext);

  return (
    <div> 
      {
        state.length > 0 ? 
        state.map((element, index) => (
          <Cart index={index} key={element.id}/>
        ))
        : 
        <div> Loading</div>
      }
    </div>
  )
}

        // state.map(element => {
        //   <div key={element.id}> {element.id}</div>
        // })