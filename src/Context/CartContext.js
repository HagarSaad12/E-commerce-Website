import axios from "axios";
import { createContext, useState } from "react";

export let cartContext=createContext();

export function CartContextProvider(props){
  let [cartNumber,setCartNumber]=useState(0);
//   let header={
//    token:localStorage.getItem('userToken')
// }
function getHeader(){
  return {token:localStorage.getItem('userToken')}
}
function addCart(id){
     
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    
    {
      productId:id
    },
    {
       headers:getHeader()
    }
    )
}
function getCart(){
  
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,  
  {
     headers:getHeader()
  }
  )
}
function deleteCart(id){
  
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
  {
     headers:getHeader()
  }
  )
}
function updateCart(id,count){
  
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  {
   count:count
  },
   
  {
     headers:getHeader()
  }
  )
}
function checkoutPayment(id,formData){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
  {
    shippingAddress:formData 
},
   
  {
     headers:getHeader()
  }
  )
}
return <cartContext.Provider value={{addCart,cartNumber,setCartNumber,getCart,deleteCart,updateCart,checkoutPayment}}>
    {props.children}
</cartContext.Provider>
}
