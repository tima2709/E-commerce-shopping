import React from 'react';
import ProductList from "../../components/ProductList/ProductList";
import {useSelector} from "react-redux";
import FilterProducts from "../../components/FilterProducts/FilterProducts";

const FilteredPage = () => {
    const {filteredProducts, status: statusFilter} = useSelector(state => state.filter)
    const {data: categories} = useSelector((state) => state.category)


    return (
        <>
            <FilterProducts categories={categories}/>
            <ProductList products={filteredProducts} status={statusFilter} titlePage={'FILTERED ITEMS'}/>
        </>
    );
};

export default FilteredPage;