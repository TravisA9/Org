entity = ""
user = {}
markers = [];
menuState = "open"
page = "map" // map, territories, admin
appState = { }
unsaved = false
// =============================================================================
// =============================================================================
const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
// =============================================================================
var date = new Date();
terr = [ { date:date, name:"Rio Azul #1", center:{ lat: 17.5077958, lng: -99.4710567 }, outline:[] } ]
// =============================================================================
ent = { name:"default", center:{ lat: 17.510247, lng: -99.475102 },
        territorys:[], currentTerritory:"", users:[user], persons:[] }
// =============================================================================
var cgn = JSON.parse(localStorage.getItem('ent'));
var usr = JSON.parse(localStorage.getItem('user'));
if(cgn != null){
    ent = cgn
    user = usr
}else{
    alert("Aun no hay datos. Haga clic en el mapa para colocar una tachuela y entrar datos!");
}


// Then to retrieve it from storage and convert to an object again:
// var cgn = JSON.parse(localStorage.getItem('user'));

// If we need to delete all entries of the store we can simply do:
// localStorage.clear();

// person = {
//     MemberId:"",
//     Coords:{},
//     Progress:"Publisher",
//     FirstName:"",
//     lastName:"",
//     Col:"",
//     Street:"",
//     HouseNum:"",
//     Notes:"",
//     Territorio:""
// }
