
congregation = ""
user = {}
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
function CreatePerson(){
    var name = document.getElementById("cpname").value
    var email = document.getElementById("cpemail").value
    var password = document.getElementById("cppassword").value
		user = {name:name, password:password, email:email, cong:congregation}
		var selector = { name:user.cong }
		var update   = { "\$push": { users:{ name:name, email:email }} }
		var data = [{task:"add_user", user:user, ret:"none", db:"group",  selector:selector, update:update },
                    {task:"find", ret:"UsersDropdown", db:"users",  selector:{}, update:{} } ]
		fetchstuff(JSON.stringify(data))
    SelectCong("Valle Esmeralda")
    // Now add user to Org
}
// =============================================================================
function DeleteUser(name){
    var update = { "\$pull" : { users:{ name:name }}}
	var data = [{task:"del_user", user:user, ret:"none", db:"group",  selector:{name:name}, update:update },
                {task:"find", ret:"UsersDropdown", db:"users",  selector:{}, update:{} },
                {task:"find_one", ret:"ShowOrg", db:"group",  selector:{name:congregation}, update:{} }]
	fetchstuff(JSON.stringify(data))
}
// =============================================================================
function RemoveUser(name){ console.log("RemoveUser")
	var selector = {name:congregation}
    var update = { "\$pull" : { users:{ name:name }}}
	var data = [{task:"rm_user", user:user, ret:"none", db:"group",  selector:selector, update:update }]
	fetchstuff(JSON.stringify(data))
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
    fetchstuff(JSON.stringify(data))
}
// =============================================================================
function getAllUsers(){
    var data = [{task:"find", ret:"UsersDropdown", db:"users",  selector:{}, update:{} }]
    fetchstuff(JSON.stringify(data))
}
// =============================================================================
function CreateTrtry(){
    var name = document.getElementById("territory").value // var date = new Date();
    teritory = {name:name, center:{ lat: 17.5077958, lng: -99.4710567 }, outline:[] }
    var data = [
        {task:"update_one", ret:"none", db:"group",  selector:{name:congregation}, update:{ "\$push": { territorys:teritory } }},
        {task:"find_one", ret:"ShowOrg", db:"group",  selector:{name:congregation}, update:{} }]
    fetchstuff(JSON.stringify(data))
}
// =============================================================================
function DeleteTerr(name){
    var data = [{task:"update_one", ret:"none", db:"group",  selector:{name:congregation}, update:{ "\$pull" : { territorys:{ name:name }}}  },
                {task:"find_one", ret:"ShowOrg", db:"group",  selector:{name:congregation}, update:{} }]
    fetchstuff(JSON.stringify(data))
}
// =============================================================================
function DeletePerson(){

}
// =============================================================================
function CreateCong(){
    var name = document.getElementById("Congregation").value
    var date = new Date();
    var cong = {  name:name, center:{"lat":17.510247, "lng":-99.475102},
                  currentTerritory: "", users:[], persons:[],
                  territorys:[], date:date }
    var data = [{task:"push", ret:"none", db:"group",  selector:{}, update:cong },
                {task:"find_one", ret:"ShowOrg", db:"group",  selector:{name:congregation}, update:{} },
                {task:"find", ret:"MakeDropdown", db:"group",  selector:{}, update:{} }]
    fetchstuff(JSON.stringify(data))
}
// =============================================================================
function SelectCong(name){
    var data = [{task:"find_one", ret:"ShowOrg", db:"group",  selector:{ name:name }, update:{} }]
    fetchstuff(JSON.stringify(data))
}
// =============================================================================
function deleteCong(name){
    var data = [{task:"delete_one", ret:"none", db:"group",  selector:{name:name}, update:{} },
    {task:"find", ret:"MakeDropdown", db:"group",  selector:{}, update:{} }]
    fetchstuff(JSON.stringify(data))
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
function fetchstuff(postData) {
    console.log(postData)
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText) //
				console.log("Response:");
				console.log(data);
        for (var i = 0; i < data.reply.length; i++) {

            if(data.reply[i].function == "MakeDropdown"){
                insertlist("dropdown", data.reply[i].results)
            }else if(data.reply[i].function == "UsersDropdown"){
                var str = ""
                res = data.reply[i].results
                for (var j = 0; j < res.length; j++){
                    var name = res[j].name
                    str += "<a >" + name + "   <button type=\"button\" onclick=\"DeleteUser('" + name + "')\">Delete!</button></a>";
                }
                document.getElementById("Usersdropdown").innerHTML = str
                // insertlist("Usersdropdown", data.reply[i].results)
            }else if(data.reply[i].function == "ShowOrg"){
                document.getElementById("postResponse").innerHTML = printCong(data.reply[i].results)
            }else if(data.reply[i].function == "none"){
                document.getElementById("postResponse").innerHTML = "No data found!"
            }


        }
    }
  };
  xhttp.open("POST", "db.json");
  xhttp.send(postData);
}
