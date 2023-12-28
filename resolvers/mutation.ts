import { GraphQLError } from "graphql";
import { UsuarioModel, UsuarioModelType } from "../db/usuario.ts";
import { ColeccionModel, ColeccionModelType } from "../db/coleccion.ts";
import { ComicModel, ComicModelType } from "../db/comic.ts";
import mongoose from "mongoose";

export const Mutation = {
    addUsuario:async (_: unknown, args:{nombre: string, correo: string}): Promise<UsuarioModelType> => {
        const coleccion={
            nombre: args.nombre+"'s collection",
            comics: []
        }
        const newcoleccion= await ColeccionModel.create(coleccion)

        const usuario = {
            nombre: args.nombre,
            correo: args.correo,
            coleccion: newcoleccion.id
          };
          const newUsuario = await UsuarioModel.create(usuario);
          return newUsuario;
    },
    updateUsuario: async (_: unknown, args:{id: string, nombre: string, correo: string}): Promise<UsuarioModelType> => {
        const user = await UsuarioModel.findByIdAndUpdate(
            args.id,
            {nombre: args.nombre, correo: args.correo},
            {new: true, runValidators: true}
        );
        const colect = await ColeccionModel.findByIdAndUpdate(
            user?.coleccion,
            {nombre: user?.nombre+"' collection"},
            {new: true, runValidators: true}
        );
        return user;
    },
    //puesto que el delete solo devuelve el usuario borrado, aunque tanbien realice borrado en cadena de su coleccion, solo puede mostrar el usuario porque si se intenta acceder a la coleccion el código lanzara error porque esta ya no existe
    deleteUsuario:async (_: unknown, args:{id:string}) => {
        const usuario = await UsuarioModel.findByIdAndDelete(args.id);
        if (!usuario) {
            throw new GraphQLError(`No se encontro usuario con id ${args.id}`, {
                extensions: { code: "NOT_FOUND" },
            });
        }
        const coleccion = await ColeccionModel.findByIdAndDelete(usuario.coleccion);
        if (!coleccion){
            throw new GraphQLError(`No se encontro coleccion con id ${usuario.coleccion}`, {
                extensions: { code: "NOT_FOUND" },
            });
        }
        return usuario;
    },
    addComic:async (_: unknown, args:{titulo: string, descripcion: string, formato: string, coleccion:string}): Promise<ComicModelType> => {
        const comic = {
            titulo: args.titulo,
            descripcion: args.descripcion,
            formato: args.formato
        };
        const newComic = await ComicModel.create(comic);
        const colect = await ColeccionModel.findById(args.coleccion);
        if(!colect){
            throw new GraphQLError(`No se encontro coleccion con id ${args.coleccion}`, {
                extensions: { code: "NOT_FOUND" },
            });
        }
        colect?.comics.push(newComic.id);
        await colect.save();
        return newComic;
    },
    updateComic:async (_: unknown, args:{id:string, titulo: string, descripcion: string, formato: string, coleccion:string}): Promise<ComicModelType> => {
        const comic = await ComicModel.findByIdAndUpdate(
            args.id,
            {titulo: args.titulo, descripcion: args.descripcion, formato: args.formato},
            {new: true, runValidators: true}
        );
        const colect = await ColeccionModel.findById(args.coleccion);
        if(!colect){
            throw new GraphQLError(`No se encontro coleccion con id ${args.coleccion}`, {
                extensions: { code: "NOT_FOUND" },
            });
        }
        colect?.comics.push(comic.id);
        await colect.save();
        return comic;
    },
    deleteComic:async (_: unknown, args:{id:string}) => {
        const comic = await ComicModel.findByIdAndDelete(args.id);
        if (!comic) {
            throw new GraphQLError(`No se encontro comic con id ${args.id}`, {
                extensions: { code: "NOT_FOUND" },
            });
        }
        return comic;
    }
};
