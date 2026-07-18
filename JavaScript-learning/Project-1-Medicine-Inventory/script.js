
let medicines=[];


const savedData=

JSON.parse(

localStorage.getItem("medicines")

);

if(savedData){

    medicines=savedData;

}
displayMedicines();



//Connect Button
const addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click",addMedicine);

//creating function to add medicine and read values
function addMedicine(){
    const name=document.getElementById("medicineName").value;
    const price=document.getElementById("medicinePrice").value;


//if user clicks add without typing

if(name=="" || price==""){
    alert("enter all the fields");
    return;
}

const medicine={
    name,
    price
};
medicines.push(medicine);

//save to local storage
localStorage.setItem(
    "medicines",
JSON.stringify(medicines)
);
displayMedicines();

//clear inputs
document.getElementById("medicineName").value="";
document.getElementById("medicinePrice").value="";
}

function displayMedicines(){
    const list=document.getElementById("medicineList");
    list.innerHTML="";  //to clear previous UI
    medicines.forEach((medicine, index) => {
       list.innerHTML+=`
       <div class="card">
       <h3>${medicine.name}</h3>
       <p>₹${medicine.price}</p>
         <button onclick="deleteMedicine(${index})">
         Delete
         </button>
      
         
       </div>
       `;
    });
}

    //DElete funcn
    function deleteMedicine(index){
        medicines.splice(index,1);
        localStorage.setItem(
            "medicines",
            JSON.stringify(medicines)
        );
        displayMedicines();
    }

