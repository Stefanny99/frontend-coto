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

export const EDITAR_USUARIO = gql`
  editarUsuario($usuario: UsuarioInput!){
    editado: editarUsuario(usuario: $usuario)
  }
`;

export const ELIMINAR_USUARIO = gql`
  eliminarUsuario($id: ID!){
    eliminado: eliminarUsuario(id: $id)
  }
`;
