function saveToLocalStorage(event) {
  event.preventDefault();
  const Expenseamount=event.target.Expenseamount.value;
  const description= event.target.description.value;
  const category= event.target.category.value;

  const obj={
   Expenseamount,
    description,
    category
  }
 localStorage.setItem(obj.Expenseamount,JSON.stringify(obj))
 showNewUserOnScreen(obj)
  }


  window.addEventListener("DOMContentLoaded",()=>{
   const  localStorageObj = localStorage;
   const localstoragekeys=Object.keys(localStorageObj);

   for(var i=0;i<localstoragekeys.length;i++){
     const key = localstoragekeys[i];
     const userDetailsString = localStorageObj[key];
     const userDetailsObj = JSON.parse(userDetailsString);
showNewUserOnScreen(userDetailsObj);
}

})

  function showNewUserOnScreen(user){
   document.getElementById('Expenseamount').value="";
   document.getElementById('description').value ="";
   document.getElementById('category').value="";

   if(localStorage.getItem(user.Expenseamount)!==null){
     removeExpenseTrackerFromScreen(user.Expenseamount)
   }

   const parentNode = document.getElementById('userlist');

   const childHTML  = `<li id=${user.Expenseamount}>${user.Expenseamount} - ${user.description} - ${user.category}
                                   <button onclick=deleteuser('${user.Expenseamount}')> Delete </button>
                                   <button onclick=editUserDetails('${user.Expenseamount}','${user.description}','${user.category}')>Edit </button>
                                </li>`

   parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteuser(Expenseamount){
console.log(Expenseamount);
localStorage.removeItem(Expenseamount);
removeExpenseTrackerFromScreen(Expenseamount);
}

function removeExpenseTrackerFromScreen(Expenseamount){
const parentNode=document.getElementById('userlist');
const childNodeToBeDeleted = document.getElementById(Expenseamount);
if (childNodeToBeDeleted){
parentNode.removeChild(childNodeToBeDeleted)
}
}
// Edit ExpenseTracker list
function editUserDetails(Expenseamount,description,category){
document.getElementById('Expenseamount').value=Expenseamount;
document.getElementById('description').value=description;
document.getElementById('category').value=category;
deleteuser(Expenseamount);
}
