export function processBonuses(element,i,cogInfo,cogArray) {
    let count = 0;
    let bonusA = false;
    let bonusC = false;
    const TESTING = false;

    if(TESTING){
        console.log("got into process bonuses");
        console.log(i);
        console.log(cogInfo[i]);
    };

    const currentCog = cogInfo[cogArray[i][0]];
    
    try {
        if(currentCog.b > 0) {
            //only players have the b stat for exp/hr, don't want them in the cog list
            return;
        };
    } catch (e) {
        if(TESTING) {
            console.log(e);
        };
    };

    try {
        if(currentCog.a > 0) {
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
        if(currentCog.c > 0) {
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
        if(currentCog.d > 0) {
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
        const cogBonus1 = element.getElementById('cog-bonus-1');

        if(bonusA){
            if(TESTING){
                console.log("bonusA existed: " + currentCog.a);
            };
            cogBonus1.innerText = currentCog.a + " BR";
        } else if (bonusC) {
            if(TESTING){
                console.log("bonusC existed: " + currentCog.c);
            };
            cogBonus1.innerText = currentCog.c + " Flag";
            bonusC = false;
        } else {
            if(TESTING){
                console.log("must've been bonus D: " + currentCog.d);
            };
            cogBonus1.innerText = currentCog.d + "% Exp";
        };
    };
    if(count >= 2) {
        if(TESTING){
            console.log("entered count 2");
        };
        const cogBonus2 = element.getElementById('cog-bonus-2');
        if(bonusC) {
            if(TESTING){
                console.log("bonusC existed: " + currentCog.c);
            };
            cogBonus2.textContent = currentCog.c + " Flag";
        } else {
            if(TESTING){
                console.log("must've been bonus D: " + currentCog.d);
            };
            cogBonus2.innerText = currentCog.d + "% Exp";
        };
    };
    if(count === 3) {
        if(TESTING){
            console.log("must be bonus D: " + currentCog.d);
        };
        const cogBonus3 = element.getElementById('cog-bonus-3');
        cogBonus3.innerText = currentCog.d + "% Exp";
    };
}

export function processImage(element,i,cogInfo,cogFormat,cogArray,TESTING = false,displayPlayers = false) {
    if(TESTING) {
        console.log(element);
    };
    const currentCog = cogArray[i][0];
    const cogSlice = cogFormat[currentCog].slice(0,3);
    let cogGroup = "";
    let cogLevel = "";
    let fileTier = "";
    let levelTier = "";
    let p2wFlag = false;
    
    if (TESTING) {
        //console.log(cogFormat[currentCog]);
        console.log(element);
        console.log('i: ' + i + '| cogSlice: ' + cogSlice + '| displayPlayer: ' + displayPlayers)
        console.log(cogArray[i]);
    };
    if(cogSlice === "Pla" && displayPlayers === true) {
        if(TESTING) {
            console.log('Player and displaying Players');
            console.log(element);
        };
        //need to make this display a player head in the slot
        console.log(cogFormat[currentCog])
        const fullVariablePlayerName = cogFormat[currentCog]
        const playerName = fullVariablePlayerName.slice(7,fullVariablePlayerName.length)
        element.innerText = playerName;
        element.classList.add("playerBox")
        return;
    } else if (cogSlice != "Cog") {
        if (TESTING) {
            console.log("Cog slice: " + cogSlice + " did not match Cog");
        };
        return;
    };
    const cogTier = cogFormat[currentCog].slice(3,4);
    if(TESTING) {
        console.log("Testing log: cogTier = " + cogTier)
    }
    if((cogFormat[currentCog].slice(4,5) === "A" || cogFormat[currentCog].slice(4,5) === "B") && cogTier !== "Z") {
        if(TESTING){
            console.log("Testing log: after cog tier was 'A' or 'B'");
        };
        cogGroup = cogFormat[currentCog].slice(4,5);
        cogLevel = cogFormat[currentCog].slice(5,cogFormat[currentCog].length);
        if(TESTING){
            console.log(cogGroup + ' | ' + cogLevel);
        };
    } else if (cogFormat[currentCog].slice(3,5) === "ZA") {
        if(TESTING){
            console.log("Testing log: cog tier was 'Z'");
        }
        cogGroup = cogFormat[currentCog].slice(3,5);
        cogLevel = cogFormat[currentCog].slice(5,cogFormat[currentCog].length);
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
        cogGroup = cogFormat[currentCog].slice(4,cogFormat[currentCog].length);
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
    if(TESTING) {
        console.log('Element: ' + element);
        console.log('imgElement: ' + imgElement);
    };
    element.appendChild(imgElement);
};

export function processLocation(element, i, cogFormat, cogArray) {
    const TESTING = false;

    const currentCog = cogArray[i][0]

    const cogSlice = cogFormat[currentCog].slice(0,3);
    const cogRow = Math.floor(currentCog/12)+1
    const cogCol = (currentCog%12)+1
    const alphaCogCol = (9+cogCol).toString(36).toUpperCase()
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
                temp.innerText = alphaCogCol;
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

export function processDirectionals(element, i, count, directionalArray, cogInfo, cogArray) {
    const temp = document.createElement('span');
    temp.innerText = 'Directional Bonuses'
    temp.classList.add("directional-title");
    element.appendChild(temp)

    const currentCog = cogArray[i][0]

    if(count === 2 || directionalArray[0] in cogInfo[currentCog]) {
        const temp = document.createElement('div');
        temp.innerText = '+' + cogInfo[currentCog].e + '% BR';
        element.appendChild(temp);
    };

    if(count === 2 || directionalArray[1] in cogInfo[currentCog]) {
        const temp = document.createElement('div');
        temp.innerText = '+' + cogInfo[currentCog].f + '% Exp';
        element.appendChild(temp);
    };
};