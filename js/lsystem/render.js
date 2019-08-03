import Lsystem from './lsystem.js'

const canvas = document.getElementById("fractal");

export function useFractal(name) {
    let pattern = PATTERNS[name];
    let axiom = pattern.axiom;
    let rules = pattern.rules;
    let len = pattern.len;
    let angle = pattern.angle;
    let gen = pattern.recomendedGen;

    const lsys = new Lsystem(axiom, rules);
    lsys.useGeneration(pattern.recomendedGen);

    process(canvas, lsys.sentence, len, angle, gen);
    updateInfo(lsys);
}

export function drawIt() {
    function getFormattedRules(rules) {
        let array = [];

        for(let i = 0; i < rules.length; i+=2) {
            array.push({input: rules[i].value,
                        output: rules[i+1].value});
        }
        return array;
    }
    let axiom = document.getElementById("axiom").value;
    let rules = document.getElementsByClassName("rule");
    let angle = document.getElementById("angle").value;
    let len = document.getElementById("lineLength").value;
    let gen = document.getElementById("gen").value;
    rules = getFormattedRules(rules);

    const lsys = new Lsystem(axiom, rules);
    lsys.useGeneration(gen);
    
    process(canvas, lsys.sentence, len, angle, gen);
    updateInfo(lsys);
}


/*
    G - Line Forward
    F - Line Forward
    - - Turn LEFT
    + - Turn RIGHT
    [ - SAVE state
    ] - RESTORE state
*/

function process(canvas, sentence, len, angle, gen) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#' + Math.random().toString(16).slice(-6);
    ctx.lineWidth = 1; ctx.save();
    ctx.translate(canvas.width / 2, canvas.height);

    for (let i = 0; i < sentence.length; i++) {
        let currentChar = sentence.charAt(i);

        switch (currentChar) {
            case 'G':
            case 'F':
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -len);
                ctx.stroke();
                ctx.translate(0, -len);
                break;
            case 'C':
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, len, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.translate(0, -len);
                break;
            case '+':
                ctx.rotate(angle); break;
            case '-':
                ctx.rotate(-angle); break;
            case '[':
                ctx.save(); break;
            case ']':
                ctx.restore(); break;
        }
    }
    ctx.restore();
}

function updateInfo(lsys) {
    function getPlainTextRules(rules) {
        let text = '';
        for (let rule of rules) {
            text += `· ${rule.input} -> ${rule.output}\n`;
        }
        return text;
    }
    let axiomInfo = document.getElementById("axiomInfo");
    let rulesInfo = document.getElementById("rulesInfo");
    let genInfo = document.getElementById("genInfo");

    axiomInfo.innerText = `Axiom: ${lsys.axiom}`;
    rulesInfo.innerText = `Rules:\n ${getPlainTextRules(lsys.rules)}`;
    genInfo.innerText = `Gen: ${lsys.gen}`;
}

function createPattern(axiom, rules, recomendedGen, len, angle) {
    return {axiom, rules, recomendedGen, len,
        angle: angle * Math.PI / 180};
}

const PATTERNS = {
    tree0: createPattern(
        'F', [{input: 'F', output: "G[+F]-F"},
        {input: 'G', output: "GG"}], 7, 3.5, 26),
    tree1: createPattern(
        'X', [{input: 'X', output: "F+[[X]-X]-F[-FX]+X"},
        {input: 'F', output: "FF"}], 6, 2.5, 20),
    tree2: createPattern(
        'F', [{input: 'F', output: "FF+[+F-F-F]-[-F+F+F]"}],
        4, 8, 25),
    triangle0: createPattern(
        '+F', [{input: 'F', output: "G--F--G"},
        {input: 'G', output: "F++G++F"}], 7, 3.7, 30),
    curve0: createPattern(
        'G+F----F----F', [{input: 'F', output: "F++F----F++F"},
        {input: 'G', output: "GG"}], 4, 4, 30),
    curve1: createPattern(
        'GGLFL+F+LFL', [{input: 'L', output: "-RF+LFL+FR-"},
        {input: 'R', output: "+LF-RFR-FL+"},
        {input: 'G', output: "GG"}], 4, 7, 90)
};


const useRandomFractal = () => {
    let keys = Object.keys(PATTERNS);
    useFractal(keys[Math.floor(Math.random() * keys.length)]);
}
useRandomFractal();