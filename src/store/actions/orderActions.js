import { getPromoByCode } from "../../api/promo";

export const checkoutOrder = (checkoutData, token) => {
  return async (dispatch, getState) => {

    try {
      dispatch({ type: "CHECKOUT_REQUEST" });

      let promoId = null;

      // promo_code -> promo_id
        if (checkoutData.promo_code) {

        const promoResponse = await fetch(
            `http://localhost:8000/promos/check/${checkoutData.promo_code}`
        );

        if (!promoResponse.ok) {
            throw new Error("Promo code not found");
        }

        const promo = await promoResponse.json();

        promoId = promo.promo_id;
        }

      const payload = {
        items: checkoutData.items,
        promo_id: promoId
      };

      const response = await fetch(
        "http://localhost:8001/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = await response.json();

      dispatch({
        type: "CHECKOUT_SUCCESS",
        payload: data
      });

    } catch (error) {

      dispatch({
        type: "CHECKOUT_ERROR",
        payload: error.message
      });

    }
  };
};