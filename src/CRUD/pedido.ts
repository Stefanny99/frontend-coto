import { gql } from "@apollo/client";

export const REGISTRAR_PEDIDO = gql`
  mutation registrarPedido($pedido: PedidoInput!) {
    pedido: registrarPedido(pedido: $pedido) {
      id
    }
  }
`;

export const ELIMINAR_PEDIDO = gql`
  mutation eliminarPedido($id: ID!) {
    eliminado: eliminarPedido(id: $id)
  }
`;

export const OBTENER_PEDIDOS = gql`
  mutation obtenerPedidos {
    pedidos: obtenerPedidos {
      id
      cantidad
      estado
      producto {
        id
        precio
        nombre
      }
    }
  }
`;
