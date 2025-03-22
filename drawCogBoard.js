export function cogBoard (element, cogInfo, cogFormat, cogArray, functionArray) {
    buildTable(element);
    /*
    const testingElement = document.getElementById('1-1');
    testingElement.innerText = testingElement.innerText + ' Adding on extra to make sure selecting it works';
    */
    addImages(cogInfo, cogFormat, cogArray, functionArray[0]);
};

function buildTable(element) {
    const TESTING = false;

    element.replaceChildren();
    /*
    const temp = document.createElement('div');
    temp.id = '1-1';
    temp.innerText = "Testing this should be id 1-1";
    element.appendChild(temp);
    */

    //processImage(cogListElement.getElementById('cog-image'),i,cogInfo,cogFormat,cogArray);

    for(let i=1; i<=8; i++) {
        for(let j=1; j<=12; j++) {
            const temp = document.createElement('div');
            if(TESTING) {
                console.log('Row: ' + i + ' Col: ' + j);
            };
            const infoID = i + '-' + j;
            temp.id = infoID;
            //temp.innerText = infoID;

            /*const tempImage = document.createElement('img');
            tempImage.id = infoID + '-image';
            temp.appendChild(tempImage);*/
            
            element.appendChild(temp);
        };
    };
};

function addImages(cogInfo, cogFormat, cogArray, processImage) {
    const TESTING = false;
    //console.log(cogInfo);
    //console.log(cogFormat);
    //console.log(JSON.stringify(cogArray));
    let offset = 0;
    for(let i = 0; i < 96; i++){
        if(TESTING) {
            console.log(cogFormat[i].slice(0,3) + ' ' + i);
        };
        if(cogFormat[i].slice(0,3) !== 'Cog') {
            if(cogFormat[i].slice(0,3) !== 'Bla') {
                offset++;
                continue;
            };
        };

        const offsetI = i-offset;

        const currentCog = parseInt(cogArray[offsetI][0]);

        if(TESTING) {
            console.log('Current cog: ' + currentCog + ' index is: ' + offsetI);
            console.log('Current cog: ' + cogFormat[currentCog] + ' Array index is : ' + cogArray[offsetI][0]);
        };

        const cogRow = Math.floor(currentCog/12)+1;
        const cogCol = (currentCog%12)+1; 
        const imageId = cogRow + '-' + cogCol;

        if(TESTING){
            console.log('Cogboard i: ' + i + '| OffsetI: ' + offsetI + '| i + offset: ' + parseInt(i + offset));
        };

        if (Object.entries(cogInfo)[offsetI][0] >= 96) {
            break;
        }
        processImage(document.getElementById(imageId), offsetI, cogInfo, cogFormat, Object.entries(cogInfo), false, true);
    };
};