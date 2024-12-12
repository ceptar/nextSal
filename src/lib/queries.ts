export const GET_COLLECTION_PRODUCTS = /* GraphQL */ `
query getCollectionProducts {
    collections (
      first: $first 
      after: $after
      channel: $channel 
    filter: $filter){
      edges {
        node {
          id
          name
          slug
          
    products  (
       
      filter: { 
        attributes: $attributes
      },
      sortBy: $sortBy
      first: $firstProducts
      ){
      totalCount
      edges {
        node {
          id
          name
          slug
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
              stop {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          category {
            id
            name
            slug
          }
         media {
            id
            type
            url
          }
          attributes {
            attribute {
              id
              name
              slug
            }
            values {
              slug
              name
              id
            }
          }
        }
      cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
    }}}
    `;


export const GET_COLLECTION_ID = /* GraphQL */ `
query GetCollectionId (
    $filter: CollectionFilterInput
    $channel: String!
    $first: Int
    $productFilter: ProductFilterInput
    ) {
    collections(
        channel: $channel
        filter: $filter
        first: $first
        ) {
            edges {
      node {
        id
        name
        slug
        products(
          first: 12
          filter: $productFilter
        ) {
          totalCount
          edges {
            node {
              id
              name
              slug
              pricing {
                priceRange {
                  start {
                    gross {
                      amount
                      currency
                    }
                  }
                  stop {
                    gross {
                      amount
                      currency
                    }
                  }
                }
              }
              category {
                id
                name
                slug
              }
              thumbnail(size: 2048, format: ORIGINAL) {
                url
                alt
              }
              attributes {
                attribute {
                  id
                  name
                  slug
                }
                values {
                  slug
                  name
                  id
                }
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
}
`;

