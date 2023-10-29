import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {Cart, Category, Home} from "./pages";
import Footer from "./components/Footer/Footer";
import store from "./store/store"
import {Provider} from "react-redux";
import SearchPage from "./pages/SearchPage/SearchPage";
import FilteredPage from "./pages/FilteredPage/FilteredPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <BrowserRouter>
              <Navbar/>
              <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'/category/:id'} element={<Category/>}/>
                  <Route path={'/cart'} element={<Cart/>}/>
                  <Route path={'/search'} element={<SearchPage/>}/>
                  <Route path={'/filter'} element={<FilteredPage/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
