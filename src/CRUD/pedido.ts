import { gql } from "@apollo/client";

export const REGISTRAR_PEDIDO = gql`
  mutation registrarPedido($pedido: PedidoInput!) {
    registrado: registrarPedido(pedido: $pedido)
  }
`;

export const ELIMINAR_PEDIDO = gql`
  mutation eliminarPedido($id: ID!) {
    eliminado: eliminarPedido(id: $id)
  }
`;
