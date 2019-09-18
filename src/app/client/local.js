// =============================================================================
// Intention: store/retrieve sesion, publisher, congregation, territory data.
// =============================================================================
function getCooords(){
    var datos = document.getElementById("Call")
    var lat = datos.getAttribute("data-Xcoord")
    var lng = datos.getAttribute("data-Ycoord")
    return { lat:lat, lng:lng };
}
// =============================================================================
// Get person data from html form.
// =============================================================================
function getCalls(){
    var datos = document.getElementById("Call")
    var index =   document.getElementById("Call").getAttribute("data-index");
    var p = cong.persons[index]
    if(p == undefined){
        alert("Please select a pin to save!")
        return;
    }
    // var lat = datos.getAttribute("data-Xcoord")
    // var lng = datos.getAttribute("data-Ycoord")
    p.coords = { lat:lat, lng:lng }
    p.memberId =   datos.getAttribute("data-MemberId");
    // alert(p.MemberId)
    p.progress =   document.getElementById("Progress").getAttribute("class");
    p.firstName =  document.getElementById("FirstName").value;
    p.lastName =   document.getElementById("LastName").value;
    p.col =        document.getElementById("Col").value;
    p.street =     document.getElementById("Street").value;
    p.houseNum =   document.getElementById("HouseNum").value;
    p.notes =      document.getElementById("Notes").value;
    p.territorio = document.getElementById("Territorio").value;

    localStorage.setItem('cong', JSON.stringify(cong));
    // localStorage.cong
    // setItem('cong', cong);
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
