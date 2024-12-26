import { z } from "zod"

export interface Operation {
  id: string,
  nombreCirugia: string,
  tipoCirugia: string,
  nombreMedico: string,
  descripcion: string,
  idCirugia?: string,
  fechaCirugia: string
}

export const OperationSchema = z.object({
  id: z.string().optional(),
  nombreCirugia: z.string(),
  tipoCirugia: z.string().optional(),
  nombreMedico: z.string(),
  descripcion: z.string(),
  idCirugia: z.string().optional(),
  fechaCirugia: z.string()
})

export type OperationState = | {
  errors?: {
    id?: string[]
    nombreCirugia?: string[]
    tipoCirugia?: string[]
    nombreMedico?: string[]
    descripcion?: string[]
    idCirugia?: string[]
    fechaCirugia?: string[]
  }
  message?: string
}
| undefined