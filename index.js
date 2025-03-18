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
const jsonSidebar = document.getElementById('sidebar');
const jsonTextBox = document.getElementById('json-input');
const jsonButton = document.getElementById('json-submit-button');
let cogsO = localStorage.getItem('cogsO');
let cogsM = localStorage.getItem('cogsM');

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
            console.log("must be bonus D: " + cogsM[i].d);
        };
        cogBonus3 = element.getElementById('cog-bonus-3');
        cogBonus3.innerText = cogsM[i].d + "% Exp";
    };
}

function processImage(element,i) {
    const TESTING = false

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

    const imgElement = document.createElement('img');

    if(p2wFlag == false){
        const imagePath = "Img/"+levelTier+"_"+fileTier+".png";
        imgElement.src = imagePath;
        if(TESTING){
            console.log(imagePath);
        };
    } else if (fileTier === "Yin") {
        try{
            const imagePath = "Img/"+fileTier+"_Top_Left_Cog"+".png";
            imgElement.src = imagePath;
            cogLevel = parseInt(cogLevel);
            if(cogLevel === 2){
                cogLevel++
            } else if (cogLevel === 3){
                cogLevel--
            }
            imgElement.style = "rotate: " + 90*cogLevel + "deg";
            if(TESTING){
                console.log(imagePath);
            };
        } catch (e) {
            console.log(e);
        };
    } else if (fileTier === "Yang") {
        try {
            const imagePath = "Img/"+fileTier+"_Cog"+".png";
            imgElement.src = imagePath;
            if(TESTING){
                console.log(imagePath);
            };
        } catch (e) {
            console.log(e);
        };
    };
    element.appendChild(imgElement);
};

function processDirectionals(element, i, count, directionalArray) {
    const temp = document.createElement('span');
    temp.innerText = 'Directional Bonuses'
    temp.classList.add("directional-title");
    element.appendChild(temp)

    if(count === 2 || directionalArray[0] in cogsM[i]) {
        const temp = document.createElement('div');
        temp.innerText = '+' + cogsM[i].e + '% BR';
        element.appendChild(temp);
    };

    if(count === 2 || directionalArray[1] in cogsM[i]) {
        const temp = document.createElement('div');
        temp.innerText = '+' + cogsM[i].f + '% Exp';
        element.appendChild(temp);
    };
};

function processLocation(element, i) {
    const TESTING = false;

    const cogSlice = cogsO[i].slice(0,3);
    const cogRow = Math.floor(i/12)+1
    const cogCol = (i%12)+1
    const elements = []
    //const locationElement = element.getElementById('cog-location');

    if(cogSlice !== 'Cog') {return};

    for(let i=0; i<4; i++) {
        const temp = document.createElement('div');
        switch(i) {
            case 0:
                temp.innerText = 'Row:';
                break;
            case 1:
                temp.innerText = cogRow;
                break;
            case 2:
                temp.innerText = 'Col:';
                break;
            case 3:
                temp.innerText = cogCol;
                break;
        };
        element.appendChild(temp);
    }

    if(TESTING) {
        if(i%12 === 0){
            console.log('New row?');
        }
        console.log(Math.floor(i/12));
        console.log('Row: ' + (Math.floor(i/12)+1) + ' | Column: ' + ((i%12)+1))
        console.log(elements);
    };
    return;
};

function createSortButtons(element, info) {
    const sortGroup = document.createElement('div');
    sortGroup.classList.add('sortGroup');
    const sort = document.createElement('div');
    sort.classList.add('button');
    sort.classList.add('noselect');
    sort.id = info + '-sort-button';
    sort.innerText = 'Sort';
    sortGroup.appendChild(sort);
    element.appendChild(sortGroup);
}

function sortCogs(value) {
    const TESTING = true
    const cogList = document.getElementById('cog-list');

    if(TESTING) {
        console.log(JSON.stringify(cogsM));

        /*
        a: build rate
        b: exp/hr
        c: flaggy rate
        d: Exp
        e: directional build rate
        f: directional exp bonus
        */

        const possibleSorts = {
            'BR': 'a',
            'EXP': 'd',
            'Flaggy': 'c',
            'dBR': 'e',
            'dEXP': 'f'
        }

        const sortable = [];

        //just trying to think this through somewhat, cogsM is set up as: {"0":{"f":55}}
        //so can't just pull the info out, need like a double loop I suppose?

        for (var cogs in cogsM) {
            if(parseInt(cogs) > 95) {
                break;
            }
            for (var info in cogsM[cogs]) {
                if (info == possibleSorts[value]) {
                    //console.log(cogs + ' contains value f');

                    sortable.push([cogs, cogsM[cogs][info]])
                };
            };
        };

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        const objSorted = {};

        // these 2 basically do the same thing
        sortable.forEach(function(item) {
            objSorted[item[0]]=item[1];
        });

        console.log(JSON.stringify(objSorted));

        const sortedCogM = {}

        for(var cog in cogsM) {
            if (cog in objSorted) {
                sortedCogM[cog] = cogsM[cog];
            };
        };

        console.log(JSON.stringify(sortedCogM));

        cogList.replaceChildren();
        createSortButtons(cogList, 'cog-list');
        processCogDivs(cogList, sortedCogM, cogsO);
        document.getElementById('cog-list-sort-button').addEventListener('click', function() {
            sortCogs('EXP');
        }, false);
    }
}

function processCogDivs(cogList, cogInfo, cogFormat) {
    const directionalBonuses = ['e','f'];
    
    for(let i = 0; i < 96; i++) {
        const cogListElement = document.importNode(document.getElementById('cog-list-template').content, true);
    
        processImage(cogListElement.getElementById('cog-image'),i);
        processBonuses(cogListElement,i);
        let count = 0;
        for(let j=0; j<directionalBonuses.length; j++) {
            if(directionalBonuses[j] in cogsM[i]){
                if(TESTING) {
                    console.log('success: ' + j);
                };
                count++
            };
        };
        if(count > 0){
            //probably need to go through and refactor the other functions to use the direct element as their input not
            //the entire template, just doesn't really need to be that messy in most cases
            processDirectionals(cogListElement.getElementById('directional-bonus'),i,count,directionalBonuses);
        }
        processLocation(cogListElement.getElementById('cog-location'),i);
    
        cogList.appendChild(cogListElement);
    };
};

function processJSONCogList(cogInfo, cogFormat) {
    const cogList = document.getElementById('cog-list');
    const TESTING = false;

    createSortButtons(cogList, "cog-list"); 
    document.getElementById('cog-list-sort-button').addEventListener('click', function() {
        sortCogs('EXP');
    }, false);

    processCogDivs(cogList, cogInfo, cogFormat);
};

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
        
        if(!(attributeExists(errorMessage, "hidden"))) {
            errorMessage.toggleAttribute("hidden");
        };
        jsonSidebar.classList.remove("shown");
        jsonSidebar.classList.add("hidden");
        processJSONCogList(cogsM, cogsO);
        if(TESTING) {
            console.log("CogO: " + cogsO + "\n\n\nCogM: " + cogsM)
        }
    } catch (e){
        console.log(e);
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

jsonButton.addEventListener('click', storeJson, false);
window.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && jsonSidebar.classList.contains("hidden")) {
        jsonSidebar.classList.remove("hidden");
        jsonSidebar.classList.add("shown");
    } else {
        return;
    };
});