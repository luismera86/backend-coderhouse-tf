import { Product } from "./Product"

export interface Cart {
    id_user?: number
    products?: Product[]
}