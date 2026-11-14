
const form = document.getElementById("forms");
const frm = document.getElementById("frm");
const addExp = document.getElementById("expAdd");
const close = document.getElementById("close");
const description = document.getElementById("DESCRIPTION");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const addeer = document.getElementById("adder");
const status = document.getElementById("status");
const table = document.getElementById("tb");
const totalExp = document.getElementById("ExpenseAmount");
const income = document.getElementById("incomeAmount");
const moneyLeftAmt = document.getElementById("moneyLeftAmt");

let dataArr = JSON.parse(localStorage.getItem("strData")) || [];

const ww = document.getElementById('myChartp');
const ctx = document.getElementById('myChart');

let myPi = null;
let myChart = null;
let profCount = 0;
let lossCount = 0;
let data = [];
let len = 0;
let fetched = [];

let c1, c2, c3, c4, c5, c6;
c1=c2=c3=c4=c5=c6=0;






//calls the fetching fuction on loading of the website
document.addEventListener("DOMContentLoaded", () => {
    fetched = JSON.parse(localStorage.getItem("strData")) || [];

    len = fetched.length;

    for (let i = 0; i < len; i++) {
        appendTable(i);
    }
});

// adding mouse down events for form visibility and hiding
function addingEvent() {
    addExp.addEventListener('mouseup', ()=>{
        if (form.classList.contains("hidden")) {
            form.classList.remove("hidden")
        }
    })

    close.addEventListener("mouseup", ()=>{
        form.classList.add("hidden")
    })

    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    })
};


addingEvent();

// stores data in localstorage
addeer.addEventListener('mouseup', (e)=>{

    let desc = description.value.trim()
    let cat = category.value.trim()
    let amt = amount.value.trim()
    let dat = date.value
    let stat = status.value
    let fetched = [];

    e.preventDefault()

    if (desc !== "" && cat !== "" && amt !== "" && dat !== "") {

        if (form.classList.contains("hidden") !== true) {
            form.classList.add("hidden")
        }

        let dataOfTable = {
            data1: desc,
            data2: cat,
            data3: amt,
            data4: stat,
            data5: dat,
        }


        dataArr.push(dataOfTable)

        let dataObj = JSON.stringify(dataArr)
        localStorage.setItem("strData", dataObj)
        frm.reset();

        window.location.reload();
    }

})

//function which fetches data from localstorage and puts it on table, plots graphs
function appendTable(i) {

    let tddat;

    if (fetched[len-1-i].data3.slice(2)>0) {
        tddat = `<td class="profit">${fetched[len-1-i].data3}</td>`
        profCount = profCount + Number(fetched[len-1-i].data3.slice(2));
    }

    else{
        tddat = `<td class="loss">${fetched[len-1-i].data3.replace("-","")}</td>`
        lossCount = lossCount + Number(fetched[len-1-i].data3.slice(2));
        data.push(fetched[len-1-i].data3.slice(3))
    }


    table.innerHTML += `<tr align="start" class="tableData spp${i}">
                            <td>${fetched[len-1-i].data1}</td>
                            <td>${fetched[len-1-i].data2}</td>
                            ${tddat}
                            <td>${fetched[len-1-i].data4}</td>
                            <td>${fetched[len-1-i].data5}</td>
                            <td class="special-child sp${len-1-i}"><i class="fa-solid fa-xmark"></i></td>
                        </tr>`



    const closer = document.getElementById("special-child")

    totalExp.innerHTML = `₹ ${-1*lossCount}`
    income.innerHTML = `₹ ${profCount}`
    moneyLeftAmt.innerHTML = `₹ ${profCount- (-1*(lossCount))}`



    if (fetched[len-1-i].data2 == "Food & Groceries") {
        c1 = c1 + fetched[len-1-i].data3.slice(3)
    }else if(fetched[len-1-i].data2 == "Housing & Bills"){
        c2 = c2 + fetched[len-1-i].data3.slice(3)
    }else if(fetched[len-1-i].data2 == "Shopping & Lifestyle"){
        c3 = c3 + fetched[len-1-i].data3.slice(3)
    }else if(fetched[len-1-i].data2 == "Health & Education"){
        c4 = c4 + fetched[len-1-i].data3.slice(3)
    }else if(fetched[len-1-i].data2 == "Entertainment & Recreation"){
        c5 = c5 + fetched[len-1-i].data3.slice(3)
    }else if(fetched[len-1-i].data2 == "Miscellaneous"){
        c6 = c6 + fetched[len-1-i].data3.slice(3)
    }else{
        console.log("bleh")
    }




    if (myChart) {
        myChart.destroy();
    }

    // Chart.defaults.borderColor = '#f14c52';

    myChart = new Chart(ww, {
        type: 'line',
        data: {
            labels: data.map((_, index) => index + 1),
            datasets: [{
                label: 'Spent',
                data: data.reverse(),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    data = []
    data.push(c1,c2,c3,c4,c5,c6)

    if (myPi) {
        myPi.destroy();
    }


    myPi = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Food & Groceries', 'Housing & Bills', 'hopping & Lifestyle', 'Health & Education', 'Entertainment & Recreation', "Miscellaneous"],
            datasets: [{
                label: '',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}




// to delete table rows

setTimeout(() => {
    const closer = document.querySelectorAll(".special-child")

    closer.forEach(element => {
        element.addEventListener('mouseup', (e)=>{
            let del = element.classList[1]
            console.log(del)

            let ind = del.slice(2)
            console.log(ind)


            let p = document.querySelector(`.spp${ind}`);

            if (p) {
                p.remove();
                dataArr.splice(ind,1)

                let dataObj = JSON.stringify(dataArr)
                localStorage.setItem("strData", dataObj)

                window.location.reload();
            }

        })
    });
}, 100);
