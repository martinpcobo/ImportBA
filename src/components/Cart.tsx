// ! Imports
// * Libraries
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// * Components
import CartList from './CartList';
// * Context
import CartContext from './contexts/Cart';
// * Types
import { CartContextInterface } from '../interfaces/ComponentsInterfaces';

// ! Cart React Function Component
const Cart: React.FC<void> = () => {
    // context
    const { getTotal, checkCartForStock, Cart } =
        useContext<CartContextInterface>(CartContext);
    // state
    const [purchaseState, setPurchaseState] = useState(false);
    // react-router history
    const history = useHistory();

    useEffect(() => {
        async function checkCartStock(): Promise<void> {
            if (
                purchaseState === false &&
                (await checkCartForStock()) === true
            ) {
                setPurchaseState(true);
            } else if (
                purchaseState === true &&
                (await checkCartForStock()) === false
            ) {
                setPurchaseState(false);
            }
        }
        if (Cart.length > 0) {
            checkCartStock();
        }
    }, [Cart]);

    return (
        <div className='container'>
            <div className='row h-100'>
                <div className='py-2 col-12 d-flex flex-column justify-content-between'>
                    <div className='row mb-5 gy-2 h-100 align-items-center align-content-start'>
                        <CartList listModel={2} />
                    </div>
                    {Cart.length > 0 && getTotal() > 0 ? (
                        <div className='row align-items-center'>
                            <div className='col-6'>
                                <div className='row'>
                                    <p className='m-0 text-start fs-5'>Total</p>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='row'>
                                    <p className='m-0 text-end price fs-5'>
                                        {getTotal()} USD$
                                    </p>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div className='row'>
                                    {purchaseState === true ? (
                                        <button
                                            onClick={() => {
                                                history.push('/Checkout');
                                            }}
                                            className={`btn btn-primary w-100`}
                                        >
                                            Checkout
                                        </button>
                                    ) : (
                                        <button
                                            className={`btn btn-primary w-100 disabled`}
                                        >
                                            Checkout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Cart;
