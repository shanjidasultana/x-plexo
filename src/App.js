import './App.css';
import Header from './components/Header/Header';
import AuthProvider from './components/Context/AuthProvider';
import Shop from './components/Shop/Shop';
import LogIn from './components/login/LogIn';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ReviewItem from './components/ReviewItem/ReviewItem';


function App() {
  
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>

     <Header></Header>
     <Routes>
     <Route  path="/"  element={<Shop/>} />
     <Route path="Shop"  element={<Shop/>} />
         <Route path="review"  element={ <PrivateRoute ><ReviewItem/></PrivateRoute>} />
         <Route path="login"   element={<LogIn/>}/> 
         <Route path="register" element={<Register/>}/>
         {/* <Route path="/Manage" element={<PrivateRoute > <Inventory/></PrivateRoute>
 
  }
/>
              */}
        
{/* <Route path="shipping"  element={ <PrivateRoute ><Shipping/></PrivateRoute> }/> 

<Route path="Placeorder"   element={ <PrivateRoute ><PlaceOrder/></PrivateRoute> }/> 
        */}
          
        
         <Route path="*" element={ <NotFound/>}/>
            
        
       
     </Routes>
     {/* <Map></Map> */}
     {/* <Direction></Direction> */}
     </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
