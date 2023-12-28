import { GraphQLError } from "graphql";
import { UsuarioModelType } from "../db/usuario.ts";
import { ColeccionModel, ColeccionModelType } from "../db/coleccion.ts";

export const Usuario = {
    coleccion: async (user: UsuarioModelType): Promise<ColeccionModelType | null> => {
        const coleccion = await ColeccionModel.findById({_id: user.coleccion}).exec();
        if (!coleccion) {
          throw new GraphQLError(`No se encontro una coleccion con id ${user.coleccion}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return coleccion;
      },
};