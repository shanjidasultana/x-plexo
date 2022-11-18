import React from 'react';
import './Product.css';
const Product = ({data}) => {
    const handleCheckbox=item=>{
        
        let checkbox=document.getElementById(item.name);
        if(checkbox.checked===true){
            let countQuantity=document.getElementById(item._id).value;
            
            if(countQuantity>0){
              item.quantity=countQuantity;
              item.subtotal=parseFloat(item.price)*parseFloat(item.quantity);
            }
            else{
              alert("Please enter a enter vaid positive number quantity .")
            }
           
        }
    }

    const handleAddToCart = (product) => {
          if(product.quantity>0){
            fetch('https://xplexo.herokuapp.com/orders', {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
              body: JSON.stringify(product)
          })
          .then(res => res.json())
              .then(data => {
                  if (data.insertedId) {
                     alert("Successfully added product to Cart ")
                  }
              });
          }
          else if(product.quantity<0){
            alert("Please enter product quantity first atlist 1.")
          }
          else{
            alert("Please Enter Product Quantity First and checked the checkbox.")
          }
        
  
  }

    return (
        <table>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/> </svg>Color</th>
            <th><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/> </svg>Stock</th>
            <th><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/> </svg>Price</th>
            <th className='buy-th'>Buy</th>
          </tr>
          {data.map((item) => (
            <tr key={item._id}>
             <td><img src={item.img} width='90' alt="" /></td>
              <td className='item-name'>{item.name}</td>
              <td>{item.color}</td>
              <td className='stock'>{item.stock}</td>
              <td>{item.price}</td>
              <td className='cart'>
                <input type="number" defaultValue={1} className="productCountityInput"  id={item._id} />
                <button className="cart-btn" onClick={()=>handleAddToCart(item)}>
                <svg style={{color: "white"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="white"></path> </svg>
                </button>
                <input type="checkbox" onClick={()=>handleCheckbox(item)} id={item.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default Product;