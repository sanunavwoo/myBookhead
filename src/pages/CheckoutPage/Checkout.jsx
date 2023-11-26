import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Navigation } from "../../components/NavBar/Navigation";
import { AddressContext } from "../../contexts/AddressContext";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

import "./Checkout.css";

export function Checkout(){

    const {address,getAddress}= useContext(AddressContext);
    const {cartItems,discountPercent,buyItems}= useContext(CartContext);
    const {stateAuth}= useContext(AuthContext);
    const [checkedAddressID,setCheckedAddressID]= useState("");

    const navigate= useNavigate();

    const [isOrderPlaced,setIsOrderPlaced]= useState(false);
    
    const totalPrice= cartItems?.length>0 && cartItems?.reduce((acc,cur)=>acc+(cur.qty*cur.price),0);

    function handleChange(event){
        setCheckedAddressID(event.target.value);
        console.log("ID selected inside checkout page address::", event.target.value);

    }
    console.log("Address::",address);
    const selectedAddress= address.find(({_id})=>_id===checkedAddressID);
    console.log("Selected Address::",selectedAddress);

    useEffect(()=>{
        getAddress();
    },[]);

    return(
        <>
        <Navigation />
            <div className="checkout-container">
            {stateAuth.isAuth===true? 
            <>
                <div className="address-card-container">
                <h1>Select Address</h1>
                    {address?.length===0 ? 
                        <>
                        <h2>No address found</h2> 
                        <button onClick={()=>navigate("/profile")} className="place-order-btn">Add Address</button>
                        </>
                    :
                        
                            (address.map((currentAddress)=>
                            <div className="address-card">    
                                    <div className="address-info">
                                        <label>
                                            <input type="radio" name="address-radioBtn" onChange={handleChange} value={currentAddress._id} checked={checkedAddressID=== currentAddress._id} />
                                            <h2>{currentAddress.name}</h2>
                                            <p>{currentAddress.street}, {currentAddress.city}, {currentAddress.state}, {currentAddress.country}</p>
                                            <p>{currentAddress.zipCode}</p>
                                            <p>{currentAddress.mobile}</p>
                                        </label>    
                                        <label>
                                            <input type="radio" name="addressType-radioBtn" />
                                            Home
                                        </label>
                                        <label>
                                            <input type="radio" name="addressType-radioBtn" />
                                            Work
                                        </label>
                                    </div>
    
                            </div>
                    ))}
                </div>
                <div className="order-price">
                    <div className="order-summary-div">
                        <h1>Order Details</h1>
                        <div className="carted-items">
                            <div className="carted-items-heading">
                                <p><strong>Title</strong></p>
                                <p><strong>Qty</strong></p>
                            </div>
                            {buyItems.length>0? 
                                
                                <div className="carted-item">
                                    <p>{buyItems[0].title}</p>
                                    <p>1</p>
                                </div>
                                
                            :
                                cartItems.map((i)=>
                                (<div className="carted-item">
                                <p>{i.title}</p>
                                <p>{i.qty}</p>
                                </div>))
                            }
                            {/* {cartItems.map((i)=>
                            (<div className="carted-item">
                            <p>{i.title}</p>
                            <p>{i.qty}</p>
                            </div>))} */}
                        </div>  

                        
                    </div>
                    <div className="price-card-container-checkout">
                                    <hr></hr>
                                    <div className="price-breakdown-div">
                                        <li>
                                            <ul>
                                                <p>Price ({cartItems.length})</p>
                                                <p>Rs. {buyItems.length>0? buyItems[0].price : totalPrice}</p>
                                            </ul>
            
                                            <ul>
                                                <p>Delivery Charges</p>
                                                <p>FREE <s>Rs.100</s></p>
                                            </ul>
                                            <ul>
                                                <p>Coupon Discount</p>
                                                <p className="greenLine">- Rs. {buyItems.length>0? Math.round(buyItems[0].price*discountPercent) : Math.round(totalPrice*discountPercent)}</p>
                                            </ul>
                                        </li>
                                        <div className="totalAmount-div">
                                            <span><h4>Total Amount</h4></span>
                                            <span><h4 className="greenLine">Rs. {buyItems.length>0? buyItems[0].price : Math.round(totalPrice- (totalPrice*discountPercent))}</h4></span>
                                        </div>
                                        <p className="save-msg-p">{discountPercent>0 && `You will save Rs. ${Math.round(totalPrice*discountPercent)} on this order`}</p>
                                        <button className="place-order-btn" onClick={()=>setIsOrderPlaced(true)}>Place Order</button>
                                    </div>

                                </div>  
                        
                    </div>
                 {isOrderPlaced &&
                    <div className="orderPlaced-container-div">
                        <div className="orderPlaced-container">
                            <h1>Thank you for shopping with us</h1>
                                <div className="order-placed-items">
                                <h3>Order Items</h3>
                                {buyItems.length >0 ? 
                                
                                <div className="order-placed-item">
                                    <p>1 x {buyItems[0].title}</p>
                                    
                                </div>
                                :
                                cartItems.map((cartItem)=>(
                                <div className="order-placed-item">
                                    <p>{cartItem.qty} x {cartItem.title}</p>
                                    
                                </div>  
                    
                                 ))
                                }
                                    {/* {cartItems.map((cartItem)=>(
                                        <div className="order-placed-item">
                                            <p>{cartItem.qty} x {cartItem.title}</p>
                                            
                                        </div>  
                            
                                    ))} */}
                                </div>    
                                <hr></hr>
                                <div className="orderPlaced-address">
                                    <h3>Delivery Address</h3> 
                                    <p><strong>{selectedAddress.name}</strong></p>
                                    <p>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}</p>
                                    <p>{selectedAddress.country}-{selectedAddress.zipCode}</p>
                                </div>
                                <h4 style={{color:"green"}}>To be paid: Rs. {Math.round(totalPrice- (totalPrice*discountPercent))}</h4>
                                <button className="place-order-btn" onClick={()=>navigate("/")}>Close</button>
                        </div>
                        
                    </div>
                 }   
            </>
            :
            <div className="please-log-in-div">
                <img src="https://freepngimg.com/download/puppy/33836-7-golden-retriever-puppy-file.png" style={{width: "100%"}} />
                <h1>PLEASE LOG IN</h1>
                <div style={{display:"none"}}>{setTimeout(()=>navigate("/login"),1500)}</div>    
            </div>
            }
            </div>    


        </>
        
    );
}