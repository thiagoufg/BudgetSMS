import { Category } from "./category";

export class Place {
    constructor(
        public id: number = null, 
        public name: string = null, 
        public category: Category = null
    ){

    }

}