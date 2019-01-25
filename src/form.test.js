import React from "react";
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import Form, { ADD_OFFER_MUTATION } from "./form";

describe("Test the Mutation component <Form />", () => {
  let offerMock = { productId: 1, reseller: "test", price: 1 };

  function createNodeMock(element) {
    if (element.props.name === "reseller") {
      return {
        value: "test"
      };
    }
    if (element.props.name === "price") {
      return {
        value: 1
      };
    }
    return null;
  }

  it("should render without error", () => {
    const wrapper = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <Form />
      </MockedProvider>
    );
  });

  it("should render loading state initially", () => {
    const mock = {
      request: {
        query: ADD_OFFER_MUTATION,
        variables: offerMock
      },
      result: { data: { addOffer: offerMock } }
    };

    const component = TestRenderer.create(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Form productId={1} refetch={() => {}} />
      </MockedProvider>,
      { createNodeMock }
    );

    const form = component.root.findByType("form");
    form.props.onSubmit({
      preventDefault: () => {}
    });

    const tree = component.toJSON();
    expect(tree.children).toContain("Loading...");
  });

  it("should add the offer and render success message", async () => {
    const mock = {
      request: {
        query: ADD_OFFER_MUTATION,
        variables: offerMock
      },
      result: { data: { addOffer: offerMock } }
    };

    const component = TestRenderer.create(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Form productId={1} refetch={() => {}} />
      </MockedProvider>,
      { createNodeMock }
    );

    const form = component.root.findByType("form");
    form.props.onSubmit({
      preventDefault: () => {}
    });

    await wait(5);

    const tree = component.toJSON();
    expect(tree.children).toContain("Added!");
  });

  // it("should add the offer and render error message", async () => {
  //   const mock = {
  //     request: {
  //       query: ADD_OFFER_MUTATION,
  //       variables: offerMock
  //     },
  //     result: {
  //       errors: [{ message: "Error!" }],
  //     },
  //   };
  //
  //   const component = TestRenderer.create(
  //     <MockedProvider mocks={[mock]} addTypename={false}>
  //       <Form productId={1} refetch={() => {}} />
  //     </MockedProvider>,
  //     { createNodeMock }
  //   );
  //
  //   const form = component.root.findByType("form");
  //   form.props.onSubmit({
  //     preventDefault: () => {}
  //   });
  //
  //   await wait(5);
  //
  //   const tree = component.toJSON();
  //   expect(tree.children).toContain("Added!");
  // });
});
