function checkStudent() {
  let listData = JSON.parse(localStorage.getItem("listData"));
  let studentPhone = document.getElementById("studentPhone").value;
  let exist = false;
  if (listData != null) {
    for (const student of listData) {
      if (student.studentPhone == studentPhone) {
        exist = true;
        break;
      }
    }
  }
  if (exist) {
    updateData();
  } else {
    createData();
  }
}
function validate() {
  event.preventDefault();
  if (document.dataForm.studentName.value == "") {
    alert("Vui lòng nhập tên!");
    document.dataForm.studentName.focus();
    return false;
  } else if (document.dataForm.studentMail.value == "") {
    alert("Vui lòng nhập Email!");
    document.dataForm.studentMail.focus();
    return false;
  } else if (
    document.dataForm.studentPhone.value == "" ||
    isNaN(document.dataForm.studentPhone.value) ||
    document.dataForm.studentPhone.value.length != 10
  ) {
    alert("Vui lòng nhập số điện thoại");
    document.dataForm.studentPhone.focus();
    return false;
  } else if (document.dataForm.studentAddress.value == "") {
    alert("Vui lòng nhập địa chỉ");
    return false;
  } else {
    checkStudent();
  }
}

function createData(e) {
  event.preventDefault();
  console.log("hihi");
  let listData = JSON.parse(localStorage.getItem("listData"));
  if (listData == null) {
    listData = [];
  }
  let studentName = document.getElementById("studentName").value;
  let studentMail = document.getElementById("studentMail").value;
  let studentPhone = document.getElementById("studentPhone").value;
  let studentAddress = document.getElementById("studentAddress").value;
  let gender = document.getElementById("gender").value;

  let studentNew = {
    studentName: studentName,
    studentMail: studentMail,
    studentPhone: studentPhone,
    studentAddress: studentAddress,
    gender: gender,
  };
  listData.push(studentNew);
  localStorage.setItem("listData", JSON.stringify(listData));
  readListData();
}
function readListData() {
  console.log("hehe");
  let listData = JSON.parse(localStorage.getItem("listData"));
  if (listData == null) {
    listData = [];
  }
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  listData.forEach((student, index) => {
    tableBody.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${student.studentName}</td>
    <td>${student.gender}</td>
    <td>${student.studentMail}</td>
    <td>${student.studentPhone}</td>
    <td>${student.studentAddress}</td>
    <td>
        <button onclick="editData('${
          student.studentPhone
        }')" data-bs-toggle="modal" data-bs-target="#studentInfor">Edit</button>
        <button onclick="deleteData('${student.studentPhone}')">Delete</button>
    </td>
</tr>`;
  });
}
readListData();
function editData(studentPhone) {
  let listData = JSON.parse(localStorage.getItem("listData"));
  let studentUpdate = listData.filter((student) => {
    if (student.studentPhone == studentPhone) {
      return student;
    }
  });
  document.getElementById("studentPhone").value = studentUpdate[0].studentPhone;
  document.getElementById("studentName").value = studentUpdate[0].studentName;
  document.getElementById("studentMail").value = studentUpdate[0].studentMail;
  document.getElementById("studentAddress").value =
    studentUpdate[0].studentAddress;
}
function updateData() {
  let listData = JSON.parse(localStorage.getItem("listData"));
  let studentName = document.getElementById("studentName").value;
  let studentMail = document.getElementById("studentMail").value;
  let studentPhone = document.getElementById("studentPhone").value;
  let studentAddress = document.getElementById("studentAddress").value;
  let gender = document.getElementById("gender").value;
  let studentUpdate = listData.map((student) => {
    if (student.studentPhone == studentPhone) {
      student.studentPhone = studentPhone;
      student.studentName = studentName;
      student.studentMail = studentMail;
      student.studentAddress = studentAddress;
      student.gender = gender;
    }
    return student;
  });
  localStorage.setItem("listData", JSON.stringify(studentUpdate));

  readListData();
}
function deleteData(studentPhone) {
  let listData = JSON.parse(localStorage.getItem("listData"));
  for (i = 0; i < listData.length; i++) {
    if (listData[i].studentPhone == studentPhone) {
      listData.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("listData", JSON.stringify(listData));
  readListData();
}
