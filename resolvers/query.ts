import { GraphQLError } from "graphql";
import { UsuarioModel, UsuarioModelType } from "../db/usuario.ts";
import { ColeccionModel, ColeccionModelType } from "../db/coleccion.ts";
import { ComicModel, ComicModelType } from "../db/comic.ts";

export const Query = {
    getusuario:async (_: unknown, args: { id: string }): Promise<UsuarioModelType> => {
        const usuario = await UsuarioModel.findById(args.id);
        if (!usuario) {
        throw new GraphQLError(`No se encontro usuario con id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
        });
        }
        return usuario;
    },
    getallusuarios:async (): Promise<UsuarioModelType[]> => {
        const usuarios = await UsuarioModel.find().exec();
        return usuarios;
    },
    getcomic:async (_: unknown, args: { id: string }): Promise<ComicModelType> => {
        const comic = await ComicModel.findById(args.id);
        if (!comic) {
        throw new GraphQLError(`No se encontro comic con id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
        });
        }
        return comic;
    },
    getallcomics:async (): Promise<ComicModelType[]> => {
        const comics = await ComicModel.find().exec();
        return comics;
    },
};