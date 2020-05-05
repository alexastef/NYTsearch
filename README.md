# NYTsearch
Web app to search NYT news articles based on specific parameters

For this activity, I used the New York Times Article Search API to create a web application that allows users to search articles based on search term and year and can return 1, 5, or 10 articles. 

The form is hard-coded into the HTML with Bootstrap formatting. The articles are returned and appended dynamically using jQuery.
Once the user selects their search paramers and clicks Search or presses enter, an AJAX call is made and the response is handled with a function, pulling out only the "data" of the whole response object. 

Within that function, I looped over the returned articles for the selected number of times (1, 5, or 10), selected the headline, author, date, section, and link for each article and, IF that particular object is not null, appended it to a new card and appended the new cards to the hard-coded Top Articles card div.

I also added some functionality to the Clear button so that the form resets and the returned articles clear when it is clicked. 

From there, just added a few CSS formatting tweaks and FA icons. 
