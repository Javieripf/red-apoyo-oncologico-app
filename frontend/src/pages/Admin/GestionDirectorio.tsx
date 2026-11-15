import React, { useState } from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonItem, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButton, IonToast, IonAlert, IonSpinner, useIonViewWillEnter } from '@ionic/react';
import Header from '@/components/Header';
import AdminNav from './AdminNav';
import * as api from '@/services/api';
import type { EntradaDirectorio } from '@/types';
import type { DatosDirectorio } from '@/services/api';

const vacio: DatosDirectorio = {
  nombre: '', tipo: 'especialista', especialidad: '', modalidad: 'online',
  ciudad: '', contacto: '', descripcion: ''
};
const campos: { nombre: keyof DatosDirectorio; etiqueta: string }[] = [
  { nombre: 'nombre', etiqueta: 'Nombre' },
  { nombre: 'especialidad', etiqueta: 'Especialidad' },
  { nombre: 'ciudad', etiqueta: 'Ciudad' },
  { nombre: 'contacto', etiqueta: 'Contacto' },
];
const GestionDirectorio: React.FC = () => {
  const [entradas, setEntradas] = useState<EntradaDirectorio[]>([]);
  const [form, setForm] = useState<DatosDirectorio>(vacio);
  const [editarId, setEditarId] = useState<string | null>(null);
  const [borrarId, setBorrarId] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const refrescar = async () => setEntradas(await api.listarDirectorio());
  useIonViewWillEnter(() => {
    setCargando(true);
    refrescar().catch(() => { setError(true); setMensaje('No se pudo consultar el directorio.'); })
      .finally(() => setCargando(false));
  });
  const reset = () => { setEditarId(null); setForm({ ...vacio }); };
  const editar = (e: EntradaDirectorio) => {
    const { id: _id, ...datos } = e;
    setEditarId(e.id); setForm(datos);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const guardar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setGuardando(true);
    try {
      if (editarId) await api.modificarEntradaDirectorio(editarId,form);
      else await api.crearEntradaDirectorio(form);
      await refrescar(); reset(); setError(false); setMensaje('Directorio actualizado correctamente.');
    } catch (e) { setError(true); setMensaje(e instanceof Error ? e.message : 'No se pudo guardar.'); }
    finally { setGuardando(false); }
  };
  const eliminar = async () => {
    const id=borrarId; setBorrarId(null);
    if (!id) return;
    setGuardando(true);
    try { await api.eliminarEntradaDirectorio(id); await refrescar(); setError(false); setMensaje('Entrada eliminada.'); }
    catch { setError(true); setMensaje('No se pudo eliminar la entrada.'); }
    finally { setGuardando(false); }
  };
  return <IonPage>
    <Header titulo="Gestión de directorio" mostrarSalir />
    <IonContent className="ra-content"><div className="ra-page-wrap">
      <AdminNav />
      <h2>{editarId ? 'Editar entrada' : 'Agregar especialista o grupo'}</h2>
      <form onSubmit={guardar} className="ra-surface" style={{ padding: 16, marginBottom: 24 }}>
        {campos.map(({nombre,etiqueta}) => <IonItem key={nombre}>
          <IonInput label={etiqueta} labelPlacement="stacked" required
            value={form[nombre]} onIonInput={(e) => setForm(prev => ({...prev,[nombre]:e.detail.value ?? ''}))} />
        </IonItem>)}
        <IonItem><IonSelect label="Tipo" labelPlacement="stacked" value={form.tipo}
          onIonChange={e => setForm(prev=>({...prev,tipo:e.detail.value}))}>
          <IonSelectOption value="especialista">Especialista</IonSelectOption>
          <IonSelectOption value="grupo_de_apoyo">Grupo de apoyo</IonSelectOption>
        </IonSelect></IonItem>
        <IonItem><IonSelect label="Modalidad" labelPlacement="stacked" value={form.modalidad}
          onIonChange={e => setForm(prev=>({...prev,modalidad:e.detail.value}))}>
          <IonSelectOption value="online">Online</IonSelectOption>
          <IonSelectOption value="presencial">Presencial</IonSelectOption>
          <IonSelectOption value="mixta">Mixta</IonSelectOption>
        </IonSelect></IonItem>
        <IonItem><IonTextarea label="Descripción" labelPlacement="stacked" autoGrow required
          value={form.descripcion} onIonInput={e => setForm(prev=>({...prev,descripcion:e.detail.value ?? ''}))}/></IonItem>
        <IonButton type="submit" disabled={guardando}>{editarId ? 'Guardar cambios' : 'Crear entrada'}</IonButton>
        {editarId && <IonButton type="button" fill="clear" onClick={reset}>Cancelar</IonButton>}
      </form>
      <h2>Entradas del directorio</h2>
      {cargando ? <IonSpinner name="crescent"/> : entradas.length === 0 ? <p>No hay entradas.</p> :
        entradas.map(e => <IonCard key={e.id} className="ion-no-margin" style={{marginBottom: 12}}>
          <IonCardContent>
            <h3>{e.nombre}</h3>
            <p>{e.especialidad} · {e.ciudad} · {e.modalidad}</p>
            <IonButton size="small" fill="outline" disabled={guardando} onClick={() => editar(e)}>Editar</IonButton>
            <IonButton size="small" fill="clear" color="danger" disabled={guardando} onClick={() => setBorrarId(e.id)}>Eliminar</IonButton>
          </IonCardContent>
        </IonCard>)}
    </div>
    <IonAlert isOpen={!!borrarId} header="¿Eliminar entrada?" message="Esta acción no se puede deshacer."
      buttons={[{text:'Cancelar',role:'cancel',handler:()=>setBorrarId(null)},
        {text:'Eliminar',role:'destructive',handler:()=>{void eliminar();}}]}
      onDidDismiss={()=>setBorrarId(null)} />
    <IonToast isOpen={!!mensaje} message={mensaje} color={error?'danger':'success'} duration={3500}
      onDidDismiss={()=>setMensaje('')} />
    </IonContent>
  </IonPage>;
};
export default GestionDirectorio;
