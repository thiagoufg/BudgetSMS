import { StringSimilarity } from './StringSimilarity';

export class GroupMessages {

    public doGroup(texts: Array<string>) {

        let setsOfSimilarStrings: Array<Array<string>> = this.groupStringsBySimilarity(texts);
        //console.log(setsOfSimilarStrings);
        return setsOfSimilarStrings.map((a)=>{return a[0]});
        /*
        let group: Array<string> = setsOfSimilarStrings[0];
        let sanitizedSetOfSimilarStrings: Array<string> = <any>(new Array<string>());
        for (let i: number = 0; i < group.length; i++) {
            sanitizedSetOfSimilarStrings.unshift(this.sanitizeVariableFields(group[i], true));
        }
        let fixedSubstrings: Array<string> = this.findFixedSubstrings(sanitizedSetOfSimilarStrings);
        for (let res of fixedSubstrings) {
            console.info(res);
        }
        */
    }

    public groupStringsBySimilarity(msgs: Array<string>): Array<Array<string>> {
        let grupos: Array<Array<string>> = <any>(new Array<Array<string>>());

        for (let i: number = 0; i < msgs.length; i++) {
            console.log(msgs[i]);
            let atingiuSimilaridadeMinima: boolean = false;
            for (let grupoN: number = 0; grupoN<grupos.length;grupoN++) {
                let grupo = grupos[grupoN];
                for (let msgJaNumGrupo of grupo) {
                    let sim = StringSimilarity.similarity(msgs[i], msgJaNumGrupo);
                    if (sim > 0.6) {
                        atingiuSimilaridadeMinima = true;
                        console.log("atingiu similaridade minima");
                        console.log("adicionado ao grupo "+grupoN+", que agora possui " + grupo.length + " elementos.")
                        grupo.unshift(msgs[i]);
                        break;
                    }
                }
            }

            if (atingiuSimilaridadeMinima) {
            } else {
                console.log("NAO atingiu minimo. adicionando a um novo grupo");
                let novoGrupo: Array<string> = <any>(new Array<string>());
                novoGrupo.unshift(msgs[i]);
                grupos.unshift(novoGrupo);
            }
        }
        console.log(grupos.length);
        return grupos;
    }

    public findFixedSubstrings(setOfSimilarStrings: Array<string>): Array<string> {
        let s1: Array<Main.SubString> = this.generateSubStrings(setOfSimilarStrings[0], 3);
        s1.sort(this.byStringLength);
        let output: Array<Main.SubString> = <any>(new Array<Main.SubString>());
        for (let wantedSubstring of s1) {
            let wantedString: string = setOfSimilarStrings[0].substring(wantedSubstring.start, wantedSubstring.end);
            let isInEveryText: boolean = true;
            for (let text of setOfSimilarStrings) {
                if (text.indexOf(wantedString) < 0) {
                    isInEveryText = false;
                    break;
                }
            }
            if (isInEveryText) {
                let constainsOrOverlapsAnyOutput: boolean = false;
                let toBeRemovedFromOutput: Array<Main.SubString> = <any>(new Array<Main.SubString>());
                for (let out of output) {
                    if (this.aContainsB(out, wantedSubstring) || this.aOverlapsB(out, wantedSubstring)) {
                        constainsOrOverlapsAnyOutput = true;
                    }
                    if (this.aContainsB(wantedSubstring, out) || this.aOverlapsB(out, wantedSubstring) && (wantedString === setOfSimilarStrings[0].substring(out.start, out.end))) {
                        toBeRemovedFromOutput.unshift(out);
                    }
                }
                output = output.filter(function (el) {
                    return toBeRemovedFromOutput.indexOf(el) < 0;
                });
                if (!constainsOrOverlapsAnyOutput) output.unshift(wantedSubstring);
            }
        }
        output.sort(this.fromLeftToRight);
        let fixedSubstrings: Array<string> = <any>(new Array<string>());
        for (let o of output) {
            fixedSubstrings.unshift(setOfSimilarStrings[0].substring(o.start, o.end));
        }
        return fixedSubstrings;
    }

    public sanitizeVariableFields(text: string, trimBlankSpaces: boolean): string {
        if (trimBlankSpaces) {
            while ((!(text === /* replaceAll */text.replace(new RegExp("[ ][ ]", 'g'), " ")))) text = /* replaceAll */text.replace(new RegExp("[ ][ ]", 'g'), " ");
        }
        text = /* replaceAll */text.replace(new RegExp("[0-9][0-9][/][0-9][0-9][/][0-9][0-9][0-9][0-9]", 'g'), this.randomString(10));
        text = /* replaceAll */text.replace(new RegExp("[0-9][0-9][0-9][0-9][-][0-9][0-9][-][0-9][0-9]", 'g'), this.randomString(10));
        text = /* replaceAll */text.replace(new RegExp("[0-9][0-9]*[:hH][0-9][0-9]*[Mm:]*[0-9]*[0-9]*[sS]", 'g'), this.randomString(5));
        text = /* replaceAll */text.replace(new RegExp("[0-9]+[,.]*[0-9]*", 'g'), this.randomString(4));
        return text;
    }

    randomString(len: number): string {
        let AB: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let sb = "";
        for (let i: number = 0; i < len; i++) sb += AB.charAt(Math.random() * AB.length);
        return sb;
    }

    public aContainsB(a: Main.SubString, b: Main.SubString): boolean {
        if (a.start <= b.start && a.end >= b.end) return true;
        return false;
    }

    public aOverlapsB(a: Main.SubString, b: Main.SubString): boolean {
        if (a.start >= b.start && a.start <= b.end) return true;
        if (a.end >= b.start && a.end <= b.end) return true;
        if (b.start >= a.start && b.start <= a.end) return true;
        if (b.end >= a.start && b.end <= a.end) return true;
        return false;
    }

    public generateSubStrings(text: string, minLength: number): Array<Main.SubString> {
        if (text.length < minLength) return null;
        let ret: Array<Main.SubString> = <any>(new Array<Main.SubString>());
        for (let i: number = 0; i <= text.length - minLength; i++) {
            for (let j: number = i + minLength; j <= text.length; j++) {
                let s: Main.SubString = new Main.SubString(this, i, j);
                ret.unshift(s);
            }
        }
        return ret;
    }

    private byStringLength = function (a: Main.SubString, b: Main.SubString): number {
        if ((a.end - a.start) > (b.end - b.start)) return -1;
        if ((a.end - a.start) < (b.end - b.start)) return 1;
        return 0;
    };

    private fromLeftToRight = function (a: Main.SubString, b: Main.SubString): number {
        return a.start < b.start ? -1 : a.start === b.start ? 0 : 1;
    };

}

namespace Main {

    export class SubString {
        public __parent: any;
        start: number;

        end: number;

        constructor(__parent: any, inicio: number, fim: number) {
            this.__parent = __parent;
            this.start = 0;
            this.end = 0;
            this.start = inicio;
            this.end = fim;
        }

        public getStart(): number {
            return this.start;
        }

        public setStart(start: number) {
            this.start = start;
        }

        public getEnd(): number {
            return this.end;
        }

        public setEnd(end: number) {
            this.end = end;
        }

        public compareTo(o: Main.SubString): number {
            if ((this.end - this.start) > (o.end - o.start)) return -1;
            if ((this.end - this.start) < (o.end - o.start)) return 1;
            return 0;
        }
    }

}