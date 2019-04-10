import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { introspectSchema } from "graphql-tools";

const link = new HttpLink({
  uri: "https://50m91p16rp.sse.codesandbox.io/graphql",
  fetch
});

export default async () => {
  const schema = await introspectSchema(link);

  return schema;
};
