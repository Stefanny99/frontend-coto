import { gql } from "@apollo/client";

export const REGISTRAR_PEDIDO = gql`
  registrarPedido($pedido: PedidoInput!){
    registrado: registrarPedido(pedido: $pedido)
  }
`;

export const ELIMINAR_PEDIDO = gql`
  eliminarPedido($id: ID!){
    eliminado: eliminarPedido(id: $id)
  }
`;
