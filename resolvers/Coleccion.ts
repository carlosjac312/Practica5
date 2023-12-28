import { ColeccionModelType } from "../db/coleccion.ts";
import { ComicModel, ComicModelType } from "../db/comic.ts";
import { GraphQLError } from "graphql";

export const Coleccion = {
  comics: async (parent:ColeccionModelType):Promise<ComicModelType[]> =>{
    const comics:ComicModelType[] = await parent.comics.map(async (i:string) =>{
      const res=await ComicModel.findById({_id:i}).exec()
      if(!res){
        throw new GraphQLError('Internal API error', {
          extensions: { code: "INTERNAL_ERROR" },
        });
      }
      return res
    })
    if(!comics||comics==null)return [];
    return comics
  }
};