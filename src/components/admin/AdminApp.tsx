/* eslint-disable no-param-reassign */
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  fetchUtils,
  Create,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "../../utils/authProviderReactAdmin";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "SERVER_URL";

const fetchJson = (url: string, options: fetchUtils.Options = {}) => {
  const customHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    customHeaders.set("Authorization", token as string);
  }
  options.headers = customHeaders;
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(baseUrl, fetchJson);

export default function AdminApp() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="users"
        list={ListGuesser}
        edit={EditGuesser}
        create={Create}
        recordRepresentation="name"
      />
      <Resource
        name="posts"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="title"
      />
      <Resource name="comments" list={ListGuesser} edit={EditGuesser} />
    </Admin>
  );
}
