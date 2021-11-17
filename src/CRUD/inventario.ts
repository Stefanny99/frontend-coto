import { gql } from "@apollo/client";

export const OBTENER_INVENTARIO = gql`
  query ObtenerInventario {
    inventario: obtenerInventario {
      id
      codigo
      nombre
      precio
      descripcion
      categoria
      cantidad
      imagen
      estado
      whatsapp
      correo
    }
  }
`;

export const REGISTRAR_INVENTARIO = gql`
  mutation registrarInventario($inventario: InventarioInput!) {
    registrado: registrarInventario(inventario: $inventario){
      id
    }
  }
`;

export const EDITAR_INVENTARIO = gql`
  mutation editarInventario($inventario: InventarioInput!) {
    editado: editarInventario(inventario: $inventario)
  }
`;

export const DESACTIVAR_INVENTARIO = gql`
  mutation desactivarInventario($id: ID!) {
    desactivado: desactivarInventario(id: $id)
  }
`;
