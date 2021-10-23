import { createContext, useContext} from 'react';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

export const MyContext = createContext(null);

const initialState = [
    {
        id: 1,
        name: "Kid 1",
        products: [],
    },
    {
        id: 2,
        name: "Kid 2",
        products: [],
    },
    {
        id: 3,
        name: "Kid 3",
        products: [],
    },
    {
        id: 4,
        name: "Kid 4",
        products: [],
    },
    {
        id: 5,
        name: "Kid 5",
        products: [],
    },

]

export function MyProvider({ children }) {
    const [state, setState] = useState(null);

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
