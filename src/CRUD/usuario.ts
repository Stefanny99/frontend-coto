import { gql } from "@apollo/client";

export const LOGIN = gql`
  query login($usuario: String!, $contrasena: String!) {
    user: login(usuario: $usuario, contrasena: $contrasena) {
      id
      nombre
      rol
    }
  }
`;
