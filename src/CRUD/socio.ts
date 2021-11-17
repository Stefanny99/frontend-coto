import { gql } from "@apollo/client";

export const OBTENER_SOCIOS = gql`
  query obtenerSocios {
    socios: obtenerSocios {
      id
      cedula
      nombre
      estado
    }
  }
`;

export const REGISTRAR_SOCIO = gql`
  mutation registrarSocio($socio: SocioInput!) {
    socio: registrarSocio(socio: $socio) {
      id
    }
  }
`;

export const EDITAR_SOCIO = gql`
  mutation editarSocio($socio: SocioInput!) {
    editado: editarSocio(socio: $socio)
  }
`;

export const DESACTIVAR_SOCIO = gql`
  mutation desactivarSocio($id: ID!) {
    desactivado: desactivarSocio(id: $id)
  }
`;
