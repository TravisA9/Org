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
function reconcileData(local, remote){
    if(local.name == "default"){ return remote; }
}
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
                    ent = data[i].message // reconcileData(ent, )
                    entity = ent.name
                    localStorage.setItem('ent', JSON.stringify(ent));
														google.maps.event.trigger(map, 'resize');
														reloadMarkers()
														 makeMarkers(ent.persons);
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
