import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { validateDiaryUpdate, validateDirectory } from '../utils/validation.js';
import { createLoginRateLimiter } from '../middlewares/loginRateLimiter.js';
import { errorHandler } from '../utils/http.js';

const directorio={nombre:'Equipo de apoyo',tipo:'grupo_de_apoyo',especialidad:'Orientación',modalidad:'online',ciudad:'Valparaíso',contacto:'equipo@example.com',descripcion:'Acompañamiento para familias'};
test('Directorio valida entrada completa y enums',()=>{
  assert.equal(validateDirectory(directorio).tipo, 'grupo_de_apoyo');
  assert.throws(()=>validateDirectory({...directorio,tipo:'desconocido'}), {status:400});
  assert.throws(()=>validateDirectory({...directorio,contacto:''}), {status:400});
});
test('Bitácora solo acepta cambios válidos y permite borrar la nota',()=>{
  assert.deepEqual(validateDiaryUpdate({nota:null}), {estado:undefined,nota:null});
  assert.equal(validateDiaryUpdate({estado:'triste'}).estado,'triste');
  assert.throws(()=>validateDiaryUpdate({}), {status:400});
  assert.throws(()=>validateDiaryUpdate({nota:'n'.repeat(2001)}), {status:400});
  assert.throws(()=>validateDiaryUpdate({estado:'no_existe'}), {status:400});
});
test('Límite de login cuenta solo fallos 401 y devuelve 429 al superar cupo',()=>{
  let time=0;
  const middleware=createLoginRateLimiter({maxAttempts:2,windowMs:500,now:()=>time});
  const request={ip:'192.0.2.9'};
  function attempt(status){
    const res=new EventEmitter();res.statusCode=status;
    let error;
    middleware(request,res,(err)=>{error=err});
    if (!error) res.emit('finish');
    return error?.status ?? 200;
  }
  assert.equal(attempt(200),200);
  assert.equal(attempt(401),200);
  assert.equal(attempt(401),200);
  assert.equal(attempt(401),429);
  time=501;
  assert.equal(attempt(200),200);
});
test('JSON malformado produce 400 estable sin devolver el texto del parser',()=>{
  let status, data;
  const res={headersSent:false,status(s){status=s;return this},json(body){data=body;return this}};
  const parseError=Object.assign(new SyntaxError('Unexpected token secreto'),{status:400,type:'entity.parse.failed',body:'{invalid'});
  errorHandler(parseError,{},res,()=>{});
  assert.equal(status,400);
  assert.equal(data.error.codigo,'JSON_INVALIDO');
  assert.ok(!JSON.stringify(data).includes('secreto'));
});
