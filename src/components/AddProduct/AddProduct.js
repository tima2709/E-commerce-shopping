import React from 'react';
import {useForm} from "react-hook-form";
import './addProduct.scss';
import {useDispatch} from "react-redux";
import {fetchAddProduct} from "../../store/addProductSlice";

const AddProduct = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        dispatch(fetchAddProduct(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'add-form'}>
                <h2>Добавить новый продукт</h2>
                <input
                    type="text" {...register("title")}
                    placeholder={'title'}
                />
                <input
                    type="number" {...register("price")}
                    placeholder={'price'}
                />
                <input
                    type="text" {...register("description")}
                    placeholder={'description'}
                />
                <input
                    type="number" {...register("categoryId")}
                    placeholder={'categoryId'}
                />
                <input
                    type="text" {...register("images")}
                    placeholder={'Url image jpg or png'}
                />
                <input
                    type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;