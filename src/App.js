import './App.css';
import {Route, Routes} from "react-router-dom";
import RegistrationPage from "./pages/registration/RegistrationPage";
import AuthPage from "./pages/authpage/AuthPage";
import Header from "./components/header/Header";
import InventoryPage from "./pages/shop/InventoryPage";
import ClothesPage from "./pages/shop/ClothesPage";
import FoodPage from "./pages/shop/FoodPage";
import CartWindow from "./pages/cart/CartWindow";
import AccountPage from "./pages/account/AccountPage";
import RedirectPage from "./pages/shop/RedirectPage";
import {useEffect, useState} from "react";
import LocalStorageWorker from "./storage/LocalStorageWorker";
import TargetOfferPage from "./pages/shop/TargetOfferPage";

function App() {

    let local = new LocalStorageWorker()
    let [cart, setCart] = useState([])
    let [cartCount, setCartCount] = useState()
    let [current, setCurrent] = useState()

    const updateCartCounter = (count) => {
        setCartCount(count)
    }

    useEffect(()=>{
        if(local.get("menu")==null){
            local.save("menu","target")
        }
        if(local.get("cartcounter")==null){
            local.save("cartcounter",0)
        }
        if(local.get("cartcount")==null){
            local.save("cartcount",0)
        }
        if(local.get("location")==null){
            local.save("location",window.location.href)
        }
        if(local.get("cart")==null){
            local.save("cart",[])
        }
        if(local.get("password")==null){
            local.save("password"," ")
        }
        if(local.get("email")==null){
            local.save("email"," ")
        }
        setCartCount(local.get("cart").split(",").length)
    },[])

    useEffect(() => {
        console.log("CART" + cart)
        local.save("cart", cart)
        if(cart[0]!==''){
            updateCartCounter(cart.length)
        }
    }, [cart])

    return (
        <>
            <Header current={current} cartCount={cartCount}/>
            <Routes>
                <Route path="/" element={<RedirectPage/>}/>
                <Route path="/inventory" element={<InventoryPage cart={cart} setCart={setCart} setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/clothes" element={<ClothesPage cart={cart} setCart={setCart} setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/food" element={<FoodPage cart={cart} setCart={setCart} setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/target" element={<TargetOfferPage cart={cart} setCart={setCart} setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/cart" element={<CartWindow cart={cart} setCart={setCart} setCurrent={setCurrent} cartCount={cartCount} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/account/*" element={<AccountPage setCurrent={setCurrent}/>}/>
                <Route path="/registration" element={<RegistrationPage setCurrent={setCurrent}/>}/>
                <Route path="/authorization" element={<AuthPage setCurrent={setCurrent} />}/>
            </Routes>
        </>

    );
}

export default App;
