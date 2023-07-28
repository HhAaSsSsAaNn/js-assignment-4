let idInput = document.getElementById('id');
let nameInput = document.getElementById('Name');
let urlInput = document.getElementById('url');
let urlvalidSpan = document.getElementById('urlValidation');
let siteNamevalidSpan = document.getElementById('siteNameValidation');
let productTableBody = document.getElementById('productTableBody');
let MyModal = document.getElementById('MyModal');
let updateBtn = document.getElementById('update');
let createBtn = document.getElementById('create');
let hideModalBtn = document.getElementById('hideModal');
updateBtn.style.display = 'none';
urlvalidSpan.style.display = 'none';
siteNamevalidSpan.style.display = 'none';

//================== login project ==========================
let welcomeUser = document.getElementById("welcome");
let logoutBtn = document.getElementById("logout");

welcomeUser.innerHTML = localStorage.getItem("loggedinUser");
logoutBtn.addEventListener("click", function(){
    localStorage.setItem("loggedinUser", "");
    window.location.href = window.location.origin + "/index.html"
})

const urlPattern = RegExp('^(https?:\\/\\/)?'+ // validate protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
'((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
'(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
'(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator

urlInput.addEventListener("focusout", function(){
    if(!urlPattern.test(urlInput.value)){
        urlvalidSpan.style.display = 'block';
    }
});

nameInput.addEventListener("focusout", function(){
    for (let i = 0; i < listOfBookMarks.length; i++) {
        if (nameInput.value.toLowerCase() == listOfBookMarks[i].siteName.toLowerCase() && idInput.value != i) {
            siteNamevalidSpan.style.display = 'block';
        }
     }
});

function checkValidation(){
    if (urlvalidSpan.style.display == 'block' 
    || siteNamevalidSpan.style.display == 'block' 
    || nameInput.value =="" || urlInput.value == "") {
        return false;
    }
    return true;
}

let listOfBookMarks = localStorage.getItem("ourBookmarks") == null ? [] : 
JSON.parse(localStorage.getItem("ourBookmarks"));
retriveData();

createBtn.addEventListener('click', createBookmark);
updateBtn.addEventListener('click', updateBookmarkData);
hideModalBtn.addEventListener('click', function(){
    MyModal.style.display = "none"
});

function createBookmark(){
    if (!checkValidation() ) {
        urlvalidSpan.style.display = 'block';
        siteNamevalidSpan.style.display = 'block';
        MyModal.style.display = "block"
    }
    else{
        let ProductObj ={
            siteName : nameInput.value,
            siteUrl : urlInput.value,
        }
        listOfBookMarks.push(ProductObj);
        save();
    
        console.log(listOfBookMarks);
        retriveData()
    
        //clear inputs
        clearInputs();
    }
}

function clearInputs(){
    idInput.value = "";
    nameInput.value = "";
    urlInput.value = "";
}

function retriveData(){
    let tableBody = ``;
    for (let i = 0; i < listOfBookMarks.length; i++) {
        tableBody +=  `<tr>
        <td style="display: none;" id="id">${i}</td>
        <td id="name">${listOfBookMarks[i].siteName}</td>
        <td id="url"><a target="_blank" class="btn btn-success" href="${listOfBookMarks[i].siteUrl}"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td id="update">
            <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
        </td>
        <td id="delete">
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
        </td>
    
    </tr>`
        
    }
    productTableBody.innerHTML = tableBody
}

function deleteProduct(index)
{
    listOfBookMarks.splice(index,1);
    save();
    retriveData();
}
function updateProduct(index){
    let product = listOfBookMarks[index];
    idInput.value = index;
    nameInput.value = product.siteName;
    urlInput.value = product.siteUrl;
    window.scrollTo(0, 0);
    updateBtn.style.display = 'block';
    createBtn.style.display = 'none';
}
function updateBookmarkData()
{
    if (!checkValidation() ) {
        urlvalidSpan.style.display = 'block';
        siteNamevalidSpan.style.display = 'block';
        MyModal.style.display = "block"
    }
    else{
        console.log(idInput.value)
        let ProductObj ={
        siteName : nameInput.value,
        siteUrl : urlInput.value,
        }
        listOfBookMarks[idInput.value] = ProductObj;
        save();
        retriveData();
        updateBtn.style.display = 'none';
        createBtn.style.display = 'block';
        window.scrollTo(0, 800);
        clearInputs();
    }
    
}

function save(){
    localStorage.setItem("ourBookmarks", JSON.stringify(listOfBookMarks))
}

function SearchProducts(input)
{
    let tableBody = ``;
    for (let i = 0; i < listOfBookMarks.length; i++) {
        if (listOfBookMarks[i].siteName.toLowerCase().includes(input.value.toLowerCase())) {
            tableBody +=  `<tr>
        <td style="display: none;" id="id">${i}</td>
        <td id="name">${listOfBookMarks[i].siteName}</td>
        <td id="url"><a target="_blank" class="btn btn-success" href="${listOfBookMarks[i].siteUrl}"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td id="update">
            <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
        </td>
        <td id="delete">
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
        </td>
    
    </tr>`
        }
        
        
    }
    productTableBody.innerHTML = tableBody
}

