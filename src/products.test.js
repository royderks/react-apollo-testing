import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import TestRenderer from "react-test-renderer";
import wait from "waait";

import Products, { GET_PRODUCTS_QUERY } from "./products";

describe("Test the Query component <Product />", () => {
  it("should render without error", () => {
    TestRenderer.create(
      <MockedProvider mocks={[]}>
        <Products />
      </MockedProvider>
    );
  });

  it("should render loading state initially", () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <Products />
      </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree.children).toContain("Loading...");
  });

  it("should render products", async () => {
    const mocks = {
      request: { query: GET_PRODUCTS_QUERY },
      result: {
        data: {
          products: [
            {
              id: 1,
              title: "Test",
              thumbnail: "test.jpg",
              reviews: { count: 0, average: 0 },
              offers: []
            }
          ]
        }
      }
    };

    const component = TestRenderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Products />
      </MockedProvider>
    );

    await wait(5);

    const h3 = component.root.findByType("h3");
    expect(h3.children).toContain("Test");

    expect(component).toMatchSnapshot();
  });

  it("should query the products and render error message", async () => {
    const mocks = {
      request: { query: GET_PRODUCTS_QUERY },
      result: {
        errors: [{ message: "Error!" }],
      },
    };

    const component = TestRenderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Products />
      </MockedProvider>
    );

    await wait(5);

    const tree = component.toJSON();
    expect(tree.children).toContain("Error :(");
  });
});
