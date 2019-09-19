congregation = ""
user = {}
markers = [];
menuState = "open"
page = "map" // map, territories, admin
appState = { }
// =============================================================================
// user = {
//     name:"Travis",
//     role:"SuperAdmin",
//     id:"122345",
//     email:"travisashworth2007@gmail.com",
//     cong:"Valle Esmeralda",
// }
// =============================================================================
var date = new Date();
terr = [ { date:date, name:"Rio Azul #1", center:{ lat: 17.5077958, lng: -99.4710567 }, outline:[] } ]
// =============================================================================
cong = { name:"default", center:{ lat: 17.510247, lng: -99.475102 },
        territorys:[], currentTerritory:"", users:[user], persons:[] }
// =============================================================================
var cgn = JSON.parse(localStorage.getItem('cong'));
var usr = JSON.parse(localStorage.getItem('user'));
if(cgn != null){
    cong = cgn
    user = usr
}else{
    alert("Aun no hay datos. Haga clic en el mapa para colocar una tachuela y entrar datos!");
}



// Then to retrieve it from the store and convert to an object again:
// var cgn = JSON.parse(localStorage.getItem('user'));

// If we need to delete all entries of the store we can simply do:
// localStorage.clear();

person = {
    MemberId:"",
    Coords:{},
    Progress:"Publisher",
    FirstName:"",
    LastName:"",
    Col:"",
    Street:"",
    HouseNum:"",
    Notes:"",
    Territorio:""
}
