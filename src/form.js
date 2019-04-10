
import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const ADD_OFFER_MUTATION = gql`
  mutation addOffer($productId: Int!, $reseller: String!, $price: Float) {
    addOffer(productId: $productId, reseller: $reseller, price: $price) {
      productId
      reseller
      price
    }
  }
`;

export default ({ productId, refetch }) => (
  <Mutation mutation={ADD_OFFER_MUTATION}>
    {(addOffer, { loading, data }) => {
      if (loading) return <p>Loading...</p>;
      if (data) return <p>Added!</p>;

      let resellerInput = React.createRef();
      let priceInput = React.createRef();

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            addOffer({
              variables: {
                productId: productId,
                reseller: resellerInput.current.value,
                price: parseFloat(priceInput.current.value)
              }
            });
            refetch();
          }}
        >
          <p>
            <label htmlFor="reseller">Reseller: </label>
            <input type="text" ref={resellerInput} name="reseller" />
          </p>
          <p>
            <label htmlFor="price">Price: </label>
            <input type="text" ref={priceInput} name="price" />
          </p>
          <button type="submit">Add offer</button>
        </form>
      );
    }}
  </Mutation>
);
