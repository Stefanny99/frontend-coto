import { gql } from "@apollo/client";

export const OBTENER_INVENTARIO = gql`
  query ObtenerInventario {
    obtenerInventario {
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
  registrarInventario($inventario: InventarioInput!){
    registrado: registrarInventario(inventario: $inventario)
  }
`;

export const EDITAR_INVENTARIO = gql`
  editarInventario($inventario: InventarioInput!){
    editado: editarInventario(inventario: $inventario)
  }
`;

export const DESACTIVAR_INVENTARIO = gql`
  desactivarInventario($id: ID!){
    desactivado: desactivarInventario(id: $id)
  }
`;
