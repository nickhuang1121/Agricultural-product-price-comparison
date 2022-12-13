/**https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx */

const viewBoard = document.querySelector("#viewBoard");
const typeN04 = document.querySelector("#typeN04");
const typeN05 = document.querySelector("#typeN05");
const typeN06 = document.querySelector("#typeN06");
const typeAll = document.querySelector("#typeAll");
const startSearch = document.querySelector("#startSearch");
const searchText = document.querySelector("#searchText");
const searchFinalMsg = document.querySelector("#searchFinalMsg");
const sortBoardSelect = document.querySelector("#sortBoardSelect");

const upPriceBtn = document.querySelector("#upPriceBtn");
const midPriceBtn = document.querySelector("#midPriceBtn");
const bottomPriceBtn = document.querySelector("#bottomPriceBtn");
const avePriceBtn = document.querySelector("#avePriceBtn");
const tradeBtn = document.querySelector("#tradeBtn");


let data = [];
let newData = [];
let tempLi = "";

let nowType = "all"; /**苦瓜 */
let nowSort = sortBoardSelect.value;



axios.get("https://hexschool.github.io/js-filter-data/data.json").then(function (response) {

    data = response.data;
    reflashRender();
    //reflashRender("N06", "trade");

    /**
     * all = 全部顯示
     * N04 = 蔬菜
     * N05 = 水果
     * N06 = 花卉
     */
    /**
     * normal = 不排序
     *  upPrice = 上價排序
     * bottomPrice = 下價排序
     * midPrice = 中價排序
     *avePrice = 平均價排序
     * trade = 交易量排序
     */
});






function reflashRender() {
    reset();


    if (nowSort === "normal") {
        newData = data;
    };
    if (nowSort === "upPrice") {
        newData = data.sort(function (x, y) {
            return y.上價 - x.上價;
        })
    };
    if (nowSort === "upPrice2") {
        newData = data.sort(function (x, y) {
            return x.上價 - y.上價;
        })
    };
    if (nowSort === "bottomPrice") {
        newData = data.sort(function (x, y) {
            return y.下價 - x.下價;
        })
    };
    if (nowSort === "bottomPrice2") {
        newData = data.sort(function (x, y) {
            return x.下價 - y.下價;
        })
    };
    if (nowSort === "midPrice") {
        newData = data.sort(function (x, y) {
            return y.中價 - x.中價;
        })
    };
    if (nowSort === "midPrice2") {
        newData = data.sort(function (x, y) {
            return x.中價 - y.中價;
        })
    };
    if (nowSort === "avePrice") {
        newData = data.sort(function (x, y) {
            return y.平均價 - x.平均價;
        })
    };
    if (nowSort === "avePrice2") {
        newData = data.sort(function (x, y) {
            return x.平均價 - y.平均價;
        })
    };
    if (nowSort === "trade") {
        newData = data.sort(function (x, y) {
            return y.交易量 - x.交易量;
        })
    };
    if (nowSort === "trade2") {
        newData = data.sort(function (x, y) {
            return x.交易量 - y.交易量;
        })
    };


    let tempData = [];
    if (nowType == "all") {
        tempData = newData;
    };
    if (nowType == "N04") {
        tempData = newData.filter(function (item) {
            return item.種類代碼 === "N04"
        });
    };
    if (nowType == "N05") {
        tempData = newData.filter(function (item) {
            return item.種類代碼 === "N05"
        });
    };
    if (nowType == "N06") {
        tempData = newData.filter(function (item) {
            return item.種類代碼 === "N06"
        });
    };

    if (nowType !== "all" && nowType !== "N04" && nowType !== "N05" && nowType !== "N06") {
        tempData = newData.filter(function (item) {
            if (item.作物名稱 !== null) {
                if (item.作物名稱.indexOf(nowType) !== -1) {
                    return item
                };
            }

        });

        if (tempData.length == 0) {
            alert("沒有相關資料，請重新查詢!")
        };

    };






    tempData.forEach(function (item, idx) {
        tempLi += `
        <li>
            <span>${item.作物名稱}</span>
            <span>${item.市場名稱}</span>
            <span>${item.上價}</span>
            <span>${item.中價}</span>
            <span>${item.下價}</span>
            <span>${item.平均價}</span>
            <span>${item.交易量}</span>
            </li>
            `;
    });


    viewBoard.innerHTML = tempLi;
};





typeN04.addEventListener("click", function () {
    nowType = "N04";
    reflashRender();
});
typeN05.addEventListener("click", function () {
    nowType = "N05";
    reflashRender();
});
typeN06.addEventListener("click", function () {
    nowType = "N06";
    reflashRender();
});

typeAll.addEventListener("click", function () {
    nowType = "all";
    reflashRender();
});


startSearch.addEventListener("click", function () {

    if (searchText.value.trim() !== "") {
        nowType = searchText.value;
        reflashRender();
        searchFinalMsg.querySelector("p").querySelector("span").textContent = nowType;
        searchFinalMsg.querySelector("p").classList.add("act");
    } else {
        alert("請輸入正確資訊")
    };

});
/**searchText */




sortBoardSelect.addEventListener("change", function () {
    nowSort = sortBoardSelect.value;
    reflashRender();
});



upPriceBtn.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-dir") === "up") {
        nowSort = "upPrice";
    } else {
        nowSort = "upPrice2";
    };
    sortBoardSelect.value = "upPrice";
    reflashRender();
});
midPriceBtn.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-dir") === "up") {
        nowSort = "midPrice";
    } else {
        nowSort = "midPrice2";
    };
    sortBoardSelect.value = "midPrice";
    reflashRender();
});

bottomPriceBtn.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-dir") === "up") {
        nowSort = "bottomPrice";
    } else {
        nowSort = "bottomPrice2";
    };
    sortBoardSelect.value = "bottomPrice";
    reflashRender();
});
avePriceBtn.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-dir") === "up") {
        nowSort = "avePrice";
    } else {
        nowSort = "avePrice2";
    };
    sortBoardSelect.value = "avePrice";
    reflashRender();
});

tradeBtn.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-dir") === "up") {
        nowSort = "trade";
    } else {
        nowSort = "trade2";
    };
    sortBoardSelect.value = "tradePrice";
    reflashRender();
});


function reset() {
    tempLi = "";
    newData = [];
    searchFinalMsg.querySelector("p").classList.remove("act");

};

