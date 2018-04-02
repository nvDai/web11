$(document).ready(() => {
    listenToFormSubmitEvent()
})

const listenToFormSubmitEvent = () => {
    const formElement = $(".article-search-form");
    formElement.on("submit", async event => {
        event.preventDefault()

        /**
         * TODO:
         *  - Lấy từ khoá search của người dùng
         *  - Lấy data từ server wikipedia tương ứng với từ khoá search 
         *  - Từ data trả về, tạo một array DOM hiển thị các bài viết của wikipedia
         *  - Đưa các DOM trong array trên vào trong <div class="article-list"></div>
         */
        
        $("#btn-search").on('click', async ()=> {
            //Remove previous loader displayed in previous seacrhing    
            $(".loader").remove();
            //Add a new loader
            $(".article-list").prepend('<div class="loader"></div>');

            //Value of the input form
            const keywordSearching = $("#article-search-form__input").val();

            //get data from https://en.wikipedia.org/w/api.php
            const questionQuery = await $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                method: 'POST',//=action
                data: {
                    action: "query",
                    list: "search",
                    format: "json",
                    srprop: "snippet",
                    origin: "*",
                    srsearch: encodeURI(keywordSearching)
                },
                success: (res) => {
                    let questionQuery = res;
                    return questionQuery;  
                }
            });
            //remove loader before adding elements
            $(".loader").remove();
            //remove elements added in previous seacrhing 
            for (let i = 0; i < questionQuery.query.search.length; i++) {
                $(".article-view").remove();
            }
            //add new elements in element has 'article-list' class name
            for (let i = 0; i < questionQuery.query.search.length; i++) {
                // console.log("Hello");
                // console.log(res.query.search[i]);
                $(".article-list").append('<a href="https://en.wikipedia.org/?curid=' + questionQuery.query.search[i].pageid+ ' target="_blank" class="article-view"><h3 className="article-view__title">'
                 + questionQuery.query.search[i].title + '</h3><p className="article-view__snippet">' + questionQuery.query.search[i].snippet + '</p></a>');
            }
            
         })

    })
}