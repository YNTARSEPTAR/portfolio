const API = "https://script.google.com/macros/s/AKfycbwSAYr3MQrti9tEpsB_HKXBcLJEnPKAOolEsX91eTWCOkHxOOlG4fq6jVjErITGeeYn/exec";

let dashboardTimer = null;

let user = "";

function login(name) {

    user = name;

    document.getElementById("home").style.display = "none";

    if (name === "Owner") {

        ownerScreen();

    } else {

        userScreen();

    }

}

function userScreen() {

    document.getElementById("content").innerHTML = `

        <h2>Hello ${user}</h2>

        <p>Will you have dinner tonight?</p>

        <button id="yesBtn" onclick="submitDinner(1)">
            YES
        </button>

        <button id="noBtn" onclick="submitDinner(0)">
            NO
        </button>

        <hr>

        <div id="paymentSummary">

            Loading payment details...

        </div>

        <br>

        <button onclick="showPaymentBox()">

            MAKE PAYMENT

        </button>

    `;

    loadPaymentSummary();

}

async function submitDinner(value) {

    document.getElementById("yesBtn").disabled = true;
    document.getElementById("noBtn").disabled = true;

    document.getElementById("yesBtn").innerText = "Submitting...";
    document.getElementById("noBtn").style.display = "none";

    await fetch(API, {

        method: "POST",

        body: JSON.stringify({

            action: "submit",

            user: user,

            value: value

        })

    });

    alert("Dinner submitted successfully.");

    location.reload();

}

function ownerScreen() {

    document.getElementById("content").innerHTML = `

        <h2>OWNER TERMINAL</h2>

        <hr>

        <h3>DINNER STATUS</h3>

        <div id="dashboard">

            Loading dinner status...

        </div>

        <br>



<button id="approveBtn" onclick="approveDinner()">
    START COOKING
</button>

<hr>

<h3>ADD EXTRA CHARGE</h3>

<select id="chargeUser">

    <option>Harsh</option>

    <option>Tushar</option>

    <option>Abhinav</option>

    <option>Ayush</option>

</select>

<br><br>

<input
id="chargeAmount"
type="number"
placeholder="Amount">

<br><br>

<select
id="chargeReason"
onchange="toggleOtherReason()">

    <option value="Extra Chapati">
        Extra Chapati
    </option>

    <option value="Egg Curry">
        Egg Curry
    </option>

    <option value="Chicken">
        Chicken
    </option>

    <option value="Mutton">
        Mutton
    </option>

    <option value="Other">
        Other
    </option>

</select>

<br><br>

<input

id="otherReason"

type="text"

placeholder="Enter custom reason"

disabled>


<br><br>

<button onclick="addCharge()">

ADD CHARGE

</button>

<hr>

<h3>PAYMENT REQUESTS</h3>

<div id="paymentRequests">

Loading...

</div>



        <div id="paymentRequests">

            Loading payment requests...

        </div>

    `;

    loadDashboard();

    loadPendingPayments();

    if (dashboardTimer === null) {

        dashboardTimer = setInterval(() => {

            loadDashboard();
            loadPendingPayments();

        }, 5000);

    }

}

async function loadDashboard() {

    const response = await fetch(API + "?action=status");

    const data = await response.json();

    const people = [

        "Harsh",

        "Tushar",

        "Abhinav",

        "Ayush"

    ];

    let total = 0;

    let veg = 0;
let nonVeg = 0;

    let html = `

    <table>

        <tr>

            <th>Name</th>

            <th>Status</th>

        </tr>

    `;

    people.forEach(name => {

        let status = "WAITING";

if (data[name] == 1) {

    status = "YES";

    total++;

    if (name === "Harsh" || name === "Abhinav") {

        nonVeg++;

    } else {

        veg++;

    }

}

        else if (data[name] == 0) {

            status = "NO";

        }

        html += `

        <tr>

            <td>${name}</td>

            <td>${status}</td>

        </tr>

        `;

    });

html += `

</table>

<br>

<h2>Total Dinner : ${total}</h2>

<h3>Veg : ${veg}</h3>

<h3>Non Veg : ${nonVeg}</h3>

<hr>

`;

    document.getElementById("dashboard").innerHTML = html;

}

