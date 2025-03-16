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
    b: exp/hr
    c: flaggy rate
    d: Exp
    e: directional build rate
    f: directional exp bonus
    l: not really sure, it is only on the p2w excogia cogs though, whether connected or not


    "CogO": "[\"Cog2A0\",\"Cog3A00\",\"Cog2A00\",\"Cog3A00\",\"Cog3B0\",\"Cog3co\",\"Cog3B1\"]
    presumably CogO[0]-CogO[95] is cog board, CogO[96]-CogO[107] is cog shelf creators
    and CogO[108]-CogO[CogO.length()-1] is created cogs
    Cog[0-3][A,B][00-5]
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
    let count = 0;
    let bonusA = false;
    let bonusC = false;
    const TESTING = false;

    if(TESTING){
        console.log("got into process bonuses");
        console.log(i);
        console.log(cogsM[i]);
    };

    if(cogsM[i].b > 0) {
        //only players have the b stat for exp/hr, don't want them in the cog list
        return
    }

    try {
        if(cogsM[i].a > 0) {
            if(TESTING){
                console.log("a count++");
            };
            count++;
            bonusA = true;
        };
    } catch {
        console.log("Failed finding bonus a");
    };
    try {
        if(cogsM[i].c > 0) {
            if(TESTING){
                console.log("c count++");
            };
            count++;
            bonusC = true;
        };
    } catch {
        console.log("Failed finding bonus b");
    }
    try {
        if(cogsM[i].d > 0) {
            if(TESTING){
                console.log("d count++");
            };
            count++;
        };
    } catch {
        console.log("Failed finding bonus c");
    };
    if(TESTING){
        console.log("Count is: " + count);
    };
    if(count >= 1) {
        if(TESTING){
            console.log("entered count 1");
        };
        cogBonus1 = element.getElementById('cog-bonus-1');

        if(bonusA){
            if(TESTING){
                console.log("bonusA existed: " + cogsM[i].a);
            };
            cogBonus1.innerText = cogsM[i].a + " BR";
        } else if (bonusC) {
            if(TESTING){
                console.log("bonusC existed: " + cogsM[i].c);
            };
            cogBonus1.innerText = cogsM[i].c + " Flag";
            bonusC = false;
        } else {
            if(TESTING){
                console.log("must've been bonus D: " + cogsM[i].d);
            };
            cogBonus1.innerText = cogsM[i].d + "% Exp";
        };
    };
    if(count >= 2) {
        if(TESTING){
            console.log("entered count 2");
        };
        cogBonus2 = element.getElementById('cog-bonus-2');
        if(bonusC) {
            if(TESTING){
                console.log("bonusC existed: " + cogsM[i].c);
            };
            cogBonus2.textContent = cogsM[i].c + " Flag";
        } else {
            if(TESTING){
                console.log("must've been bonus D: " + cogsM[i].d);
            };
            cogBonus2.innerText = cogsM[i].d + "% Exp";
        };
    };
    if(count === 3) {
        if(TESTING){
            console.log("can only be bonus D: " + cogsM[i].d);
        };
        cogBonus3 = element.getElementById('cog-bonus-3');
        cogBonus3.innerText = cogsM[i].d + "% Exp";
    };
}

