import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsByCategory} from "../../store/categorySlice";
import SingleCategory from "../../components/SingleCategory/SingleCategory";


const CategoryPage = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const {catProductSingle, catProductSingleStatus} = useSelector(state => state.category)


    useEffect(() => {
        dispatch(fetchProductsByCategory(params.id, 'single'))
    },[params])


    return (
        <section>
            {
                catProductSingle &&
                <SingleCategory
                    products={catProductSingle}
                    status={catProductSingleStatus}
                />
            }
        </section>
    );
};

export default CategoryPage;