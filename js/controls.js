import {useFractal, drawIt} from './lsystem/render.js'

const controls = document.getElementsByName("fractalSelector");

for (let control of controls) {
    control.addEventListener("click", () => useFractal(control.id));
}

var addRulesButton = document.getElementById("addRulesCtr");
var rulesSection = document.getElementById("customRules");

function createRuleControls() {
    let inputCtrl = document.createElement("input");
    let outputCtrl = document.createElement("input");
    let lineBreak = document.createElement('br');

    inputCtrl.setAttribute("class", "rule input");
    outputCtrl.setAttribute("class", "rule output");

    return [inputCtrl, ' ', outputCtrl, lineBreak];
}

addRulesButton.addEventListener("click", () => {
    rulesSection.append(...createRuleControls());
});

var drawButton = document.getElementById("drawIt");

drawButton.addEventListener("click", drawIt);