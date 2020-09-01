//UI Vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#taskList');
let items; 


//load items

loadItems();

eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem);

    //delete all item
    btnDeleteAll.addEventListener('click', deleteAllItem);



}

function addNewItem(e) {

    if (input.value === '') {
        swal("Error", "Please,new add item !", "error");
        e.preventDefault();
    }
    else {

       createItem(input.value);
        //eklenen elemanı local storage a kaydetme

        setItemToLS(input.value);
        swal("Success","New task added !","success")
        //textbox u temizliyoruz
        input.value = '';
        //sayfanın reload edilmesini engelliyoruz.
        e.preventDefault();
    }


}


function deleteItem(e) {

    
    if (e.target.className == 'fas fa-times') {
        swal({
            title: "Are you sure?",
            text: "This operation is irreversible ",
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then((willDelete) => {
                if (willDelete) {
                    e.target.parentElement.parentElement.remove();

                    //Local storage dan item silme
                    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
                    e.preventDefault();
                    swal("Poof! Task deleted.", {
                        icon: "success",
                    });
                } else {
                    swal("Task not deleted.", { icon: "error" });
                    e.preventDefault();
                }
            });

        }
    }




function deleteAllItem(e) {

    // taskList.innerHTML='';

    
    if (localStorage.getItem('items')!=null) {

    swal({
        title: "Are you sure?",
        text: "This operation is irreversible ",
        icon: "warning",
        buttons: true,
        dangerMode: false,
    })
    .then((willDelete) => {
            if (willDelete) {
                while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
                }
                localStorage.clear();
                e.preventDefault();
                swal("Poof! Tasks deleted.", {
                    icon: "success",
                });
            } else {
                swal("Tasks not deleted.",{icon:"error"});
                e.preventDefault();
            }
        });

    } else{
        swal("Error","There is not any task here !","error")
    }
  
    }



function createItem(text) {

    // li elementi oluşturuyoruz
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    // a elementi oluşturuyoruz
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = ('<i class="fas fa-times"></i>')
    //li elementine a elementi ekleme
    li.appendChild(a);
    //li elemanının value değerini inputtan aldığımız değeri giriyoruz
    li.appendChild(document.createTextNode(text));
    //ul elemanına li elemanını ekliyoruz
    taskList.appendChild(li);

}


function loadItems() {
    items=getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });

}

//Local storagedan item bilgisini alma

function getItemsFromLS(){

    if(localStorage.getItem('items')===null) {
        items=[];
    }
    else 
    {
        items=JSON.parse(localStorage.getItem('items'));
    }
    return items;

}

//Local storage a item ekleme

function setItemToLS(text) {
    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

//Local storage dan item silme methodu

function deleteItemFromLS(text) {
    items=getItemsFromLS();
    items.forEach(function(item,index){
        if (item===text) {
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}