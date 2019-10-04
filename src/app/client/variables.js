entity = "" // Entity that the user belongs to.
user = {} // Current user.
markers = []; // Map markers.
menuState = "open" // Is the menu open or closed
page = "map" // Visible content: map, territories, admin
unsaved = false // Is all content saved?
areaChanged = false // Has 'area' data been changed?
// =============================================================================
// Generate BSON-style _id
// =============================================================================
const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
// =============================================================================
// Generate some default data: may no longer be needed.
// =============================================================================
var date = new Date();
terr = [ { date:date, name:"Rio Azul #1", center:{ lat: 17.5077958, lng: -99.4710567 }, outline:[] } ]
// =============================================================================
ent = { name:"default", center:{ lat: 17.510247, lng: -99.475102 },
        territorys:[], currentTerritory:"", users:[user], persons:[] }
// =============================================================================
//  Load data from localStorage  just in case no connection can be established.
// =============================================================================
var cgn = JSON.parse(localStorage.getItem('ent'));
var usr = JSON.parse(localStorage.getItem('user'));
if(cgn != null){
    ent = cgn
    user = usr
}else{
    alert("Aun no hay datos. Haga clic en el mapa para colocar una tachuela y entrar datos!");
}
