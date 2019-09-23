


// var data = { user:user,
// 		requests:[ {task:"signin",ret:"signin",db:"users",selector:{name:name},update:{}} ]}
// var data = [ {task:"find", ret:"UsersDropdown", db:"users",  selector:{}, update:{} } ]

// =============================================================================
function updateView(data){ // delete_one
    data.push({task:"find", ret:"UsersDropdown", db:"users", selector:{}, update:{name:1} })
    data.push({task:"find_one", ret:"ShowOrg", db:"group", selector:{name:congregation}, update:{} })
	return data;
}
// =============================================================================
function login(){
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    user = {name:name, password:password}
    SelectCong("Valle Esmeralda")
    document.getElementById("login").style.display = "none";
    document.getElementById("controls").style.display = "block";
    getAllOrgs()
    getAllUsers()
}
// =============================================================================
function SelectCong(name){
    var data = [{task:"find_one", ret:"ShowOrg", db:"group",  selector:{ name:name }, update:{} }]
    fetchstuff(data)
}
// =============================================================================
function CreatePerson(){
    var name = document.getElementById("cpname").value
    var email = document.getElementById("cpemail").value
    var password = document.getElementById("cppassword").value
	var newuser = {name:name, password:password, email:email, cong:congregation}

	var data = [ // Add user to organization:  , name: {$exists : false}
            {task:"update_one", ret:"none", db:"group", selector:{name:congregation}, update:{ $push:{ users:{ name:name, email:email }}} },
            {task:"insert_One", ret:"none", db:"users", selector:{}, update:newuser }]
		fetchstuff(updateView(data))
    // Now add user to Org
}
// =============================================================================
function DeletePerson(){}
// =============================================================================
function DeleteUser(name){ // delete_one
    var update = { $pull: { users:{ name:name }}}
	var data = [{task:"delete_one", ret:"none", db:"users", selector:{name:name}, update:{} },
                {task:"update_one", ret:"none", db:"group", selector:{name:congregation}, update:update }
            ]
	fetchstuff(updateView(data))
}
// =============================================================================
function RemoveUser(name){
	var selector = {name:congregation}
    var update = { $pull : { users:{ name:name }}}
	var data = [ // {task:"update_one", ret:"none", db:"group", selector:selector, update:update },
        {task:"update_one", ret:"none", db:"group", selector:selector, update:update } ]
	fetchstuff(updateView(data))
}
// =============================================================================
function logout(){
    user = {}
    document.getElementById("login").style.display = "inline-block";
    document.getElementById("controls").style.display = "none";
}
// =============================================================================
function getAllOrgs(){
    var data = [{task:"find", ret:"MakeDropdown", db:"group",  selector:{}, update:{} }]
    fetchstuff(data)
}
// =============================================================================
function getAllUsers(){
    var data = [{task:"find", ret:"UsersDropdown", db:"users",  selector:{}, update:{} }] //_id:0,  password:0
    fetchstuff(data)
}
// =============================================================================
function CreateTrtry(){
    var name = document.getElementById("territory").value // var date = new Date();
    teritory = {name:name, center:{ lat: 17.5077958, lng: -99.4710567 }, outline:[] }
    var data = [
        {task:"update_one", ret:"none", db:"group",  selector:{name:congregation}, update:{ $push: { territorys:teritory } }},
        ,{task:"find_one", ret:"ShowOrg", db:"group", selector:{name:congregation}, update:{} }]
    fetchstuff(data)
}
// =============================================================================
function DeleteTerr(name){
    var data = [{task:"update_one", ret:"none", db:"group", selector:{name:congregation}, update:{ $pull : { territorys:{ name:name }}}  },
                {task:"find_one", ret:"ShowOrg", db:"group", selector:{name:congregation}, update:{} }]
    fetchstuff(data)
}

// =============================================================================
function CreateCong(){
    var name = document.getElementById("Congregation").value
    var date = new Date();
    var cong = {  name:name, center:{"lat":17.510247, "lng":-99.475102},
                  currentTerritory: "", users:[], persons:[],
                  territorys:[], date:date }
    var data = [{task:"insert_One", ret:"none", db:"group", selector:{}, update:cong },
                {task:"find_one", ret:"ShowOrg", db:"group", selector:{name:congregation}, update:{} },
                {task:"find", ret:"MakeDropdown", db:"group", selector:{}, update:{} }]
    fetchstuff(data)
}

