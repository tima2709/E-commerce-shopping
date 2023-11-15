import React, {useEffect, useState} from 'react';
import "./Navbar.scss"
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {fetchCategories} from "../../store/categorySlice";
import {getCartTotal} from "../../store/cartSlice";
import {axiosSearchProducts} from "../../store/searchSlice";
import SearchPage from "../../pages/SearchPage/SearchPage";

const Navbar = () => {
    const dispatch = useDispatch()
    const {data: categories} = useSelector(state => state.category)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const {totalItems} = useSelector(state => state.cart)
    const [searchItem, setSearchItem] = useState('')

    const {isAuth} = useSelector(state => state.auth)

    const handleSearch = () => {
        dispatch(axiosSearchProducts(searchItem))
        setSearchItem('')
    }

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(getCartTotal())
    }, [dispatch]);

    // const heyUser = () => {
    //     // if(!isAuth) return toast.error('Please sing in sir')
    // }


    return (
        <nav className={`navbar`}>
            <div className="navbar-content">
                <div className="container">
                    <div className="navbar-top flex flex-between">
                        <Link to={'/'} className={'navbar-brand'}>
                            <span className={'text-regal-blue'}>Shopping</span>
                            <span className={'text-gold'}>Hub.</span>
                        </Link>
                        <div className={'navbar-search flex'}>
                            <input type="text" placeholder={'Search here ...'} value={searchItem}
                                   onChange={(e) => setSearchItem(e.target.value)}/>
                            <Link to={'/search'}>
                                <button
                                    type={'button'}
                                    className={'navbar-search-btn'}
                                    onClick={handleSearch}
                                >
                                    <i className={'fas fa-search'}></i>
                                    <div style={{display: 'none'}}>
                                        <SearchPage/>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className="navbar-btns">
                            <Link to={'/favorite'} className={'add-to-cart-btn flex'}>
                                <span className={'btn-ico'}>
                                    <i className="fa-regular fa-heart"></i>
                                </span>
                                <div className={'btn-txt fw-5'}>
                                    favorite
                                </div>
                            </Link>
                            <Link to={'/cart'} className={'add-to-cart-btn flex'}>
                                <span className={'btn-ico'}>
                                    <i className={'fas fa-shopping-cart'}></i>
                                </span>
                                <div className={'btn-txt fw-5'}>
                                    cart <span className={'cart-count-value'}>{totalItems}</span>
                                </div>
                            </Link>

                        </div>
                        <div className={'user-link'}>
                            <Link to={'/user'}>
                                <button className={'user-btn'}>
                                    {
                                        isAuth ? <i className="fa-solid fa-user" style={{color: "#ffea00"}}></i>
                                            : <i className="fa-solid fa-user"></i>
                                    }
                                </button>
                            </Link>
                            <Link to={'/login'}>
                                <button className={'login-btn'}>Login</button>
                            </Link>
                            <Link to={'/register'}>
                                <button className={'register-btn'}>Sing Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="navbar-bottom bg-regal-blue">
                    <div className="container flex flex-between">
                        <ul className={`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ''}`}>
                            <button type={'button'} className={'navbar-hide-btn text-white'}
                                    onClick={() => setIsSidebarOpen(false)}>
                                <i className={'fas fa-times'}></i>
                            </button>
                            {
                                categories?.slice(0, 10).map(category => (
                                    <li key={category.id}>
                                        <Link
                                            to={`/category/${category.id}`}
                                            className={'nav-link text-white'}
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            {category.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <button
                            type={'button'} className={'navbar-show-btn text-gold'}
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <i className={'fas fa-bars'}></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;