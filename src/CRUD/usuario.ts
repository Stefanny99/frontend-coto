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

export const OBTENER_USUARIO = gql`
  query usuarioPorId($id: ID) {
    user: usuarioPorId(id: $id) {
      id
      nombre
      rol
    }
  }
`;

export const EDITAR_USUARIO = gql`
  mutation editarUsuario($usuario: UsuarioInput!) {
    editado: editarUsuario(usuario: $usuario)
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation eliminarUsuario($id: ID!) {
    eliminado: eliminarUsuario(id: $id)
  }
`;