// =============================================================================
function deleteCong(name){
    var data = [{task:"delete_one", ret:"none", db:"group", selector:{name:name}, update:{} },
    {task:"find", ret:"MakeDropdown", db:"group", selector:{}, update:{} }]
    fetchstuff(data)
}
// =============================================================================
function printCong(data){
    congregation = data.name
    var str = "<h2 style=\"text-align:center;\">" + data.name + " <button type=\"button\"  onclick=\"deleteCong('" + data.name + "')\">Delete!</button> </h2>"
    str += "<h4 style=\"text-align:center;\">Center: " + JSON.stringify(data.center) + "</h4>"
    str += "<h3 style=\"text-align:center;\">Current Area: " + data.currentTerritory + "</h3>"
// RemoveUser DeleteUser
        str += "<div style=\"display:inline-block; margin:10px; background:#d6eaf8; padding:8px; border:thin solid steelblue;\">New Area:<input type=\"text\" placeholder=\"Area Name\" id=\"territory\"><button type=\"button\" onclick=\"CreateTrtry()\">Add</button><br>" + getArray("DeleteTerr", data.territorys) + "</div>"

        str += "<div style=\"display:inline-block; margin:10px; background:#fae5d3; padding:8px; border:thin solid steelblue;\"><input type=\"text\" placeholder=\"Username\" id=\"cpname\"><input type=\"text\" placeholder=\"email\" id=\"cpemail\"><input type=\"text\" placeholder=\"Password\" id=\"cppassword\"><button type=\"button\" onclick=\"CreatePerson()\">Add</button><br>" + getArray("RemoveUser", data.users) + "</div>"

        str += "<div style=\"display:inline-block; margin:10px; background:#fcf3cf; padding:8px; border:thin solid steelblue;\">" + getArray("DeletePerson", data.persons) + "</div>"

    str += "</div>"
    return str
}
// =============================================================================

function getArray(func, arr){ var str = ""
    if(arr.length>0){
        for (var i = 0; i < arr.length; i++) { var name = arr[i].Name
            var k = Object.keys(arr[i])
            str += "<div style=\"text-align:center; border-top: thin steelblue solid; padding:5px;\">"
            for (var j = 0; j < k.length; j++) {
                str += k[j] + ":" + arr[i][k[j]] + ", "
            }
            str +=  "   <button type=\"button\"  onclick=\"" + func + "('" + arr[i].name + "')\">Delete!</button></div>"
        }
    }
    return str
}
// =============================================================================
function insertlist(to, data) {
    var str = ""
    for (var i = 0; i < data.length; i++){
        str += "<a onclick=\"SelectCong('" + data[i].name + "')\">" + data[i].name + "</a>";
    }
    document.getElementById(to).innerHTML = str
}
// =============================================================================
function req(r){
	return JSON.stringify({ user:user, requests:r });
}
// =============================================================================
function fetchstuff(postData) {
 var http = new XMLHttpRequest();
     http.overrideMimeType("application/json");
     http.getResponseHeader('Content-Type')
     http.open("POST", "db.json");
     http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText)
        for (var i = 0; i < data.length; i++) {

            if(data[i].ret == "MakeDropdown"){
                insertlist("dropdown", data[i].message)
            }else if(data[i].ret == "UsersDropdown"){
                console.log(data[i])
                var str = ""
                res = data[i].message
                for (var j = 0; j < res.length; j++){
                    var name = res[j].name
                    str += "<a >" + name + "   <button type=\"button\" onclick=\"DeleteUser('" + name + "')\">Delete!</button></a>";
                }
                document.getElementById("Usersdropdown").innerHTML = str
                // insertlist("Usersdropdown", data[i].message)
            }else if(data[i].ret == "ShowOrg"){//requests
                document.getElementById("postResponse").innerHTML = printCong(data[i].message)
            }else if(data[i].ret == "none"){
                document.getElementById("postResponse").innerHTML = "No data found!"
            }


        }
    }
  };

  http.send(req(postData));
}
