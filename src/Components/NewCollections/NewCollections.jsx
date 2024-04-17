import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {

  const [new_collection,setNew_collection]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
        let collections = await fetch(`https://mern-ecommerce-2-t80r.onrender.com/newcollections`);
        setNew_collection(await collections.json());
    };

    fetchData();
}, []);


  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
      {new_collection.map((item,i)=>
      {return(
        <Item key={i} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image}/>
      )})}
      </div>
    </div>
  )
}

export default NewCollections
