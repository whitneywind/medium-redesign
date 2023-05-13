import { createClient, createImageUrlBuilder } from "next-sanity";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
};

// set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// set up a helper fn for generating image urls with only the asset reference data in your documents
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
