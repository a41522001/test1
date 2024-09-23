const addBtn = document.getElementById("add");
const deleteBtn = document.getElementById("delete");

const memo = document.getElementById("memo");
const date = document.getElementById("date");
const time = document.getElementById("time");
const file = document.getElementById("file");
const status = document.getElementsByClassName("status");

const contents = [];

//渲染頁面
function render() {
  let htmlStr = "";

  contents.forEach(function (content) {
    htmlStr += `
    <table>
        <thead>
          <tr>
            <th class="table-title">Timestamp</th>
            <th class="table-title">Item</th>
            <th class="table-title">File Path</th>
            <th class="table-title">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${content.date} ${content.time}</td>
            <td>${content.memo}</td>
            <td>${content.file}</td>
            <td>${content.status}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    `;
  });

  list.innerHTML = htmlStr;
}

//想要娶初選中的 radio 按鈕
//獲取所有 name 屬性為 status 的元素。返回一個 NodeList
//null 為初始化selectedValue，沒有任何單選按鈕被選即保持null ???
function selectedStatus() {
  const radios = document.querySelectorAll('input[name="status"]');
  let selectedValue = null;

  //檢查每個按鈕是否有被選中，選中即為該值
  radios.forEach(function (radio) {
    if (radio.checked) {
      selectedValue = radio.value;
    }
  });

  const rangeStatus = document.getElementById("range");
  // 如果沒有選擇任何 radio，則使用 range 的值
  if (selectedValue === null) {
    selectedValue = rangeStatus.value;
  }
  return selectedValue;
}

//新增按鈕的監聽事件
//unshift 從第一個推 <-> push 從最後一個推
// 儲存選中的狀態，沒有選就使用 range
addBtn.addEventListener("click", function () {
  contents.unshift({
    memo: memo.value,
    date: date.value,
    time: time.value,
    file: file.value,
    status: selectedStatus(),
  });

  //這塊是為了清空欄位資料，再次新增下一筆
  memo.value = "";
  date.value = "";
  time.value = "";
  file.value = "";

  // 清空已選擇的 radio 按鈕
  const radios = document.querySelectorAll('input[name="status"]');
  radios.forEach(function (radio) {
    radio.checked = false;
  });

  // 重新渲染列表
  render();
});

//刪除按鈕的監聽事件
//shift 移除第一個 <-> pop 移除最後一個
deleteBtn.addEventListener("click", function () {
  contents.shift();

  render();
});
