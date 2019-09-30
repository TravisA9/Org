// =============================================================================
// Find/Return an object in array by _id
// =============================================================================
function search(value, arr){
    for(var i=0; i < arr.length; i++){
        if(arr[i]._id === value){ return arr[i]; }
    }
}
// =============================================================================
// Delete a person
// =============================================================================
function DeleteThis(){
	var _id = datos.getAttribute("data-MemberId");
	var p = ent.persons.filter(x => x._id == _id)[0]
	p.task = "delete_one"
    trySaveData()
}
// =============================================================================
// Delete person of _id:id
// =============================================================================
function DeletePerson(id){
    if(confirm("Are you sure you want to delete this person?")){
        var item = search(id, ent.persons) // alert(JSON.stringify(item))
        item.task = "delete_one"
        trySaveData()
        reloadMarkers()
    }
}
// =============================================================================
// Get person data from html form.
// =============================================================================
function getCalls(){
    var datos = document.getElementById("Call")
    var index = document.getElementById("Call").getAttribute("data-index");
    var p = ent.persons[index]
    if(p == undefined){
        alert("Please select a pin to save!")
        return;
    }
    p.coords = { lat:lat, lng:lng }
    p._id = datos.getAttribute("data-MemberId");
    p.progress =   document.getElementById("Progress").getAttribute("class");
    p.name =  document.getElementById("FirstName").value;
    p.lastName =   document.getElementById("LastName").value;
    p.col =        document.getElementById("Col").value;
    p.street =     document.getElementById("Street").value;
    p.houseNum =   document.getElementById("HouseNum").value;
    p.notes =      document.getElementById("Notes").value;
    p.territorio = document.getElementById("Territorio").value;
	p.date =       new Date()

	// Flag this for update on server!
    var myid = search(p._id, ent.persons) // Determine if it already exists!
    if(myid != undefined || 'task' in myid){
    	p.task = "update_one"
        myid = p
    }else{
        p.task = "insert_One"
    }

    trySaveData()
}
// =============================================================================
// dead code!
// =============================================================================
// function updateLocal() {
//       if(typeof(Storage) !== "undefined"){
//             if(localStorage.clickcount){
//                 localStorage.clickcount = Number(localStorage.clickcount)+1;
//             }else{
//                 localStorage.clickcount = 1;
//             }
//             document.getElementById("number").value = localStorage.clickcount;
//       }else{
//           document.getElementById("number").value = 0;
//       }
// }
// =============================================================================
// Open/Close menu
// =============================================================================
function toggleMenu(){
    var el = document.getElementById("form")
    if(menuState == "open"){
        el.style.left = "-300px";
        menuState = "closed"
    }else{
        el.style.left = "0px";
        menuState = "open"
    }
}
// =============================================================================
// Toggle between: map, persons, territories, admin
// =============================================================================
function selectPage(event){
    var el = document.getElementsByClassName("Selected")[0]
    el.classList.toggle("Selected");
    event.target.classList.add("Selected")
    if(event.target.id == "Maps"){
        document.getElementById("map").setAttribute("style", "display:block;");
        document.getElementById("AdminPage").setAttribute("style", "display:none;");
    }else if(event.target.id == "Territories"){
			showpeople()
			document.getElementById("map").setAttribute("style", "display:none;");
			document.getElementById("AdminPage").setAttribute("style", "display:block;");
    }else{
        document.getElementById("map").setAttribute("style", "display:none;");
        document.getElementById("AdminPage").setAttribute("style", "display:block;");
    }
    event.preventDefault()
}
// =============================================================================
// Display all people from entity as a table
// =============================================================================
function showpeople(){
	var p = ent.persons
	var str = '<tr><th>Nombre</th><th>Dir</th><th>Notes</th><th>Territorio</th><th>Last Updated</th></tr>'

	for (var i = 0; i < p.length; i++){
        if(!('task' in p[i]) || p[i].task != "delete_one"){
    		str += "<tr><td>" + p[i].lastName + ", " + p[i].name + "<br>" + p[i].progress + "</td>"
    		str += "<td>" + p[i].col + ", " + p[i].street + " " + p[i].houseNum + "</td>"
    		str += "<td>" + p[i].notes + "</td>"
    		str += "<td>" + p[i].territorio + "</td>"
    		str += "<td>" + p[i].date + "<i class=\"la la-trash\" style=\"color:red; font-size:32px;\" onclick=\"DeletePerson('" + p[i]._id + "')\"></i></td></tr>"
        }
	}
	document.getElementById("user").innerHTML = str // JSON.stringify(p)
}
// =============================================================================
// Toggle between: Publisher, Study and ReturnVisit
// <!-- Publicador, Estudio, Revisita -->
// <!-- Tenojnotsketl, Akin Tikmachtia, Akin Tikontlajpaloua -->
// =============================================================================
function toggleProgress(){
    var el = document.getElementById("Progress")
    var prog = el.classList
    if(prog.contains("Publisher")){
        prog.remove("Publisher")
        prog.add("Study")
        el.innerHTML = "Akin Tikmachtia"
    }else if(prog.contains("Study")){
        prog.remove("Study")
        prog.add("RV")
        el.innerHTML = "Akin Tikontlajpaloua"
    }else if(prog.contains("RV")){
        prog.remove("RV")
        prog.add("Publisher")
        el.innerHTML = "Tenojnotsketl"
    }

}
