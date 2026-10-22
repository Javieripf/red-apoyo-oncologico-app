import { randomUUID } from 'node:crypto';
import { getDiary,createDiaryEntry,getDirectory,getFavorites,resourceExists,addFavoriteRecord,removeFavoriteRecord,getResourceMetrics } from '../models/domainModel.js';
import { choice,estados,string } from '../utils/validation.js';
import { HttpError,asyncHandler,success } from '../utils/http.js';

export const listDiary=asyncHandler(async(req,res)=>success(res,await getDiary(req.user.id)));
export const addDiary=asyncHandler(async(req,res)=>{
  const estado=choice(req.body?.estado,estados,'Estado');
  const nota=req.body?.nota==null || req.body?.nota===''?null:string(req.body?.nota,'Nota',1,2000);
  success(res,await createDiaryEntry({id:randomUUID(),userId:req.user.id,estado,nota}),201);
});
export const listDirectory=asyncHandler(async(req,res)=>success(res,await getDirectory()));
export const listFavorites=asyncHandler(async(req,res)=>success(res,await getFavorites(req.user.id)));
export const addFavorite=asyncHandler(async(req,res)=>{
  if (!await resourceExists(req.params.id)) throw new HttpError(404,'Recurso no encontrado.','NO_ENCONTRADO');
  await addFavoriteRecord(req.user.id,req.params.id);
  success(res,{recursoId:req.params.id},201);
});
export const removeFavorite=asyncHandler(async(req,res)=>{
  await removeFavoriteRecord(req.user.id,req.params.id);
  res.status(204).end();
});
export const getMetrics=asyncHandler(async(req,res)=>success(res,await getResourceMetrics()));
