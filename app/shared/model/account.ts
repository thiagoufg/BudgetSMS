/***
 * The name Account is not a reserved word but it is defined as part of lib.d.ts
 * TypeScript performs declaration merging on your Account and the one in lib.d.ts 
 * and that causes the problem you get. If you turn your file into a module,
 * your Account will be specific to your module and TypeScript will
 * stop trying to combine it with the global one.
 * For instance, by adding export {}; you can trivially turn your file into a module
 */

export class Acc {
    constructor(
        public id: number = null,
        public name: string = null,
        public due_day: Date = null,
        public best_day: Date = null
    ) {
        
    }
}