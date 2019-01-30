import React from "react";
import EasygraphqlTester from "easygraphql-tester";

import getSchema from "./getSchema";
import { GET_PRODUCTS_QUERY } from "../products";
import { ADD_OFFER_MUTATION } from "../form";

let tester;
let schema;

describe("Test the queries in <Product />", () => {
  it("Should be a valid query", async () => {
    schema = await getSchema();
    tester = new EasygraphqlTester(schema);

    tester.test(true, GET_PRODUCTS_QUERY);
  });

  it("Should return valid data types", () => {
    const { data: { products } } = tester.mock(GET_PRODUCTS_QUERY);

    expect(Array.isArray(products)).toBe(true);
  });
});

describe("Test the mutations in <Form />", () => {
  it("Should be a valid mutation", async () => {
    schema = await getSchema();
    tester = new EasygraphqlTester(schema);

    tester.test(true, ADD_OFFER_MUTATION, {
      productId: 1,
      reseller: "test",
      price: 1
    });
  });

  it("Should be a fail with a string on the productId", () => {
    tester.test(false, ADD_OFFER_MUTATION, {
      productId: "1"
    });
  });
});
