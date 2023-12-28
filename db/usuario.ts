import mongoose from "mongoose";
import { Usuario } from "../types.ts";
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    coleccion: {type: Schema.Types.ObjectId, required: true, ref: "Coleccion"}
  });

  export type UsuarioModelType = mongoose.Document & Omit<Usuario, "id" >;
  
  export const UsuarioModel = mongoose.model<UsuarioModelType>("Usuario", UsuarioSchema);