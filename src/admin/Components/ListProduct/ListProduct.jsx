import React,{useState,useEffect} from 'react'
import './ListProduct.css'
import cross_icon from '../../../Assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts,setAllProducts]=useState([]);

  const fetchInfo=async()=>{
    let data=await fetch(`https://mern-ecommerce-2-t80r.onrender.com/allproducts`);
    setAllProducts(await data.json())
  }
  
  const removeProduct=async(id)=>{
    await fetch(`https://mern-ecommerce-2-t80r.onrender.com/removeproduct`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    });

    await fetchInfo();
    
  }

  useEffect(()=>{
    fetchInfo();
  },[])
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {
            allproducts.map((product,index)=>{
            return <><div key={index} className='listproduct-format-main listproduct-format'>
              <img src={product.image} alt="" className='listproduct-product-icon'/>
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{removeProduct(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt=""/>
            </div>
            <hr /></>
            
            
          })
        }
      </div>
    </div>
  )
}

export default ListProduct
