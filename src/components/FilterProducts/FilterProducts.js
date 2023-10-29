import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {axiosFilter} from "../../store/filterSlice";
import './FilterProducts.scss';
import {useNavigate} from "react-router-dom";

const FilterProducts = ({categories}) => {
    const dispatch = useDispatch()
    const  navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [categoryId, setCategoryId] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        const errorMsg = document.querySelector(".error-message")
        if(title === '' || minPrice === '' || maxPrice === '' || categoryId === '') {
            errorMsg.style.display = "flex"
        } else {
            dispatch(axiosFilter(title, minPrice, maxPrice, categoryId))
            navigate('/filter')
            errorMsg.style.display = "none"
            setTitle('')
            setMinPrice('')
            setMaxPrice('')
            setCategoryId('')
        }
    }
    return (
        <div className={'container'}>
            <form onSubmit={handleSubmit} className={'filterProducts'}>
                <p className="error-message">All fields required!</p>
                <div className={'filter-form'}>
                    <div className={'filter-inputs'}>
                        <label htmlFor="">Name of product</label>
                        <input
                            type="text"
                            placeholder={'Name of product'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div  className={'filter-inputs'}>
                        <label htmlFor="">Select category</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} name="category" id="">
                            <option>Category</option>
                            {
                                categories.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={'filter-inputs'}>
                        <label htmlFor="">min price</label>
                        <input
                            type="number"
                            placeholder={'min price of product'}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className={'filter-inputs'}>
                        <label htmlFor="">max price</label>
                        <input
                            type="number"
                            placeholder={'max price of product'}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <button type={'submit'}>Search</button>
                </div>
            </form>
        </div>
    );
};

export default FilterProducts;