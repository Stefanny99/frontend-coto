import { gql } from "@apollo/client";

export const GetInventario = gql`
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
            email
        }
    }
`;