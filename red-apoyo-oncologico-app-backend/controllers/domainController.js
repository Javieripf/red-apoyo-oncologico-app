import { randomUUID } from 'node:crypto';
import {
  getDiary,createDiaryEntry,updateDiaryEntry,removeDiaryEntry,
  getDirectory,getDirectoryEntry,createDirectoryEntry,updateDirectoryEntry,removeDirectoryEntry,
  getFavorites,resourceExists,addFavoriteRecord,removeFavoriteRecord,getResourceMetrics
} from '../models/domainModel.js';
import { choice,estados,string,validateDiaryUpdate,validateDirectory } from '../utils/validation.js';
import { HttpError,asyncHandler,success } from '../utils/http.js';
import { geocodeCity } from '../services/geocoding.js';

export const listDiary=asyncHandler(async(req,res)=>success(res,await getDiary(req.user.id)));
export const addDiary=asyncHandler(async(req,res)=>{
  const estado=choice(req.body?.estado,estados,'Estado');
  const nota=req.body?.nota==null || req.body?.nota===''?null:string(req.body?.nota,'Nota',1,2000);
  success(res,await createDiaryEntry({id:randomUUID(),userId:req.user.id,estado,nota}),201);
});
export const editDiary=asyncHandler(async(req,res)=>{
  const cambios=validateDiaryUpdate(req.body);
  const entry=await updateDiaryEntry(req.params.id,req.user.id,cambios);
  if (!entry) throw new HttpError(404,'Registro no encontrado.','NO_ENCONTRADO');
  success(res,entry);
});
export const deleteDiary=asyncHandler(async(req,res)=>{
  if (!await removeDiaryEntry(req.params.id,req.user.id)) throw new HttpError(404,'Registro no encontrado.','NO_ENCONTRADO');
  res.status(204).end();
});
export const listDirectory=asyncHandler(async(req,res)=>success(res,await getDirectory()));
export const locateDirectoryCity=asyncHandler(async(req,res)=>{
  const entry=await getDirectoryEntry(req.params.id);
  if (!entry) throw new HttpError(404,'Entrada no encontrada.','NO_ENCONTRADO');
  if (entry.ciudad.toLocaleLowerCase('es')==='nacional' || entry.modalidad==='online')
    throw new HttpError(400,'Esta entrada no tiene una ciudad presencial.','SIN_UBICACION');
  success(res,await geocodeCity(entry.ciudad));
});
export const addDirectory=asyncHandler(async(req,res)=>success(res,await createDirectoryEntry(randomUUID(),validateDirectory(req.body)),201));
export const editDirectory=asyncHandler(async(req,res)=>{
  const entry=await updateDirectoryEntry(req.params.id,validateDirectory(req.body));
  if (!entry) throw new HttpError(404,'Entrada no encontrada.','NO_ENCONTRADO');
  success(res,entry);
});
export const deleteDirectory=asyncHandler(async(req,res)=>{
  if (!await removeDirectoryEntry(req.params.id)) throw new HttpError(404,'Entrada no encontrada.','NO_ENCONTRADO');
  res.status(204).end();
});
export const listFavorites=asyncHandler(async(req,res)=>success(res,await getFavorites(req.user.id)));
export const addFavorite=asyncHandler(async(req,res)=>{
  if (!await resourceExists(req.params.id)) throw new HttpError(404,'Recurso no encontrado.','NO_ENCONTRADO');
  const created=await addFavoriteRecord(req.user.id,req.params.id);
  success(res,{recursoId:req.params.id,creado:created},created?201:200);
});
export const removeFavorite=asyncHandler(async(req,res)=>{
  await removeFavoriteRecord(req.user.id,req.params.id);
  res.status(204).end();
});
export const getMetrics=asyncHandler(async(req,res)=>success(res,await getResourceMetrics()));
