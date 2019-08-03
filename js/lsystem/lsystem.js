export default class Lsystem {
    constructor(axiom, rules) {
        this.axiom = axiom;
        this.sentence = axiom;
        this.rules = rules;
        this.gen = 0;
    }

    generate() {
        let nextSentence = '';

        // console.log(this.sentence);
        for (let i = 0; i < this.sentence.length; i++) {
            let currentChar = this.sentence.charAt(i);
            let found = false;

            for (let rule of this.rules) {
                if (currentChar === rule.input) {
                    found = true;
                    nextSentence += rule.output;
                    break;
                }
            }
            if (!found) nextSentence += currentChar;
        }

        this.sentence = nextSentence;
        this.gen++;
    }

    useGeneration(num) {
        for (let i = 0; i < num; i++) {
            this.generate();
        }
    }
}