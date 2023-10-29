import React from 'react';
import {useSelector} from "react-redux";
import ProductList from "../../components/ProductList/ProductList";

const SearchPage = () => {
    const {search, status} = useSelector(state => state.search)

    return (
        <>
            <ProductList products={search} status={status} titlePage={'SEARCHED ITEMS'}/>
        </>
    );
};

export default SearchPage;