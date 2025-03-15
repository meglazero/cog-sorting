/* Cog Info Dump
"CogM": "{\"0\":{\"d\":147},\"1\":{\"d\":111,\"a\":1166},\"2\":{\"d\":110,\"a\":284}}
0-95 is cogs, 96-107 is characters sitting in cog shelf, 108+ is created cogs sitting in shelf
for characters; a: build rate, b: exp/hr, c: flaggy/hr
cogs:
    h: directional
        left, right, up, down: (le,ri,up,do) normal directional, obvious
        row/column: (ro,co) obvious
        around: (Y) gem shop cogs, small
        corners: (cr) diagonal directional
        adjacent: (ad) + directional
        everything: obvious, from excogia only
        diagonal: (di) + turned 45 degrees
    a: build rate
    c: flaggy rate
    d: Exp
    e: directional build rate
    f: directional exp bonus
    l: not really sure, it is only on the p2w excogia cogs though, whether connected or not


    "CogO": "[\"Cog2A0\",\"Cog3A00\",\"Cog2A00\",\"Cog3A00\",\"Cog3B0\",\"Cog3co\",\"Cog3B1\"]
    presumably CogO[0]-CogO[95] is cog board, CogO[96]-CogO[107] is cog shelf creators
    and CogO[108]-CogO[CogO.length()-1] is created cogs
    Cog[0-3][a-c][00-5]
    Nooby CogO, Decent Cog1, Superb Cog2, Ulti Cog3
    Cog(Broken): A00, Cog: A0, Average: A1, Spur: A2, Deckered A3
    Double: B0, Trips: B1, Trabble: B2, Quad: B3, Penta: B4
    Ulti Broken Cog: Cog3A00
    Ulti Double Cog: Cog3B0
    Ulti Left Directional Cog: Cog3le

IT/IE JSON is an object, IT will always be JSON.data.[info], IE always be JSON.[info]
(in this case, info would be CogsO or CogsM)
*/

function processBonuses(element,i) {
    console.log("got into process bonuses");
    let count = 0;
    let bonusA = false;
    let bonusC = false;
    const TESTING = false

    if(TESTING){
        console.log(i)
        console.log(cogsM[i])
    }

    try {
        if(cogsM[i].a > 0) {
            console.log("a count++")
            count++;
            bonusA = true;
        };
    } catch {
        console.log("Failed finding bonus a")
    }
    try {
        if(cogsM[i].c > 0) {
            console.log("c count++")
            count++;
            bonusC = true;
        };
    } catch {
        console.log("Failed finding bonus b")
    }
    try {
        if(cogsM[i].d > 0) {
            console.log("d count++")
            count++;
        };
    } catch {
        console.log("Failed finding bonus c")
    }
    console.log("Count is: " + count)
    if(count >= 1) {
        console.log("entered count 1")
        cogBonus1 = element.getElementById('cog-bonus-1');

        console.log(cogBonus1);
        if(bonusA){
            console.log("bonusA existed: " + cogsM[i].a)
            cogBonus1.innerText = cogsM[i].a + " BR";
            //console.log(cogBonus1.innerText);
        } else if (bonusC) {
            console.log("bonusC existed: " + cogsM[i].c)
            cogBonus1.innerText = cogsM[i].c + " Flag";
            bonusC = false;
        } else {
            console.log("must've been bonus D: " + cogsM[i].d)
            cogBonus1.innerText = cogsM[i].d + "% Exp";
            //console.log(cogBonus1.innerText)
        }
    };
    if(count >= 2) {
        console.log("entered count 2")
        cogBonus2 = element.getElementById('cog-bonus-2');
        if(bonusC) {
            console.log("bonusC existed: " + cogsM[i].c)
            cogBonus2.textContent = cogsM[i].c + " Flag";
        } else {
            console.log("must've been bonus D: " + cogsM[i].d)
            cogBonus2.innerText = cogsM[i].d + "% Exp";
        };
    };
    if(count === 3) {
        console.log("can only be bonus D: " + cogsM[i].d);
        cogBonus3 = element.getElementById('cog-bonus-3');
        cogBonus3.innerText = cogsM[i].d + "% Exp"
    };
    console.log("end of process bonuses");
}

function processJSONCogList() {
    const cogList = document.getElementById('cog-list');
    const cogListTemplate = document.getElementById('cog-list-template');

    for(let i = 0; i < 96; i++) {
        const cogListElement = document.importNode(cogListTemplate.content, true);
        cogImage = cogListElement.getElementById('cog-image');
        cogDirectional = cogListElement.getElementById('directional-bonus');
        cogLocation = cogListElement.getElementById('cog-location');

        //strI = i.toString()

        processBonuses(cogListElement,i);
        console.log("past process bonuses")

        cogList.appendChild(cogListElement);
    }
};

function verifyJSON(JSON) {

};

let input = localStorage.getItem('input');
let cogsO = localStorage.getItem('cogsO');
let cogsM = localStorage.getItem('cogsM');

function storeJson() {
    const errorMessage = document.getElementById("error-message");
    input = jsonTextBox.value;
    try {
        const parsedInput = JSON.parse(input);
        //console.log(parsedInput)
        //console.log(parsedInput.data.CogM);
        //console.log(parsedInput.data.CogO);

        if(!('data' in parsedInput)) {
            cogsO = JSON.parse(parsedInput.CogO);
            cogsM = JSON.parse(parsedInput.CogM);
        } else {
            cogsO = JSON.parse(parsedInput.data.CogO);
            cogsM = JSON.parse(parsedInput.data.CogM);
        };
        
        if(attributeExists(errorMessage, "hidden")) {
            errorMessage.toggleAttribute("hidden");
        };
        jsonSidebar.toggleAttribute("hidden");
        processJSONCogList();
        //console.log("CogO: " + cogsO + "\n\n\nCogM: " + cogsM)
    } catch {
        if(errorMessage.hasAttribute("hidden")){
            errorMessage.toggleAttribute("hidden");
        };
    };
    //alert(input);
};

function attributeExists(element, input) {
    try {
        if(element.getAttribute(input) != null) {
            return true;
        }
    } catch {
        return false;
    }
};

const jsonSidebar = document.getElementById("sidebar");
const jsonTextBox = document.getElementById("json-input");
const jsonButton = document.getElementById('json-submit-button');
jsonButton.addEventListener('click', storeJson, false);
window.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && attributeExists(jsonSidebar, "hidden")) {
        jsonSidebar.toggleAttribute("hidden");
    } else {
        return;
    };
});