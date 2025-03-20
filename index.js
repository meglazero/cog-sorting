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
import { processBonuses, processImage, processLocation, processDirectionals } from "./process-cogs.js";

const jsonSidebar = document.getElementById('sidebar');
const jsonTextBox = document.getElementById('json-input');
const jsonButton = document.getElementById('json-submit-button');
let cogsO = localStorage.getItem('cogsO');
let cogsM = localStorage.getItem('cogsM');

function createSortButtons(element, info) {
    const sortGroup = document.createElement('div');
    sortGroup.classList.add('sortGroup');

    const sort = document.createElement('div');
    sort.classList.add('button');
    sort.classList.add('noselect');
    sort.id = info + '-sort-button';
    sort.innerText = 'Sort';

    const dCheckbox = document.createElement('input');
    dCheckbox.type = 'checkbox';
    dCheckbox.id = 'directional-checkbox';
    dCheckbox.name = 'directional-checkbox';

    const dCheckboxLabel = document.createElement('label');
    dCheckboxLabel.for = 'directional-checkbox';
    dCheckboxLabel.innerText = 'Include directional cogs:';

    const checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add('checkbox-div');
    checkboxDiv.appendChild(dCheckboxLabel);
    checkboxDiv.appendChild(dCheckbox);

    sortGroup.appendChild(sort);
    sortGroup.appendChild(checkboxDiv);
    element.appendChild(sortGroup);
}

function sortCogs(value) {
    const TESTING = false;
    const cogList = document.getElementById('cog-list');
    
    const possibleSorts = {
        'BR': 'a',
        'EXP': 'd',
        'Flaggy': 'c',
        'dBR': 'e',
        'dEXP': 'f'
    };

    const directionalDoubles = [
        'le', 'ri', 'up', 'do', 'ad', 'di', 'ro', 'co', 'cr'
    ];

    /*
    a: build rate
    b: exp/hr
    c: flaggy rate
    d: Exp
    e: directional build rate
    f: directional exp bonus
    */

    const sortable = [];
    const directionalCheckbox = document.getElementById('directional-checkbox');
    if (TESTING) {
        console.log(directionalCheckbox.checked)
    }

    for (var cogs in cogsM) {
        if(parseInt(cogs) > 95) {
            break;
        }
        for (var info in cogsM[cogs]) {
            if (TESTING) {
                console.log(cogsO[cogs]);
            };
            if (info == possibleSorts[value]) {
                if (TESTING) {
                    console.log(cogs + ' contains value f');
                }
                const cogTierSlice = cogsO[cogs].slice(3,4);
                if(!(cogTierSlice === 'Y' || cogTierSlice === 'Z')){
                    if(!(directionalCheckbox.checked)) {
                        if(!(directionalDoubles.includes(cogsO[cogs].slice(4,6)))){
                            sortable.push([cogs, cogsM[cogs][info]]);
                        }
                    } else {
                        sortable.push([cogs, cogsM[cogs][info]])
                    }
                };
            };
        };
    };

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    cogList.replaceChildren();
    createSortButtons(cogList, 'cog-list');
    processCogDivs(cogList, cogsM, cogsO, sortable);
    document.getElementById('cog-list-sort-button').addEventListener('click', function() {
        sortCogs('EXP');
    }, false);

    if(TESTING) {
        //console.log(JSON.stringify(cogsM));
        /* just kind of leaving this here for posterity, for whatever reason (I guess because of the numerical keys)
        this is functionally the same as having done nothing at all prior. It still just puts the keys back in numerical
        order, thus defeating the whole purpose.

        const objSorted = {};
        sortable.forEach(function(item) {
            objSorted[item[0]]=item[1];
        });
        console.log('Sortable array: ' + JSON.stringify(sortable));
        console.log('Sorted object: ' + JSON.stringify(objSorted));
        */
    };
};

function processCogDivs(cogList, cogInfo, cogFormat, cogArray) {
    const TESTING = false;

    const directionalBonuses = ['e','f'];

    const forLength = Math.min(96,cogArray.length-1);
    if (TESTING) {
        console.log(forLength);
    }
    
    for(let i = 0; i < forLength; i++) {
        if(cogFormat[i].slice(0,3) != 'Cog') {
            continue;
        }
        const cogListElement = document.importNode(document.getElementById('cog-list-template').content, true);
    
        processImage(cogListElement.getElementById('cog-image'),i,cogInfo,cogFormat,cogArray);
        processBonuses(cogListElement,i,cogInfo,cogArray);
        let count = 0;
        for(let j=0; j<directionalBonuses.length; j++) {
            if(directionalBonuses[j] in cogInfo[cogArray[i][0]]){
                if(TESTING) {
                    console.log('success: ' + j);
                };
                count++
            };
        };
        if(count > 0){
            //probably need to go through and refactor the other functions to use the direct element as their input not
            //the entire template, just doesn't really need to be that messy in most cases
            processDirectionals(cogListElement.getElementById('directional-bonus'),i,count,directionalBonuses,cogInfo,cogArray);
        }
        processLocation(cogListElement.getElementById('cog-location'),i,cogFormat,cogArray);
    
        cogList.appendChild(cogListElement);
    };
};

function processJSONCogList(cogInfo, cogFormat) {
    const cogList = document.getElementById('cog-list');
    const TESTING = false;

    cogList.replaceChildren();

    createSortButtons(cogList, "cog-list"); 
    document.getElementById('cog-list-sort-button').addEventListener('click', function() {
        sortCogs('EXP');
    }, false);
    const cogArray = Object.entries(cogInfo);

    processCogDivs(cogList, cogInfo, cogFormat, cogArray);
};

function storeJson() {
    const errorMessage = document.getElementById("error-message");
    const TESTING = false;

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
//add a hamburger menu to top left to also bring back up the sidebar to past the json
window.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && jsonSidebar.classList.contains("hidden")) {
        jsonSidebar.classList.remove("hidden");
        jsonSidebar.classList.add("shown");
    } else {
        return;
    };
});