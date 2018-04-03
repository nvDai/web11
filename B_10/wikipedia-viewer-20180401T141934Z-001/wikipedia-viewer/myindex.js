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
        
        

        // $("#article-search-form__input").keyup(async ()=> {
        $("#btn-search").on('click', async ()=> {    
            $(".loader").remove();
            $(".article-list").prepend('<div class="loader"></div>');

            const keywordSearching = $("#article-search-form__input").val();
            // const keywordSearching = "";
            // let timeout = null;
            // $("#article-search-form__input").keyup((event)=> {
            //     /* Act on the event */
            //     timeout = setTimeout(function() {
            //         return keywordSearching = $("#article-search-form__input").val();
            //     }, 1000);
            //     clearTimeout(timeout);
            // });
            
            // console.log(keywordSearching);
            const questionQuery = await $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',//đi đến đâu để lấy dữ liệu, thêm api dùng khi liên quan đến lấy data
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
            $(".loader").remove();
            for (let i = 0; i < questionQuery.query.search.length; i++) {
                $(".article-view").remove();
            }

            for (let i = 0; i < questionQuery.query.search.length; i++) {
                // console.log("Hello");
                // console.log(res.query.search[i]);
                $(".article-list").append('<a href="https://en.wikipedia.org/?curid=' + questionQuery.query.search[i].pageid+ ' target="_blank" class="article-view"><h3 className="article-view__title">'
                 + questionQuery.query.search[i].title + '</h3><p className="article-view__snippet">' + questionQuery.query.search[i].snippet + '</p></a>');
            }
            
         })

    })
}