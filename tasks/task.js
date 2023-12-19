
let newtask = document.querySelector('#newtask');
let deleteall = document.querySelector('#deleteall');
let sidevala = document.querySelector('#sidevala');
let sum = 0;
let sumforbtnuses = 0;
let taskname = [];
let distaskbig_storeid;
let distaskbig_store;

let skullinnerhtml = `<div id="intrect">
<button class="tbtn" id="deleteall" onclick="deleteallfn()">delete all</button>
<button class="tbtn" id="newtask" onclick="newtaskfn()">new Task</button>
</div>`;
let distaskbig = `<div id="task_title"></div>
<div id="task_discription">
    <div id="from_when"></div>
    <div id="till_when"></div>
    <div id="other_discription">No discription added</div>
</div>`;





//  [  here is function for making innerhtml of #sidevala  ***************************************************************

function newtaskfnloop() {
    let i = 0;
    while (i < sum) {
        let newhtmlcode = `<div class="taskmodule" id="task${i + 1}">
<p class="taskmodulep1" id="task${i + 1}p1">${i + 1}</p>
<p class="taskmodulep2" id="task${i + 1}p2">${taskname[i]}</p>
<button class="taskmoduleb" id="task${i + 1}bdone" onclick="taskdonefn(this)">Done</button>
<button class="taskmoduleb" id="task${i + 1}bdel" onclick="taskdelfn(this)">Del</button>        
</div>`;
        sumforbtnuses += 1;
        sidevala.innerHTML += newhtmlcode;
        i++
    }
}
console.log('initial value of "sum"' + sum);
// ********************************************* this is for cheaking purpose of code
function temp() {
    taskname = ['gg', 'hh', 'jj', 'kk', 'll'];
    sidevala.innerHTML = skullinnerhtml;
    sum = taskname.length;
    newtaskfnloop();
}
// *********************************************
// **********************************************************************************************************  ]

// [  functions for newtaask and delete all buttons **************************************************************
function newtaskfn() {
    taskname[sum] = prompt("enter task name");
    if (taskname[sum] !== null && taskname[sum] !== undefined) {
        sidevala.innerHTML = skullinnerhtml;
        sum += 1;
        sumforbtnuses += 1;
        console.log('the "sum" is' + sum);

        newtaskfnloop();
    } else {
        console.log('probleme with prompt system');
    }
}

function deleteallfn() {
    sum = 0;
    console.log('after deleteall' + sum);
    sidevala.innerHTML = skullinnerhtml;
    document.querySelector('#distaskbig').innerHTML = '';
}
// **********************************************************************************************************  ]




// {  function for detele or done the task **********************************************************************
let taskdone = [];
let taskdel = [];

function taskdonefn(button) {
    let numericPart = Number((button.id)[4]);

    if (!isNaN(numericPart) && numericPart >= 1 && numericPart <= sum) {
        console.log('Number(button.id) is ' + numericPart);
        taskdone.push(taskname[numericPart - 1]);
        taskname.splice(numericPart - 1, 1);
        console.log(taskname);
        sidevala.innerHTML = skullinnerhtml;
        sum += -1;
        newtaskfnloop();
        if ((button.id).slice(0, 5) === distaskbig_storeid) {
            document.querySelector('#distaskbig').innerHTML = `Select task to see details`;
            distaskbig_store = 'select task to see details';
            console.log('its === in distaskbig_storeid')
        } else {
            // console.log((button.id).slice(0, 5) + '  button.id here')
            // console.log(distaskbig_storeid + '  distaskbig_storeid here')
            console.log('no == match in distaskbig')
        }
    } else {
        console.log('Invalid button ID');
    }
}

