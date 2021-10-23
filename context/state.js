import { createContext, useContext} from 'react';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

export const MyContext = createContext([]);

const initialState = [
    {
        id: 1,
        name: "John",
        products: [],
    },
    {
        id: 2,
        name: "Bob",
        products: [],
    },
    {
        id: 3,
        name: "Oliver",
        products: [],
    },
    {
        id: 4,
        name: "James",
        products: [],
    },
    {
        id: 5,
        name: "Alexander",
        products: [],
    },
]

export function MyProvider({ children }) {
    const [state, setState] = useState([]);

    const value = useMemo(() => ({ state, setState }), [state, setState]);

    useEffect(() => {
        const fetchData = async () => {
          await axios('https://fakestoreapi.com/carts?limit=5').then(response => cleanData(response.data));
        };
        fetchData();
      }, []);

    const cleanData = (data) => {
        var newData = initialState
        for (var i = 0; i < data.length; i++) {
            var products = []
            var productsIds = data[i].products.map(product => product.productId)
            productsIds.forEach(element => {
                products.push({
                    id: element,
                    decision: 'none'
                })
            });
            newData[i].products = products
        }
        setState(newData)
    }

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
}

export function useAppContext() {
    return useContext(MyContext);
  }