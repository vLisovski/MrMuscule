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
//TODO пагинация на страницах
//TODO удаление товаров из избранного
function App() {
  return (
      <>
          <Header/>
          <Routes>
              <Route path="/inventory" element={<InventoryPage/>}/>
              <Route path="/clothes" element={<ClothesPage/>}/>
              <Route path="/food" element={<FoodPage/>}/>
              <Route path="/cart" element={<CartWindow/>}/>
              <Route path="/account/*" element={<AccountPage/>}/>
              <Route path="/registration" element={<RegistrationPage/>}/>
              <Route path="/authorization" element={<AuthPage/>}/>

          </Routes>
      </>

  );
}

export default App;
