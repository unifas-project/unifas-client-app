import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const FilterForm = () => {
    const dispatch = useDispatch();
    const prices = useSelector(state => state.prices);
    const colors = useSelector(state => state.colors);
    const sizes = useSelector(state => state.sizes);

    // const handleCheckboxChange = (id, type) => {
    //     dispatch(toggleCheckbox(id, type));
    // };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('YOUR_API_URL', values);
            console.log(response.data);
            setSubmitting(false);
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                ...prices.reduce((acc, price) => ({ ...acc, [price.id]: price.checked }), {}),
                ...colors.reduce((acc, color) => ({ ...acc, [color.id]: color.checked }), {}),
                ...sizes.reduce((acc, size) => ({ ...acc, [size.id]: size.checked }), {})
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="col-lg-3 col-md-12">
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
                            {prices.map((price, index) => (
                                <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <Field 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`price-${index}`} 
                                        name={price.id}
                                    />
                                    <label className="custom-control-label" htmlFor={`price-${index}`}>{price.range}</label>
                                    <span className="badge border font-weight-normal">{price.count}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                            {colors.map((color, index) => (
                                <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <Field 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`color-${index}`} 
                                        name={color.id}
                                    />
                                    <label className="custom-control-label" htmlFor={`color-${index}`}>{color.name}</label>
                                    <span className="badge border font-weight-normal">{color.count}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
                            {colors.map((size, index) => (
                                <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <Field 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`color-${index}`} 
                                        name={size.id}
                                    />
                                    <label className="custom-control-label" htmlFor={`color-${index}`}>{size.name}</label>
                                    <span className="badge border font-weight-normal">{size.count}</span>
                                </div>
                            ))}
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FilterForm;