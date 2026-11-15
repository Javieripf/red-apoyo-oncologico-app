import { randomUUID } from 'node:crypto';
import { findResourceById,findResources,recordView,createResourceRecord,updateResourceRecord,deleteResourceRecord } from '../models/resourceModel.js';
import { validateResource, choice, relaciones, categorias } from '../utils/validation.js';
import { HttpError, asyncHandler, success } from '../utils/http.js';

export const listResources=asyncHandler(async (req,res)=>{
  const perfil=req.query.perfil?choice(req.query.perfil,relaciones,'Perfil'):undefined;
  const categoria=req.query.categoria?choice(req.query.categoria,categorias,'Categoría'):undefined;
  success(res,await findResources({perfil,categoria}));
});
export const getResource=asyncHandler(async (req,res)=>{
  const resource=await findResourceById(req.params.id);
  if (!resource) throw new HttpError(404,'Recurso no encontrado.','NO_ENCONTRADO');
  if (req.user.rol==='usuario') {
    await recordView(req.user.id,req.params.id);
    return success(res,await findResourceById(req.params.id));
  }
  success(res,resource);
});
export const createResource=asyncHandler(async (req,res)=>{
  const b=validateResource(req.body);
  success(res,await createResourceRecord(randomUUID(),b),201);
});
export const updateResource=asyncHandler(async (req,res)=>{
  const b=validateResource(req.body);
  const resource=await updateResourceRecord(req.params.id,b);
  if (!resource) throw new HttpError(404,'Recurso no encontrado.','NO_ENCONTRADO');
  success(res,resource);
});
export const deleteResource=asyncHandler(async (req,res)=>{
  const deleted=await deleteResourceRecord(req.params.id);
  if (!deleted) throw new HttpError(404,'Recurso no encontrado.','NO_ENCONTRADO');
  res.status(204).end();
});
