import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [isLoading,setLoading]=useState(true)
    const [products,setProducts] = useState([]);
    const [displayProducts,setDisplayProducts]=useState([]);
    useEffect(()=>{
        fetch('https://xplexo.herokuapp.com/products')
            .then(res=> res.json())
            .then(data =>{
                setProducts(data);
                setDisplayProducts(data)
                setLoading(false)
            });

    },[])
   const handleReset=()=>{
     const category=document.getElementById("category").value='Category';
     const size=document.getElementById("size").value="Size";
     setDisplayProducts(products);
    }
    const handleSearch =(event)=>{
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product?.name.toLowerCase().includes(searchText.toLowerCase()))
        setDisplayProducts(matchedProduct);
    }
    const handleByProductCatagory =(event)=>{
        const searchCategory = event.target.value;
        const matchedProduct = products.filter(product => product?.category.toLowerCase()===(searchCategory.toLowerCase()))
        setDisplayProducts(matchedProduct);
    }
    const handleByProductSize =(event)=>{
        const searchText = event.target.value;
          const matchedProduct = products.filter(product => product?.size.toLowerCase()===(searchText.toLowerCase()))
          setDisplayProducts(matchedProduct);
    }
    return (
        < > 
          {isLoading ? <h2 className='product-loader'>Loading.........</h2>:
          <>
          <div>
            <div className='searches-div'>
                <div className='searches-div'>
                    <div >
                    <select defaultValue='Category' onChange={handleByProductCatagory} id="category" className='prouct-selection'>
                        <option value='Category' disabled>
                            Category
                        </option>
                    <option>hoodies</option>
                    <option>t-shirt</option>
                    <option>shirt</option>
                    <option>jacket</option>
                    </select>
                    </div>  
                    <div> 
                    <select defaultValue='Size' onChange={handleByProductSize} className='prouct-selection' id="size">
                        <option value='Size' disabled>
                            Size
                        </option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                   
                    </div>  
                    <button className='reset-btn' onClick={handleReset}><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" fill="#52bcd2"></path> <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" fill="#52bcd2"></path></svg>Reset</button>
                </div>

            <div className='searches-div'>
                <h4>Search : </h4>
                <input type="text"  onChange={handleSearch}  className='prouct-selection' name="" id="" />
                <Link to="/review"><button className='addToCart-btn'>Add To Cart</button></Link>
            </div>
           </div>
           
        </div>
        
          <Product
           data={displayProducts}
          ></Product>
                
                
          </>
         }
        </>
    );
};

export default Shop;