import React from 'react';
import {useDispatch} from "react-redux";
import './addProduct.scss';
import {fetchCreateCategory} from "../../store/createCategorySlice";
import {useForm} from "react-hook-form";

const CreateCategory = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        dispatch(fetchCreateCategory(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'add-form'}>
                <h2>Create new category</h2>
                <input
                    type="text" {...register("name")}
                    placeholder={'name'}
                />
                <input
                    type="text" {...register("image")}
                    placeholder={'Url image jpg or png'}
                />
                <input
                    type="submit" />
            </form>
        </div>
    );
};

export default CreateCategory;