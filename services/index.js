import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT

export default async function getPosts() {
   const query = gql`
   query Assets {
      postsConnection {
      edges {
         node {
            author {
               name
               id
               bio
               photo {
                  url
               }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
               url
            }
            categories {
               name
               slug
            }
            }
         }
      }
   }
   `

   const result = await request(graphqlAPI, query);
   return result.postsConnection.edges;
}