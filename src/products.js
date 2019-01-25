import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Form from "./form.js";

export const GET_PRODUCTS_QUERY = gql`
  {
    products {
      id
      title
      thumbnail
      reviews {
        count
        average
      }
      offers {
        reseller
        price
      }
    }
  }
`;

export default () => (
  <Query query={ GET_PRODUCTS_QUERY }>
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.products.map(({ id, title, offers }) => {
        return (
          <div key={ id }>
            <h3>{ title }</h3>
            <ul>
            { offers.map((offer) =>  <li>{ offer.reseller} - { `€ ${offer.price}` }</li>) }
            </ul>
            <Form productId={ id } refetch={ refetch } />
          </div>
        );
      });
    }}
  </Query>
);
