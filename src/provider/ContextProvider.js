/* eslint-disable */
import fetch from 'isomorphic-fetch';
import React, { useState, useEffect } from 'react';
import Client from 'shopify-buy';

import Context from 'context/StoreContext';

const client = Client.buildClient(
  {
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.SHOP_NAME}.myshopify.com`,
  },
  fetch,
);

const ContextProvider = ({ children }) => {
  const initialStoreState = {
    client,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  };

  const [store, updateStore] = useState(initialStoreState);
  let isRemoved = false;

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined';
      const existingCheckoutID = isBrowser ? localStorage.getItem('shopify_checkout_id') : null;

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id);
        }

        updateStore(prevState => ({ ...prevState, checkout }));
      };

      const createNewCheckout = () => store.client.checkout.create();
      const fetchCheckout = id => store.client.checkout.fetch(id);

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID);
          // Make sure this cart hasn’t already been purchased.
          if (!isRemoved && !checkout.completedAt) {
            setCheckoutInState(checkout);
            return;
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null);
        }
      }

      const newCheckout = await createNewCheckout();
      if (!isRemoved) {
        setCheckoutInState(newCheckout);
      }
    };

    initializeCheckout();
  }, [isRemoved, store.client.checkout]);

  useEffect(
    () => () => {
      isRemoved = true;
    },
    [],
  );

  return (
    <Context.Provider
      value={{
        store,
        addVariantToCart: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.');
            return;
          }

          updateStore(prevState => ({ ...prevState, adding: true }));

          const { checkout, client } = store;

          const checkoutId = checkout.id;
          const lineItemsToUpdate = [{ variantId, quantity: parseInt(quantity, 10) }];

          return client.checkout.addLineItems(checkoutId, lineItemsToUpdate).then(checkout => {
            updateStore(prevState => ({ ...prevState, checkout, adding: false }));
          });
        },
        removeLineItem: (client, checkoutID, lineItemID) =>
          client.checkout.removeLineItems(checkoutID, [lineItemID]).then(res => {
            updateStore(prevState => ({ ...prevState, checkout: res }));
          }),
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [{ id: lineItemID, quantity: parseInt(quantity, 10) }];

          return client.checkout.updateLineItems(checkoutID, lineItemsToUpdate).then(res => {
            updateStore(prevState => ({ ...prevState, checkout: res }));
          });
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
