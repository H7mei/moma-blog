import { createImageUrlBuilder, createCurrentUserHook, createClient } from "next-sanity";

export const config = {
  /**
   * Menemukan project dan dataset di dalam sanity.json di dalam studio project
   * These are considered "public", but you can use evironments variabel
   *
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  /**
   * Authentic request
   **/
  useCdn: process.env.NODE_ENV === "production",
};

// Set up the client for fetching data in the getProps page function
export const sanityClient = createClient(config);

/**
 * Set up a helper function for generating image URLs with only the assets references data in you documents
 * Read more: https://www.sanity.io/docs/image-url
 */
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// helper function for ussing the current logged in user account
export const userCurrentUser = createCurrentUserHook(config);
