congregation = ""
user = {}
fetchedCong = false
// =============================================================================
function login(){
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    user = { name:name, password:password }

    var data = { user:user,
        requests:[ {task:"signin",ret:"signin",db:"users",selector:{name:name},update:{}} ]}
    fetchthis(data)

    document.getElementById("login").style.display = "none";
    document.getElementById("controls").style.display = "block";
}
// =============================================================================
function reconcileData(local, remote){
    if(local.name == "default"){ return remote; }

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
            }else if(data[i].ret == "getcong"){
                // console.log(JSON.stringify())      cong = data[i].message[0]
                    cong = reconcileData(cong, data[i].message[0])
            }else if(data[i].ret == "signin"){
                let reply = data[i].message[0]
                // user.cong = data[i].message.cong
                console.log(reply)
                var dat = { user:reply,
                    requests:[ {task:"find_one",ret:"getcong",db:"group",selector:{name:reply.cong},update:{}} ]}
                    fetchthis(dat)
                // user.email = data[i].message.email
            }else if(data[i].ret == "none"){
            }


        }

    }
  };

  http.send(JSON.stringify(postData));
}
