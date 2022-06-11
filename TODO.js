Showdata();
let addtask = document.getElementById('addtask')
let addtaskbtn = document.getElementById('addtaskbtn')


addtaskbtn.addEventListener("click", function() {
    addtaskval = addtask.value;
    if (addtaskval.trim() != 0) {

        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            taskobj = [];
        } else {
            taskobj = JSON.parse(webtask);
        }
        taskobj.push(addtaskval);
        localStorage.setItem('localtask', JSON.stringify(taskobj));
        addtask.value = '';
    }
    Showdata();

})

function Showdata() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskobj = [];
    } else {
        taskobj = JSON.parse(webtask);
    }
    let html = '';
    let addedtask = document.getElementById('addedtask');
    taskobj.forEach((item, index) => {
        html += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${item}</td>
                        <td><button type="button" onclick="edittask(${index})" class="text-primary">
                            <i class=" fa-edit"></i>Edit</button></td>
                        <td><button type="button" onclick="Deletedata(${index})" class="text-danger"><i class=" fa-trash">
                            </i>Delete</button></td>
             </tr>`;

    });
    addedtask.innerHTML = html;

}
//edittask
function edittask(index) {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    addtask.value = taskobj[index];
    let addtaskbtn = document.getElementById('addtaskbtn');
    let updatebtn = document.getElementById('updatebtn');
    addtaskbtn.style.display = "none";
    updatebtn.style.display = "block";
    let saveindex = document.getElementById('saveindex');
    saveindex.value = index;

}
//updatetask
let updatebtn = document.getElementById('updatebtn');
updatebtn.addEventListener("click", function() {
        let webtask = localStorage.getItem("localtask");
        let taskobj = JSON.parse(webtask);
        let addtaskbtn = document.getElementById('addtaskbtn');
        let saveindex = document.getElementById('saveindex').value;
        taskobj[saveindex] = addtask.value;
        updatebtn.style.display = "none";
        addtaskbtn.style.display = 'block';
        localStorage.setItem('localtask', JSON.stringify(taskobj));
        addtask.value = '';
        Showdata();
    })
    // Delete task
function Deletedata(index) {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.splice(index, 1);
    localStorage.setItem('localtask', JSON.stringify(taskobj));
   
    Showdata();
}
//Deleteall
let deletebtn = document.getElementById('deletebtn');
deletebtn.addEventListener("click", function() {
        let webtask = localStorage.getItem("localtask");
        let taskobj = JSON.parse(webtask);
        if (webtask == null) {
            taskobj = [];
        } else {
            taskobj = JSON.parse(webtask);
            taskobj = [];
        }
        let addtaskbtn = document.getElementById('addtaskbtn')
        let updatebtn = document.getElementById('updatebtn')
        addtaskbtn.style.display = "block";
        updatebtn.style.display = "none";

        localStorage.setItem('localtask', JSON.stringify(taskobj));
        Showdata();
    })
    //search list
let searchtext = document.getElementById('searchtext');
searchtext.addEventListener("input", function() {
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item) {
        let searchedtxt = item.getElementsByTagName("td")[0].innerText;
        let searchedtxtval = searchtext.value;
        let re = new RegExp(searchedtxtval, 'gi');
        if (searchedtxt.match(re)) {
            item.style.display = "block";

        } else {
            item.style.display = "none";
        }
    })
})