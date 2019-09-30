// =============================================================================
// Sift through entity data and determine what needs saved, then push commands to list and save
// =============================================================================
function SaveAll(){
	if(!navigator.onLine){ return "Offline"; }
	var p = ent.persons
	var r = []
 console.log(entity)
	for (var i = 0; i < p.length; i++) {
		let data = {}
		if('task' in p[i]){
            let sel = {name:entity}
			if(p[i].task == 'insert_One'){ delete p[i]['task'];
			    var update = { $push:{ persons:p[i] }}
				data = {task:"insert_One", ret:"none", db:"group", selector:sel, update:update}
				r.push(data)
			}else if(p[i].task == 'delete_one'){ delete p[i]['task'];
				data = {task:"update_one", ret:"none", db:"group", selector:sel, update:{ $pull:{ persons:{ _id:p[i]._id }}} }
                // var data = [{task:"update_one", ret:"none", db:"group", selector:{name:entity}, update:{ $pull: { persons:{ _id:id }}} }]
				r.push(data)
			}else if(p[i].task == 'update_one'){ delete p[i]['task'];
				console.log("Person: ", p[i])
				data =  {task:"update_one", ret:"none", db:"group", selector:sel, update:{ $push:{ persons:p[i] }} }
				r.push(data)
			}
		}
	}

	console.log("Saving... ", r)
	fetchthis(r)
	unsaved = false // Data saved...
	clearInterval(intervalId); // stop attempting to save now.
}
// =============================================================================
// Mark data as unsaved, save to localStorage, attempt to push to server
// =============================================================================
function trySaveData(){
    unsaved = true
    localStorage.setItem('ent', JSON.stringify(ent));
		intervalId = setInterval( SaveAll, 3000); // Repetedly attempt to save...
		// SaveAll()
}
// =============================================================================
// Log in as user to get access to corresponding data
// =============================================================================
function login(){
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    user = { name:name, password:password }

    var data = [{task:"find_one", ret:"signin", db:"users",  selector:{ name:name }, update:{} }]
    fetchthis(data)

				document.getElementById("login").style.display = "none";
				document.getElementById("controls").style.display = "block";
}
// =============================================================================
// Sugar: only used below
// =============================================================================
function req(r){
	return JSON.stringify({ user:user, requests:r });
}
// =============================================================================
function fetchthis(postData) {
 var http = new XMLHttpRequest();
     http.overrideMimeType("application/json");
     http.getResponseHeader('Content-Type')
     http.open("POST", "db.json");
     http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText) //  console.log(typeof(data));
        console.log("Response:");
        // console.log(JSON.stringify(data, null, '\t'));

        for (var i = 0; i < data.length; i++) {

            if(data[i].ret== "getOrg"){
                console.log(JSON.stringify(data[i].message))
            }else if(data[i].ret == "getent"){
                // console.log(JSON.stringify())      ent = data[i].message[0]
                console.log(data[i].message)
                    ent = data[i].message
                    entity = ent.name
                    localStorage.setItem('ent', JSON.stringify(ent));
														google.maps.event.trigger(map, 'resize');
														reloadMarkers()
            }else if(data[i].ret == "signin"){
                let reply = data[i].message
                // user.ent = data[i].message.ent
                console.log(reply)
                var dat =  [{task:"find_one",ret:"getent",db:"group",selector:{name:reply.ent},update:{}}]
                    fetchthis(dat)
                // user.email = data[i].message.email
            }else if(data[i].ret == "none"){
            }


        }

    }
  };
  console.log(req(postData))
  http.send(req(postData));
}
