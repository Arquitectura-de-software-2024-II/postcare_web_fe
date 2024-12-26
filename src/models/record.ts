export interface escala{
  min: number;
  max: number;
}

export interface SignoVital {
  nombre: string;
  unidad: string;
  valor: number;
  rangoNormal: escala;
}

export interface Sintoma {
  nombre: string;
  valores: [];
  tieneEscala: boolean;
  escala: escala;
  valor: string;
}

export interface SintomaNoListado {
  nombre: string;
  descripcion: string;
}

// Finalmente, agrupamos estas interfaces dentro de una interfaz para 'parametrosControl'
export interface ParametrosControl {
  signosVitales: SignoVital[];
  sintomas: Sintoma[];
  sintomasNoListados: SintomaNoListado[];
}