function taskdelfn(button) {
    let numericPart = Number((button.id)[4]);

    if (!isNaN(numericPart) && numericPart >= 1 && numericPart <= sum) {
        console.log('Number(button.id) is ' + numericPart);
        taskdel.push(taskname[numericPart - 1]);
        taskname.splice(numericPart - 1, 1);
        console.log(taskname);
        sidevala.innerHTML = skullinnerhtml;
        sum += -1;
        newtaskfnloop();
        if ((button.id).slice(0, 5) === distaskbig_storeid) {
            document.querySelector('#distaskbig').innerHTML = `Select task to see details`;
            distaskbig_store = 'select task to see details';
            console.log('its === in distaskbig_storeid')
        } else {
            console.log((button.id).slice(0, 5) + '  button.id here')
            console.log(distaskbig_storeid + '  distaskbig_storeid here')
            console.log('no == match in distaskbig')
        }
    } else {
        console.log('Invalid button ID');
    }
}
// **********************************************************************************************************  ]



// [   showing task in big display **********************************************************************************
document.addEventListener('DOMContentLoaded', function () {
    // Initial event listener for the common ancestor
    document.querySelector('#sidevala').addEventListener('click', function (event) {
        // Check if the target or its ancestor matches the desired element with the class .taskmodule
        if (event.target.closest('.taskmodule') && !event.target.matches('.taskmoduleb')) {
            console.log((event.target.closest('.taskmodule')).id + '  is open now in display');
            document.querySelector('#distaskbig').innerHTML = distaskbig;
            document.querySelector('#task_title').innerHTML = taskname[Number(((event.target.closest('.taskmodule')).id)[4]) - 1];
            document.querySelector('#from_when').innerHTML = Date().slice(0, 24) + '   a sample time';
            document.querySelector('#till_when').innerHTML = Date().slice(0, 24) + '   a sample time';
            distaskbig_storeid = (event.target.closest('.taskmodule')).id;
            distaskbig_store = document.querySelector('#distaskbig').innerHTML;
        }
    })
});
// working of 'task ' button 
document.querySelector('#distaskbtn').addEventListener('click', function (event) {
    if(sum==0){
        document.querySelector('#distaskbig').innerHTML ='please click on "new task" to start task';
    }else if(Number(distaskbig_storeid[4])==undefined || Number(distaskbig_storeid[4])==null){
        document.querySelector('#distaskbig').innerHTML ='please select task from sidebar';
    }
    else{
        document.querySelector('#distaskbig').style.alignItems = 'center';
        document.querySelector('#distaskbig').innerHTML = distaskbig_store;
    }
    

});

// **********************************************************************************************************  ]


// [  working of 'completed '  button *************************************************************************
document.querySelector('#distaskbtndone').addEventListener('click', function (event) {
    if (sumforbtnuses <= 0) {
        document.querySelector('#distaskbig').innerHTML = 'please click on "new task" to start task';
    } else {
        document.querySelector('#distaskbig').innerHTML = '';
        document.querySelector('#distaskbig').style.justifyContent = 'start';
        document.querySelector('#distaskbig').style.flexDirection = 'column';
        console.log('hi this is distaskbigdonebtn press')

        let i = 0;
        while (i < taskdone.length) {
            let distaskbigdone = ` <div class="deletedtasks" id="deletedtask1">
        <div class="deletedtasksnumber">${i + 1}</div>
        <div class="deletedtaskstitle">${taskdone[i]}</div>
        </div>`;
            document.querySelector('#distaskbig').innerHTML += distaskbigdone;
            i++
        }
    }


});
// **********************************************************************************************************  ]


// [  working of 'deleted'  button *************************************************************************
document.querySelector('#distaskbtndel').addEventListener('click', function (event) {
    if (sumforbtnuses <= 0) {
        document.querySelector('#distaskbig').innerHTML = 'please click on "new task" to start task';
    } else {
        document.querySelector('#distaskbig').innerHTML = '';
        document.querySelector('#distaskbig').style.justifyContent = 'start';
        document.querySelector('#distaskbig').style.flexDirection = 'column';
        console.log('hi this is distaskbigdelbtn press')

        let i = 0;
        while (i < taskdel.length) {
            let distaskbigdel = ` <div class="deletedtasks" id="deletedtask1">
        <div class="deletedtasksnumber">${i + 1}</div>
        <div class="deletedtaskstitle">${taskdel[i]}</div>
        </div>`;
            document.querySelector('#distaskbig').innerHTML += distaskbigdel;
            i++
        }
    }


});
// **********************************************************************************************************  ]