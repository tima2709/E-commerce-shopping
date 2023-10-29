import React, {useEffect} from 'react';
import Slider from '../../components/Slider/Slider'
import './HomePage.scss'
import Category from "../../components/Category/Category";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchProductsByCategory} from "../../store/categorySlice";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import {fetchProducts} from "../../store/productSlice";
import ProductList from "../../components/ProductList/ProductList";
import FilterProducts from "../../components/FilterProducts/FilterProducts";

const HomePage = () => {
    const dispatch = useDispatch()
    const {data: categories, status: categoryStatus} = useSelector((state) => state.category)
    const {catProductAll: productByCategory, catProductAllStatus} = useSelector(state => state.category)

    const {data: products, status: productStatus} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories());
        dispatch(fetchProductsByCategory(1, 'all'))
        dispatch(fetchProductsByCategory(2, 'all'))
        dispatch(fetchProductsByCategory(3, 'all'))
        dispatch(fetchProductsByCategory(4, 'all'))
    },[])

    return (
        <div className={'home-page'}>
            <Slider/>
            <FilterProducts categories={categories}/>
            <Category categories={categories} status={categoryStatus}/>
            <ProductList products={products} status={productStatus} titlePage={'OUR PRODUCTS'}/>

            <section>
                {
                    productByCategory[0] &&
                    <SingleCategory
                        products={productByCategory[0]}
                        status={catProductAllStatus}
                    />
                }
            </section>
            {/*category two products*/}
            <section>
                {
                    productByCategory[1] &&
                    <SingleCategory
                        products={productByCategory[1]}
                        status={catProductAllStatus}
                    />
                }
            </section>
            <section>
                {
                    productByCategory[3] &&
                    <SingleCategory
                        products={productByCategory[3]}
                        status={catProductAllStatus
                        }
                    />
                }
            </section>
        </div>
    );
};

export default HomePage;