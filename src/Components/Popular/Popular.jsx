import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular=()=>{

    const [popularProducts,setPopularProducts]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let product = await fetch(`https://mern-ecommerce-2-t80r.onrender.com/popularinwomen`);
            setPopularProducts(await product.json());
        };
    
        fetchData();
    }, []);
    
    return(
        <div className="popular">
            <h1>POLULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {popularProducts.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular;