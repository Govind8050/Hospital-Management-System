// ----------------------------
// GENERATE RANDOM REF NUMBER
// ----------------------------
function generateRef() {
    return Math.floor(10000 + Math.random() * 90000);
}

// INPUT FIELDS
const refInput = document.querySelectorAll("#myname input")[0];
const nameInput = document.querySelectorAll("#myname input")[1];
const motherInput = document.querySelectorAll("#myname input")[2];
const postcodeInput = document.querySelectorAll("#myname input")[3];
const mobileInput = document.querySelectorAll("#myname input")[4];
const emailInput = document.querySelectorAll("#myname input")[5];
const idNumberInput = document.querySelectorAll("#myname input")[6];
const addressInput = document.querySelectorAll("#myname input")[7];

// SELECT BOXES
const gender = document.querySelectorAll("select")[0];
const nationality = document.querySelectorAll("select")[1];
const idProof = document.querySelectorAll("select")[2];

// BUTTONS
const addBtn = document.getElementById("AddBtn");
const updateBtn = document.getElementById("updateBtn");
const delBtn = document.getElementById("DelBtn");
const resetBtn = document.getElementById("resetBtn");

// TABLE BODY
const tableBody = document.querySelector("#customerTable tbody");

// ----------------------------
// LOAD SAVED DATA
// ----------------------------
let allData = JSON.parse(localStorage.getItem("customers")) || [];
let selectedRef = null;

// ----------------------------
// DISPLAY TABLE
// ----------------------------
function showTable() {
    tableBody.innerHTML = "";

    allData.forEach(customer => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${customer.ref}</td>
            <td>${customer.name}</td>
            <td>${customer.mother}</td>
            <td>${customer.gender}</td>
            <td>${customer.mobile}</td>
            <td>${customer.email}</td>
            <td>${customer.nationality}</td>
            <td>${customer.idProof}</td>
            <td>${customer.idNumber}</td>
            <td>${customer.address}</td>
        `;

        tr.addEventListener("click", () => fillForm(customer.ref));
        tableBody.appendChild(tr);
    });
}

// ----------------------------
// FILL FORM FOR UPDATE
// ----------------------------
function fillForm(refNo) {
    const c = allData.find(item => item.ref === refNo);
    selectedRef = refNo;

    refInput.value = c.ref;
    nameInput.value = c.name;
    motherInput.value = c.mother;
    gender.value = c.gender;
    mobileInput.value = c.mobile;
    emailInput.value = c.email;
    nationality.value = c.nationality;
    idProof.value = c.idProof;
    idNumberInput.value = c.idNumber;
    addressInput.value = c.address;
}

// ----------------------------
// ADD NEW CUSTOMER
// ----------------------------
addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const customer = {
        ref: refInput.value,
        name: nameInput.value,
        mother: motherInput.value,
        gender: gender.value,
        mobile: mobileInput.value,
        email: emailInput.value,
        nationality: nationality.value,
        idProof: idProof.value,
        idNumber: idNumberInput.value,
        address: addressInput.value
    };

    // Validation
    if (Object.values(customer).includes("")) {
        alert("⚠ Please fill all fields!");
        return;
    }

    allData.push(customer);
    localStorage.setItem("customers", JSON.stringify(allData));

    alert("✔ Added Successfully!");
    resetForm();
    showTable();
    refInput.value = generateRef();
});

// ----------------------------
// UPDATE CUSTOMER
// ----------------------------
updateBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!selectedRef) {
        alert("⚠ Select any row to update!");
        return;
    }

    allData = allData.map(c => {
        if (c.ref === selectedRef) {
            return {
                ref: refInput.value,
                name: nameInput.value,
                mother: motherInput.value,
                gender: gender.value,
                mobile: mobileInput.value,
                email: emailInput.value,
                nationality: nationality.value,
                idProof: idProof.value,
                idNumber: idNumberInput.value,
                address: addressInput.value
            };
        }
        return c;
    });

    localStorage.setItem("customers", JSON.stringify(allData));

    alert("✔ Updated Successfully!");
    selectedRef = null;
    resetForm();
    showTable();
    refInput.value = generateRef();
});

// ----------------------------
// DELETE CUSTOMER
// ----------------------------
delBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!selectedRef) {
        alert("⚠ Select any row to delete!");
        return;
    }

    allData = allData.filter(c => c.ref !== selectedRef);
    localStorage.setItem("customers", JSON.stringify(allData));

    alert("🗑 Deleted Successfully!");
    selectedRef = null;
    resetForm();
    showTable();
    refInput.value = generateRef();
});

// ----------------------------
// RESET FORM
// ----------------------------
function resetForm() {
    document.querySelector("form").reset();
}

// RESET BUTTON
resetBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // 1) Confirm user wants to clear everything
    if (!confirm("⚠ This will clear ALL saved customers. Continue?"))
        return;

    // 2) Clear full data
    allData = [];
    localStorage.removeItem("customers");

    // 3) Clear table
    tableBody.innerHTML = "";

    // 4) Clear form
    resetForm();

    // 5) Generate new ref number
    refInput.value = generateRef();

    alert("✔ All Data Cleared Successfully!");
});

// ----------------------------
// PAGE LOAD
// ----------------------------
window.onload = function () {
    refInput.value = generateRef();
    showTable();
};
