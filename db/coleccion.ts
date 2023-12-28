import mongoose from "mongoose";
import { Coleccion } from "../types.ts";
const Schema = mongoose.Schema;

const ColeccionSchema = new Schema({
  nombre: { type: String, required: true },
  comics: {type: [Schema.Types.ObjectId], required: true, ref: "Comic"}
});

export type ColeccionModelType = mongoose.Document & Omit<Coleccion, "id" >;

export const ColeccionModel = mongoose.model<ColeccionModelType>("Coleccion", ColeccionSchema);