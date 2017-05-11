export class StringSimilarity {
    public static similarity(s1 : string, s2 : string) : number {
        if(s1.length < s2.length) {
            let swap : string = s1;
            s1 = s2;
            s2 = swap;
        }
        let bigLen : number = s1.length;
        if(bigLen === 0) {
            return 1.0;
        }
        return (bigLen - StringSimilarity.computeEditDistance(s1, s2)) / <number>bigLen;
    }

    public static computeEditDistance(s1 : string, s2 : string) : number {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        let costs : number[] = new Array(s2.length + 1);
        for(let i : number = 0; i <= s1.length; i++) {
            let lastValue : number = i;
            for(let j : number = 0; j <= s2.length; j++) {
                if(i === 0) costs[j] = j; else {
                    if(j > 0) {
                        let newValue : number = costs[j - 1];
                        if(s1.charAt(i - 1) !== s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if(i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
}