function processImage(element,i) {
    const TESTING = true

    const cogSlice = cogsO[i].slice(0,3);
    let cogGroup = "";
    let cogLevel = "";
    let fileTier = "";
    let levelTier = "";
    let p2wFlag = false;
    
    if (TESTING) {
        console.log(cogsO[i]);
        //console.log(cogSlice)
    }
    if(cogSlice != "Cog") {
        if (TESTING) {
            console.log("Cog slice did not match Cog");
        };
        return
    };
    const cogTier = cogsO[i].slice(3,4);
    if(TESTING) {
        console.log("Testing log: cogTier = " + cogTier)
    }
    if((cogsO[i].slice(4,5) === "A" || cogsO[i].slice(4,5) === "B") && cogTier !== "Z") {
        if(TESTING){
            console.log("Testing log: after cog tier was 'A' or 'B'");
        };
        cogGroup = cogsO[i].slice(4,5);
        cogLevel = cogsO[i].slice(5,cogsO[i].length);
        if(TESTING){
            console.log(cogGroup + ' | ' + cogLevel);
        };
    } else if (cogsO[i].slice(3,5) === "ZA") {
        if(TESTING){
            console.log("Testing log: cog tier was 'Z'");
        }
        cogGroup = cogsO[i].slice(3,5);
        cogLevel = cogsO[i].slice(5,cogsO[i].length);
        if(TESTING){
            console.log(cogGroup + ' | ' + cogLevel);
        };
    } else if (cogTier === "Y") {
        if(TESTING){
            console.log('Testing log: was a small p2w cog');
        }
    } else {
        if(TESTING){
            console.log("Testing log: after cog tier was something other than 'A', 'B', or 'Z'")
        };
        cogGroup = cogsO[i].slice(4,cogsO[i].length);
        if(TESTING){
            console.log(cogGroup + ' | ' + cogLevel);
        };
    };

    if (TESTING){
        try{
            console.log("Cog Tier: " + cogTier + "\n\nCog Group: " + cogGroup + "\n\nCog Level: " + cogLevel);
        } catch (e) {
            console.log(e)
        }
    };
    switch(cogTier) {
        case "0":
            fileTier = "Nooby";
            break;
        case "1":
            fileTier = "Decent";
            break;
        case "2":
            fileTier = "Superb";
            break;
        case "3":
            fileTier = "Ultimate";
            break;
        case "Z":
            fileTier = "Yin";
            p2wFlag = true;
            break;
        case "Y":
            fileTier = "Yang";
            p2wFlag = true;
    };

    switch(cogGroup){
        case "A":
            switch(cogLevel){
                case "00":
                    levelTier = "Cog";
                    break;
                case "0":
                    levelTier = "CogB";
                    break;
                case "1":
                    levelTier = "Average";
                    break;
                case "2":
                    levelTier = "Spur";
                    break;
                case "3":
                    levelTier = "Stacked";
                    break;
                case "4":
                    levelTier = "DeckeredB";
                    break;
            };
            break;
        case "B":
            switch(cogLevel) {
                case "0":
                    levelTier = "Double";
                    break;
                case "1":
                    levelTier = "Trips";
                    break;
                case "2":
                    levelTier = "Trabble";
                    break;
                case "3":
                    levelTier = "Quad";
                    break;
                case "4":
                    levelTier = "Penta";
                    break;
            };
            break;
        /*le, ri, up, do, ro, co, cr, ad, di*/
        case "le":
            levelTier = "Left";
            break;
        case "ri":
            levelTier = "Right";
            break;
        case "up":
            levelTier = "Up";
            break;
        case "do":
            levelTier = "Down";
            break;
        case "ro":
            levelTier = "Row";
            break;
        case "co":
            levelTier = "Column";
            break;
        case "cr":
            levelTier = "Corner";
            break;
        case "ad":
            levelTier = "Adjacent";
            break;
        case "di":
            levelTier = "Diagonal";
            break;
    };

    if(p2wFlag == false){
        const imageElement = element.getElementById('cog-image');
        const imgElement = document.createElement('img');
        const imagePath = "Img/"+levelTier+"_"+fileTier+".png";
        imgElement.src = imagePath;
        imageElement.appendChild(imgElement);
        if(TESTING){
            console.log(imagePath);
        };
    } else if (fileTier === "Yin") {
        try{
            const imageElement = element.getElementById('cog-image');
            const imgElement = document.createElement('img');
            const imagePath = "Img/"+fileTier+"_Top_Left_Cog"+".png";
            imgElement.src = imagePath;
            cogLevel = parseInt(cogLevel);
            if(cogLevel === 2){
                cogLevel++
            } else if (cogLevel === 3){
                cogLevel--
            }
            imgElement.style = "rotate: " + 90*cogLevel + "deg";
            imageElement.appendChild(imgElement);
            if(TESTING){
                console.log(imagePath);
            };
        } catch (e) {
            console.log(e);
        };
    } else if (fileTier === "Yang") {
        try {
            const imageElement = element.getElementById('cog-image');
            const imgElement = document.createElement('img');
            const imagePath = "Img/"+fileTier+"_Cog"+".png";
            imageElement.src = imagePath;
            imageElement.appendChild(imgElement);
            if(TESTING){
                console.log(imagePath);
            };
        } catch (e) {
            console.log(e);
        };
    };



};

function processJSONCogList() {
    const cogList = document.getElementById('cog-list');
    const cogListTemplate = document.getElementById('cog-list-template');

    for(let i = 0; i < 96; i++) {
        const cogListElement = document.importNode(cogListTemplate.content, true);
        //cogImage = cogListElement.getElementById('cog-image');
        cogDirectional = cogListElement.getElementById('directional-bonus');
        cogLocation = cogListElement.getElementById('cog-location');

        processImage(cogListElement,i);
        processBonuses(cogListElement,i);

        cogList.appendChild(cogListElement);
    }
};

let cogsO = localStorage.getItem('cogsO');
let cogsM = localStorage.getItem('cogsM');

function storeJson() {
    const errorMessage = document.getElementById("error-message");
    TESTING = false;

    try {
        const input = JSON.parse(jsonTextBox.value);
        if(TESTING) {
            console.log(input)
            console.log(input.data.CogM);
            console.log(input.data.CogO);
        }

        if(!('data' in input)) {
            cogsO = JSON.parse(input.CogO);
            cogsM = JSON.parse(input.CogM);
        } else {
            cogsO = JSON.parse(input.data.CogO);
            cogsM = JSON.parse(input.data.CogM);
        };
        
        if(attributeExists(errorMessage, "hidden")) {
            errorMessage.toggleAttribute("hidden");
        };
        jsonSidebar.toggleAttribute("hidden");
        processJSONCogList();
        if(TESTING) {
            console.log("CogO: " + cogsO + "\n\n\nCogM: " + cogsM)
        }
    } catch {
        if(errorMessage.hasAttribute("hidden")){
            errorMessage.toggleAttribute("hidden");
        };
    };
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