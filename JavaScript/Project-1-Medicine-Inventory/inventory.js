const medicines=[
    {
        id: 1,
        name: "Paracetamol",
        price: 10,
        quantity: 50
    },
    {
        id: 2,
        name: "Ibuprofen",
        price: 15,
        quantity: 30
    },
    {
        id:3,
        name: "Crocin",
        price: 50,
        quantity: 21
    }
];

//Display Medicines

function displayMedicines(){
    console.log("Medicine Inventory");

    for(const medicine of medicines){
        console.log(
            medicine.id,
            medicine.name,
            medicine.price,
            medicine.quantity
        );
    }

}
displayMedicines();

//Add medicine
function addMedicine(id,name,price,quantity){
    medicines.push({
        id,
        name,
        price,
        quantity
    });
}
addMedicine(4,"Aspirin",20,40);
displayMedicines();

//Search Medicine
function SearchMedicine(name){
    let found=false;
    for(const medicine of medicines){
        if(medicine.name==name){
            console.log(medicine);
            found=true;
        }
    }
    if(!found){
        console.log("Medicine not found");
    }

}
SearchMedicine("Crocin");
SearchMedicine("disprin");

//Update quantity
function updateQuantity(id,newQuant){
    for(const medicine of medicines){
        if(medicine.id==id){
            medicine.quantity=newQuant;
            console.log("Quantity updated successfully");
            return;
        }

    }
    console.log("Medicine not found");
}

updateQuantity(2,100);
displayMedicines();

//Delete medicine
function DeleteMedicine(id){
  const index=medicines.findIndex(
    medicine=>medicine.id===id
   );
   if(index!=-1){
    medicines.splice(index,1);
    console.log("Medicine deleted successfully");
   }
   else{
    console.log("Medicine not found");
   }
}
DeleteMedicine(4);
displayMedicines();

//Find expensive med
function findExpensiveMedicine(price){
    const result=medicines.filter(medicine=>medicine.price>=price);
    console.log(result);

}
findExpensiveMedicine(15);

//calculating total value of inventory
function totalInventoryValue(){
    let totalValue=0;
    for(const medicine of medicines){
        totalValue+=medicine.price*medicine.quantity;
    }
    console.log("Total Inventory Value:", totalValue);
}
totalInventoryValue();

//find high price med
function HighestPriceMed(){
    let highest=medicines[0];
    for(const medicine of medicines){
        if(medicine.price>highest.price){
            highest=medicine;
        }
    }
    console.log("Highest Price Medicine:", highest);
}
HighestPriceMed();
