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
    let delRule = document.createElement("button");

    delRule.innerText = "-";
    delRule.addEventListener("click", function() {
        rulesSection.removeChild(this.previousElementSibling);
        rulesSection.removeChild(this.previousElementSibling);
        rulesSection.removeChild(this.nextElementSibling);
        rulesSection.removeChild(this);
    });

    inputCtrl.setAttribute("class", "rule input");
    outputCtrl.setAttribute("class", "rule output");

    return [inputCtrl, ' ', outputCtrl, ' ', delRule, lineBreak];
}

addRulesButton.addEventListener("click", () => {
    rulesSection.append(...createRuleControls());
});

var drawButton = document.getElementById("drawIt");

drawButton.addEventListener("click", drawIt);