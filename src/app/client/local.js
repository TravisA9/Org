// =============================================================================
function req(r){
	return JSON.stringify({ user:user, requests:r });
}
// =============================================================================
// Intention: store/retrieve sesion, publisher, entity, territory data.
// =============================================================================
function getCooords(){
    var datos = document.getElementById("Call")
    var lat = datos.getAttribute("data-Xcoord")
    var lng = datos.getAttribute("data-Ycoord")
    return { lat:lat, lng:lng };
}
// =============================================================================
function DeleteThis(){
	var _id = datos.getAttribute("data-MemberId");
	var p = ent.persons.filter(x => x._id == _id)[0]
	p.task = "delete_one"
    localStorage.setItem('ent', JSON.stringify(ent));
}
// =============================================================================
function SaveAll(){
	var p = ent.persons
	var r = []
 console.log(entity)
	for (var i = 0; i < p.length; i++) {
		let data = {}
		if('task' in p[i]){
			if(p[i].task == 'insert_One'){ delete p[i]['task'];
			    var update = { $push:{ persons:p[i] }}
				data = {task:"insert_One", ret:"none", db:"group", selector:{name:ent.name}, update:update}
					r.push(data)
			}else if(p[i].task == 'delete_one'){ delete p[i]['task'];
				data = {task:"delete_one", ret:"none", db:"group", selector:{name:ent.name}, update:{ $pull:{ persons:{ _id:p[i]._id }}} }
					r.push(data)
			}else if(p[i].task == 'update_one'){ delete p[i]['task'];
				console.log("Person: ", p[i])
				data =  {task:"update_one", ret:"none", db:"group",
				selector:{name:entity}, update:{ $push:{ persons:p[i] }} }
					r.push(data)

 console.log(data)
//
// 				teritory = {name:'Dude!', center:{ lat: 17.5077958, lng: -99.4710567 }, outline:[], date:new Date() }
// 				var data = [
// 				    {task:"update_one", ret:"none", db:"group",  selector:{name:entity},
// 					update:{ $push: { persons:teritory } }},
// 				    {task:"find_one", ret:"none", db:"group", selector:{name:entity}, update:{} }]
// 				fetchthis(data)


			}
		}
		// r.push(data)
	}


 console.log(r)
 fetchthis(r)
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
    // var lat = datos.getAttribute("data-Xcoord")
    // var lng = datos.getAttribute("data-Ycoord")
    p.coords = { lat:lat, lng:lng }
    p._id = datos.getAttribute("data-MemberId");
    // alert(p.MemberId)
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
	p.task = "update_one"


	// fetchstuff(updateView(data))
    localStorage.setItem('ent', JSON.stringify(ent));
    // localStorage.ent
    // setItem('ent', ent);
}
// =============================================================================
// Update
// =============================================================================
function updateLocal() {
      if(typeof(Storage) !== "undefined"){
            if(localStorage.clickcount){
                localStorage.clickcount = Number(localStorage.clickcount)+1;
            }else{
                localStorage.clickcount = 1;
            }
            document.getElementById("number").value = localStorage.clickcount;
      }else{
          document.getElementById("number").value = 0;
      }
}
// =============================================================================
//
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
// map territories admin
// =============================================================================
function selectPage(event){
    var el = document.getElementsByClassName("Selected")[0]
    el.classList.toggle("Selected");
    event.target.classList.add("Selected")
    if(event.target.id == "Maps"){
        document.getElementById("map").setAttribute("style", "display:block;");
        document.getElementById("AdminPage").setAttribute("style", "display:none;");
    }else{
        document.getElementById("map").setAttribute("style", "display:none;");
        document.getElementById("AdminPage").setAttribute("style", "display:block;");
    }
    event.preventDefault()
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
