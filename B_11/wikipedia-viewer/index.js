/**
 * TODO:
 *  - Lấy từ khoá search của người dùng
 *  - Lấy data từ server wikipedia tương ứng với từ khoá search 
 *  - Từ data trả về, tạo một array DOM hiển thị các bài viết của wikipedia
 *  - Đưa các DOM trong array trên vào trong <div class="article-list"></div>
 */

$(document).ready(() => {
    listenToFormSubmitEvent()
})

var keywordSearching;
const listenToFormSubmitEvent = async () => {
    
     var questionQuery;
     
    // await $("#article-search-form__input").on("input", $.throttle(1000, false , async ()=>{
        await $("#article-search-form__input").on("input", throttle(async ()=>{
        //Remove previous loader displayed in previous seacrhing    
        removeLoader();
        //Add a new loader
        addLoader();

        //Value of the input form
        keywordSearching = getUserSearchQuery();
        
        //get data from https://en.wikipedia.org/w/api.php
        questionQuery = await getSearchResults(keywordSearching);

        //remove all result when input has no keywordSearching
        if(keywordSearching.length == 0){
            console.log("No question");
            clearData();
        }

        //remove loader before adding elements
        removeLoader();
        //remove elements added in previous seacrhing 
        clearData(); //hoặc $(".article-list").empty()

        //add new elements in element has 'article-list' class name
        let resultSearchingList = questionQuery.query.search;
        processData(resultSearchingList);           
     }), 1000);


    var trigo = false;
     //add results when scroll is at bottom of page
    $(window).scroll(async (event)=> {
        /* Act on the event */
        let docHeight = $(document).height();
        let totalHeight = $( window ).scrollTop() + $( window ).height();

        //when scroll is at bottom of page
        if ((totalHeight >= (docHeight - 20)) && (trigo == false)) {
            trigo = true;
            $(".article-list").append('<div class="loader"></div>');
            //Số thẻ a hiện tại
            let currentElementNumber = $(".article-list > a").length;
            let questionList = await getSearchResults(keywordSearching);
            removeLoader();
            
            let resultSearchingList = questionList.query.search;
            //In ra thêm các kết quả tìm kiểm của từ khoá đó
            appendElement(currentElementNumber, resultSearchingList.length, resultSearchingList);
            trigo = false;       
        }
    }); 
}

var getSearchResults = function(keywordSearching){
    return $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        method: 'POST',//=action
        data: {
            action: "query", //Do sever quy định
            list: "search",
            format: "json",
            srprop: "snippet",
            origin: "*",
            srlimit: 10 + $(".article-list > a").length, //default: 10, sau mỗi lần tăng số lượng req search lên sever 10 req
            srsearch: encodeURI(keywordSearching)//encodeURI:chuyển những ký tự ko hiển thì trên đường link được -> dấu cách
        }
        //nếu muốn callback thì thêm success: (data) {console.log(data)}
    });
}


const debounce = (func, timeDelay)=> {
    let timer;
    
    return ()=> {
        clearTimeout(timer); //clear previous request
        timer = setTimeout(()=> {
            func();
        }, timeDelay);
    }
}

const throttle = (func, timeDelay)=> {
        
        let check;
        return ()=> {
            if(!check) {
                check = true;
                func();
                setTimeout(()=> {
                    check = false;
                }, timeDelay);
            }
        }
}

const appendElement = (begin, end, target)=> {

    for(let i = begin; i < end; i++) {
        //$(".article-list").append('<a href="https://en.wikipedia.org/?curid= '+ resultSearchingList[i].pageid + ' target="_blank" class="article-view"><h3 class="article-view__title">' + resultSearchingList[i].title + '</h3><p class="article-view__snippet">' + resultSearchingList[i].snippet + '</p></a>');
        $(".article-list").append(`
            <a href="https://en.wikipedia.org/?curid= ${target[i].pageid} target="_blank" class="article-view">
                <h3 class="article-view__title">${target[i].title}</h3>
                <p class="article-view__snippet">${target[i].snippet}</p>
            </a>`);
    }  
}


function clearData() {
    $("div.article-list").empty()
}

function addLoader() {
    $(".article-list").prepend('<div class="loader"></div>');

}
function removeLoader() {
    $(".loader").remove();
}


function getUserSearchQuery() {
    let inputElement = $("#article-search-form__input");
    let keywordSearching = inputElement.val();
    return keywordSearching
}



function processData(data) {
    // Hàm này được gọi sau khi dữ liệu được server trả về

    // Check xem query và search có tồn tại không
    if(data.length == 0) {
        $(".article-list").prepend("<h2>Không tìm thấy kết quả cho từ khoá: '" + keywordSearching + "'</h2>");
    } else {
        appendElement(0, 10, data);
    }
}

