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
    d: bonus construct exp
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

function storeJson() {
    const input = jsonTextBox.value;
    jsonSidebar.toggleAttribute("hidden");
    alert(input);
};

function attributeExists(element, input) {
    try {
        if(element.getAttribute(input) != null) {
            return true;
        }
        //console.log(element.getAttribute(input))
    } catch {
        return false;
    }
};

const jsonSidebar = document.getElementById("sidebar");
const jsonTextBox = document.getElementById("json-input");
const jsonButton = document.getElementById('json-submit-button');
jsonButton.addEventListener('click', storeJson, false);
window.addEventListener("keyup", (e) => {
    //console.log(e);
    if (e.key === "Escape" && attributeExists(jsonSidebar, "hidden")) {
        jsonSidebar.toggleAttribute("hidden");
    } else {
        return;
    };
});