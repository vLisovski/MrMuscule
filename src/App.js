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
import {useState} from "react";
import LocalStorageWorker from "./storage/LocalStorageWorker";

function App() {

    let local = new LocalStorageWorker()
    let [cartCount, setCartCount] = useState(local.get("cartcounter"))
    const updateCartCounter = (count) => {
        setCartCount(count)
        local.save("cartcounter",count)
    }

    return (
        <>
            <Header cartCount={cartCount}/>
            <Routes>
                <Route path="/" element={<RedirectPage/>}/>
                <Route path="/inventory" element={<InventoryPage updateCartCounter={updateCartCounter}/>}/>
                <Route path="/clothes" element={<ClothesPage updateCartCounter={updateCartCounter}/>}/>
                <Route path="/food" element={<FoodPage updateCartCounter={updateCartCounter}/>}/>
                <Route path="/cart" element={<CartWindow cartCount={cartCount} updateCartCounter={updateCartCounter}/>}/>
                <Route path="/account/*" element={<AccountPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/authorization" element={<AuthPage />}/>
            </Routes>
        </>

    );
}

export default App;
