import { Feature } from "./feature";

export interface Produit {
    readonly id : number,
    title : string,
    description : string,
    image : string,
    fullPrice : number,
    discountPercent : number,
    category : string,
    features : Array<Feature>
}
