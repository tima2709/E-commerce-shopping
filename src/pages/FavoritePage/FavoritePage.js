import React from 'react';
import {useSelector} from "react-redux";
import ProductList from "../../components/ProductList/ProductList";

const FavoritePage = () => {

    const {data}  = useSelector(state => state.favorite)


    return (
        <>
            <ProductList products={data}/>
        </>
    );
};

export default FavoritePage;