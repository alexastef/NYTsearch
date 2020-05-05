$(document).ready(function() {

    // 1. Retrieve user inputs and convert to variables
    // 2. Use those variables to run an AJAX call to the NYT
    // 3. Break down JSON object into usable fields
    // 4. Dynamically generate html content

    var apiKey = "xmhrGeNrrNKUESbLAfd2yULXoPamWdmG"; 
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;


    var searchBtn = $(".btn-search-article");
    var clearBtn = $(".btn-clear-results");



    function runQuery(numArticles, queryUrl) {
           
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(NYTdata){
            var articles = NYTdata.response.docs;
            console.log(articles);
            console.log(numArticles)
            console.log(queryUrl)
    
            $("#returnedArticles").empty();

            for (var i=0; i<numArticles; i++) {
                var newCard = $("<div class='card card-body' id='articleCard" +i+ "'>");
                $("#returnedArticles").append(newCard);

                if (articles[i].headline.main !== "null") {
                    newCard.append("<h5>" + articles[i].headline.main + "</h5>");
                }
                if (articles[i].byline && articles[i].byline.hasOwnProperty("original")) {
                    newCard.append("<h6>" + articles[i].byline.original + "</h6>");
                }
                if (articles[i].section_name !== "null") {
                    newCard.append("<p class='section'>" + articles[i].section_name + "</p>");
                }
                if (articles[i].pub_date !== "null") {
                    newCard.append("<p class='date'>" + articles[i].pub_date + "</p>");
                }
                if (articles[i].web_url !== "null"){
                    newCard.append("<a href>" + articles[i].web_url + "</a>");
                }
            }
        })
    }

    searchBtn.on("click", function() {

        event.preventDefault();

        // Get search query term
        var searchTerm = $("#searchInput").val().trim();
        
        // Get the Search Term and add to queryUrl, creating new searchUrl
        var searchUrl = queryUrl + "&q=" + searchTerm;

        //Get the Number of Records to retrieve
        var numArticles = $("#numRecords").val();

        // Get the start year and end year
        var startYear = $("#startYear").val().trim();
        var endYear = $("#endYear").val().trim();

        // Check to see if date/year is requested, if so, add to searchUrl
        if (parseInt(startYear)) {
            var startYear = startYear + "0101";
            var searchUrl = searchUrl + "&begin_date=" + startYear;
        }

        if (parseInt(endYear)) {
            var endYear = endYear + "0101";
            var searchUrl = searchUrl + "&end_date" + endYear;
        }

        // Send the AJAX call the newly assembled URL
        runQuery(numArticles, searchUrl);

    })

    clearBtn.on("click", function() {
        // Reset form
        $("form").trigger("reset");

        // Clear all article results
        $("#returnedArticles").empty();
    })

});

