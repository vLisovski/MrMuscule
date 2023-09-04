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

function App() {

    let local = new LocalStorageWorker()
    let [cartCount, setCartCount] = useState()
    let [current, setCurrent] = useState()

    const updateCartCounter = (count) => {
        setCartCount(count)
    }

    useEffect(()=>{
        setCartCount(local.get("cart").split(",").length)
    },[])

    return (
        <>
            <Header current={current} cartCount={cartCount}/>
            <Routes>
                <Route path="/" element={<RedirectPage/>}/>
                <Route path="/inventory" element={<InventoryPage setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/clothes" element={<ClothesPage setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/food" element={<FoodPage setCurrent={setCurrent} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/cart" element={<CartWindow setCurrent={setCurrent} cartCount={cartCount} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/account/*" element={<AccountPage/>}/>
                <Route path="/registration" element={<RegistrationPage setCurrent={setCurrent}/>}/>
                <Route path="/authorization" element={<AuthPage setCurrent={setCurrent} />}/>
            </Routes>
        </>

    );
}

export default App;
