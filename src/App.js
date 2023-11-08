import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {Cart, Category, Home} from "./pages";
import Footer from "./components/Footer/Footer";
import store from "./store/store"
import {Provider} from "react-redux";
import SearchPage from "./pages/SearchPage/SearchPage";
import FilteredPage from "./pages/FilteredPage/FilteredPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/AuthPages/LoginPage";
import SingUpPage from "./pages/AuthPages/SingUpPage";
import './firebase';
import UserPage from "./pages/userPage/UserPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <ToastContainer
              theme="dark"
              position="top-right"
              autoClose={2000}
              closeOnClick
              pauseOnHover={false}
          />
          <BrowserRouter>
              <Navbar/>
              <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'/category/:id'} element={<Category/>}/>
                  <Route path={'/cart'} element={<Cart/>}/>
                  <Route path={'/search'} element={<SearchPage/>}/>
                  <Route path={'/filter'} element={<FilteredPage/>}/>
                  <Route path={'/user'} element={<UserPage/>}/>
                  <Route path={'/login'} element={<LoginPage/>}/>
                  <Route path={'/register'} element={<SingUpPage/>}/>
                  <Route path={'/favorite'} element={<FavoritePage/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
