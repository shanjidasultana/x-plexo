import React, { useEffect, useState } from 'react';
import './ReviewItem.css'

const ReviewItem = ( ) => {
  const [carts,setCarts]=useState([])
  const [isempty,setEmpty]=useState(true)
  const [isLoading,setLoading]=useState(true)
  let totalQuantity= 0;
  let total=0;
  
  for (const product of carts) {
      total = parseFloat(total )+  parseFloat(product.price) * parseInt(product.quantity);
      totalQuantity=parseInt(totalQuantity) + parseInt(product.quantity);
  } 
  
  
  
    
  
  useEffect(()=>{
    fetch('https://xplexo.herokuapp.com/orders')
        .then(res=> res.json())
        .then(data =>{
            setCarts(data);
            setLoading(false)
            if(data.length>0){
              setEmpty(false)
            }
           
            
        });

},[])

   const handleIncreament=cart=>{
    let updateQuantity=parseInt(cart.quantity);
    updateQuantity=(updateQuantity+1);
    fetch(`https://xplexo.herokuapp.com/orders/${cart._id}?quantity=${updateQuantity}`,{
        method:'PUT',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify()

      })
      .then(res => res.json())
      .then(data => {
        let newCart = [...carts];
       
        const exists = newCart?.find(pd => pd._id === cart._id);
        if(exists){
          for (const cart in  newCart) {
            if(newCart[cart]===exists){
              newCart[cart].quantity=data;
              newCart[cart].subtotal=parseFloat(newCart[cart].subtotal)+parseFloat(newCart[cart].price);
              total= parseFloat(total)+parseFloat(newCart[cart].price);
             
            }
            
          }
        }
        setCarts(newCart);   
      
   })
  }
   const handleDecreament=cart=>{
    let updateQuantity=parseInt(cart.quantity);
    if(updateQuantity>0){
      updateQuantity=(updateQuantity-1);
      fetch(`https://xplexo.herokuapp.com/orders/${cart._id}?quantity=${updateQuantity}`,{
          method:'PUT',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify()
  
        })
        .then(res => res.json())
        .then(data => {
          let newCart = [...carts];
         
          const exists = newCart.find(pd => pd._id === cart._id);
          if(exists){
            for (const cart in  newCart) {
              if(newCart[cart]===exists){
                newCart[cart].quantity=data;
                newCart[cart].subtotal=parseFloat(newCart[cart].subtotal)-parseFloat(newCart[cart].price);
                total= parseFloat(total)-parseFloat(newCart[cart].price);
               
               
              }
              
            }
              
          }
          setCarts(newCart); 
        
     })
    }
   
   }
  
   const handleDeleteUser =id => {
    const proceed = window.confirm('Are you sure, you want to delete?');
    if (proceed) {
     
      fetch( `https://xplexo.herokuapp.com/orders/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('deleted successfully');
                    const remainingOrder = carts.filter(cart => cart._id !== id);
                    setCarts(remainingOrder);
                }
            });
    }
}
    return (
      
       <>
        {isLoading ? <h2 className='loader'>Loading.........</h2>:

        <div className='review-box'>
           {
        isempty? <h2 className='loader'>You haven't yet add any product to cart.</h2> : 
      
        <>
         <table>
          <tbody>
        <tr >
          <th>Remove</th>
          <th>Product</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
      
        </tr>
        {carts?.map((cart)=>(
          <tr  key={cart._id}>
          <td> <button className='remove-btn' onClick={() => handleDeleteUser(cart._id)} >X</button></td>
          <td>  <img src={cart.img} width='90' alt="" /></td>
          <td className='item-name'> {cart.name}</td>
           <td>$ {cart.price}</td>
          <td className='quantity-div'><button onClick={()=>handleDecreament(cart)} >-</button>
           <span className=' number'>{cart.quantity}</span>
            <button  onClick={()=>handleIncreament(cart)}>+</button>
            </td> 
            
            <td>
              $ {cart.subtotal.toFixed(2)}
            </td>
          </tr>
        ))}
         
      
      </tbody>
    </table>
    <div className='cart-content'>
   
        
          <h2 className='cart-total'>Cart Total</h2>
          <h4>items order : {totalQuantity}</h4>
          <h4 className='subtotal'>Subtotal :{total.toFixed(2)} </h4>
          <h3>Total:  {total.toFixed(2)}</h3>
          <button className='checkout-btn'>PROCEED TO CHECKOUT</button>
      
    

      </div>
        </>}
         
      </div>
       }
       </>
        
    );
};

export default ReviewItem;