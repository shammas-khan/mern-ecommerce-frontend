import React,{createContext,useEffect,useState} from 'react'

export const ShopContext = createContext(null);

const getDefaultCart=()=>{
    const cart={};
    for(let i=0;i<301;i++){
        cart[i]=0;
    }
    return cart;
}

const ShopContextProvider=(props)=>{

    const [all_product,setAll_Product]=useState([])
    const [cartItems,setcartItems]=useState(getDefaultCart);
    const [isAdmin,setIsAdmin]=useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let product = await fetch(`https://mern-ecommerce-2-t80r.onrender.com/allproducts`);
            setAll_Product(await product.json());

            if(localStorage.getItem('auth-token')){


                fetch(`https://mern-ecommerce-2-t80r.onrender.com/getcart`,{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json'
                    },
                    body:"",
                })
                .then((response)=>response.json())
                .then((data)=>{setcartItems(data)});


                fetch(`https://mern-ecommerce-2-t80r.onrender.com/admin`,{
                    method:'GET',
                    headers:{
                        Accept:'application/json',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json'
                    },
                })
                .then((response)=>response.json())
                .then((data)=>{setIsAdmin(data)});
            

            }
        }
    
        fetchData();
    }, []);
    

    const addToCart=(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch(`https://mern-ecommerce-2-t80r.onrender.com/addtocart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart=(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch(`https://mern-ecommerce-2-t80r.onrender.com/removefromcart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }
    
    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue={all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems,isAdmin};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;