async function approveDinner() {

    const btn = document.getElementById("approveBtn");

    btn.disabled = true;

    btn.innerText = "APPROVING...";

    await fetch(API, {

        method: "POST",

        body: JSON.stringify({

            action: "approve"

        })

    });

    btn.innerText = "DINNER APPROVED";

}

async function loadPaymentSummary() {

    const response = await fetch(
        API + "?action=summary&user=" + encodeURIComponent(user)
    );

    const data = await response.json();

    document.getElementById("paymentSummary").innerHTML = `

        <h3>PAYMENT SUMMARY</h3>

        <table>

        <tr>
        <td>Meals Taken</td>
        <td>${data.meals}</td>
        </tr>

        <tr>
        <td>Meal Rate</td>
        <td>Rs. ${data.rate}</td>
        </tr>

        <tr>
        <td>Meal Charges</td>
        <td>Rs. ${data.mealCharges}</td>
        </tr>

        <tr>
        <td>Extra Charges</td>
        <td>Rs. ${data.extraCharges}</td>
        </tr>

        <tr>
        <td><b>Total Charges</b></td>
        <td><b>Rs. ${data.totalCharges}</b></td>
        </tr>

        <tr>
        <td>Payments Made</td>
        <td>Rs. ${data.paid}</td>
        </tr>

        <tr>
        <td><b>Pending Balance</b></td>
        <td><b>Rs. ${data.balance}</b></td>
        </tr>

        </table>

        `;

}

function showPaymentBox() {

    const amount = prompt("Enter payment amount (Rs.)");

    if (amount === null) return;

    if (amount.trim() === "") return;

    submitPayment(amount);

}

async function submitPayment(amount) {

    await fetch(API, {

        method: "POST",

        body: JSON.stringify({

            action: "payment",

            user: user,

            amount: Number(amount)

        })

    });

    alert("Payment request submitted.");

    loadPaymentSummary();

}

async function loadPendingPayments() {

    const response = await fetch(
        API + "?action=pendingPayments"
    );

    const payments = await response.json();

    let html = "";

    if (payments.length === 0) {

        html = "<p>No pending payment requests.</p>";

    }

    else {

        payments.forEach(payment => {

            html += `

                <div style="border:1px solid black;padding:10px;margin-bottom:10px;">

                    <b>${payment.user}</b><br>

                    Amount : Rs. ${payment.amount}

                    <br><br>

                    <button onclick="approvePayment(${payment.id})">

                        APPROVE

                    </button>

                </div>

            `;

        });

    }

    document.getElementById("paymentRequests").innerHTML = html;

}

async function approvePayment(id) {

    await fetch(API, {

        method: "POST",

        body: JSON.stringify({

            action: "approvePayment",

            id: id

        })

    });

    loadPendingPayments();

}

async function addCharge(){

    const user=
    document.getElementById("chargeUser").value;

    const amount=
    document.getElementById("chargeAmount").value;

    let reason=
    document.getElementById("chargeReason").value;

    if(reason==="Other"){

        reason=
        document.getElementById("otherReason").value.trim();

    }

    if(amount===""){

        alert("Enter amount.");

        return;

    }

    if(reason===""){

        alert("Enter reason.");

        return;

    }

    await fetch(API,{

        method:"POST",

        body:JSON.stringify({

            action:"adjustment",

            user:user,

            amount:Number(amount),

            reason:reason

        })

    });

    alert("Extra charge added.");

    document.getElementById("chargeAmount").value="";

    document.getElementById("chargeReason").selectedIndex=0;

    document.getElementById("otherReason").value="";

    document.getElementById("otherReason").disabled=true;

}

function toggleOtherReason(){

    const reason =
    document.getElementById("chargeReason").value;

    const other =
    document.getElementById("otherReason");

    if(reason==="Other"){

        other.disabled=false;

        other.focus();

    }

    else{

        other.disabled=true;

        other.value="";

    }

}