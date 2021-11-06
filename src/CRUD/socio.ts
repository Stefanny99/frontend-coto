import { gql } from "@apollo/client";

export const GetSocios = gql`
  query obtenerSocios {
    test: obtenerSocios {
      id
      cedula
      nombre
      estado
    }
  }
`;
