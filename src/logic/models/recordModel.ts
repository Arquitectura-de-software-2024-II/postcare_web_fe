export interface userRecord {
    id?: string
    fechaRegistro: string,
    userId?: string;
    parametrosControl:{
        signosVitales: VitalSign[]
        sintomas: Symptom[]
        sintomasNoListados: NotListedSymptom[]
    }
}

export interface RecordOptions {
    id: string
    signosVitales: VitalSign[]
    sintomas: Symptom[]
    sintomasNoListados: NotListedSymptom[]
}

export interface VitalSign{
    nombre: string
    unidad: string
    valor: number
}

export interface Symptom{
    nombre: string
    valor: number
    escala?: {
        min: number
        max: number
    }
    tieneEscala?: boolean
}

export interface NotListedSymptom{
    nombre: string
    descripcion: string
}