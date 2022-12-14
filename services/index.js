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

export async function getPostDetails(slug) {
   const query = gql`
      query GetPostsDetails($slug: String!) {
         post(where: {slug: $slug}) {
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
            content {
               html
            }
         }
      }`

   const result = await request(graphqlAPI, query, {slug});
   return result.post;
}

export async function getRecentPosts() {
   const query = gql`
      query GetPostsDetails() {
         posts(
            last: 3
            orderBy: createdAt_ASC
         ) {
            title
            featuredImage {
               url
            }
            createdAt
            slug
         }
      }
   `

   const result = await request(graphqlAPI, query);
   return result.posts;
}

export async function getSimilarPosts(slug, categories) {
   const query = gql`
      query GetPostsDetails($slug: String!, $categories: [String!]) {
         posts(
            where: {
               slug_not: $slug, AND: {categories_some: {slug_in: $categories}}
            }
            orderBy: createdAt_ASC
            last: 3
         ) {
            title
            featuredImage {
               url
            }
            createdAt
            slug
         }
      }
   `

   const result = await request(graphqlAPI, query, {slug, categories});
   return result.posts;
}

export async function getCategories() {
   const query = gql`
      query GetCategories {
         categories {
            name
            slug
         }
      }
   `

   const result = await request(graphqlAPI, query);
   return result.categories;
}

export async function getCategoryPost(slug) {
   const query = gql`
     query GetCategoryPost($slug: String!) {
       postsConnection(where: {categories_some: {slug: $slug}}) {
         edges {
           cursor
           node {
             author {
               bio
               name
               id
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
   `;

   const result = await request(graphqlAPI, query, { slug });
   return result.postsConnection.edges;
};

export async function submitComment(obj) {
   const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
   });

   return result.json();
}

export async function getComments(slug) {
   const query = gql`
      query GetComments($slug: String!) {
         comments(where: {post: {slug: $slug}}) {
            name
            createdAt
            comment
         }
      }
   `

   const result = await request(graphqlAPI, query, {slug});
   return result.comments;
}