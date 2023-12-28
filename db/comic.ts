import mongoose from "mongoose";
import { Comic } from "../types.ts";

const Schema = mongoose.Schema;

const ComicSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  formato: { type: String, required: true },
});

export type ComicModelType = mongoose.Document & Omit<Comic, "id" > & { owner: mongoose.Types.ObjectId };

export const ComicModel = mongoose.model<ComicModelType>("Comic", ComicSchema);