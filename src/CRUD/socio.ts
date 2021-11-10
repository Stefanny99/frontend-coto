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

export const PostSocios = gql`
  mutation registrarSocio($socio: SocioInput!){
    registrarSocio(socio: $socio){
      cedula
      nombre
      estado
    }
  }
`;
