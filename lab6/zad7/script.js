var modal = document.getElementsByClassName("modal")[0];
var modalContent = document.getElementById("modal-img");
var btns = document.getElementsByClassName("btn");
var span = document.getElementsByClassName("close")[0];

console.log(btns);
for(let btn of btns) {
    btn.onclick = function(){
        modal.style.display = "block";
        modalContent.src = this.src;
    } 
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }