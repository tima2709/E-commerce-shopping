import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {STATUS} from "../../utils/status";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import {formatPrice} from "../../utils/helpers";
import './SingleCategory.scss';
import {setModalVisible, setModalData} from "../../store/modalSlice";
import SingleProduct from "../SingleProduct/SingleProduct";

const SingleCategory = ({products, status}) => {
    const dispatch = useDispatch()
    const {isModalVisible} = useSelector(state => state.modal)

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setModalVisible(true));
    }
    if (status === STATUS.ERROR) return <Error/>
    if (status === STATUS.LOADING) return <Loader/>

    const emptyCategoryMsg = <h4 className={'text-red fw-6'}> No items found!</h4>

    return (
        <section className={'cat-single py5 bg-ghost-white'}>
            {
                isModalVisible && <SingleProduct/>
            }
            <div className="container">
                <div className="cat-single-content">
                    <div className="section-title">
                        <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                            {products[0]?.category?.name}
                        </h3>
                    </div>
                    <div>
                        {
                            products.length === 0
                                ? emptyCategoryMsg
                                :
                                <div className="product-items grid">
                                    {
                                        products.map(product =>
                                            <div
                                                className={'product-item bg-white'}
                                                key={product.id}
                                                onClick={() => viewModalHandler(product)}
                                            >
                                                <div className="product-item-img">
                                                    <img src={product?.images[0]} alt=""/>
                                                    <div
                                                        className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">
                                                        {product.category.name}
                                                    </div>
                                                </div>
                                                <div className={'product-item-body'}>
                                                    <h6 className={'product-item-title text-pine-green fw-4 fs-15'}>
                                                        {product.title}
                                                    </h6>
                                                    <div className={'product-item-price text-regal-blue fw-7 fs-18'}>
                                                        {formatPrice(product.price)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleCategory;