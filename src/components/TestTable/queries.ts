import { gql } from "@apollo/client";

export const QUERY_ALL_DATA = gql`
  query GetTestTableData {
    test: GetTestTableData {
      id
      testing_string
    }
  }
`;
