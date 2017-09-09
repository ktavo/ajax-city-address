
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $nytContainer = $('.nytimes-container');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    $nytContainer.text("");

    // Load Streetview Data from GoogleMaps API
    var googleStreetViewImage = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    var $city = $('#city').val();
    var $street =$('#street').val();
    //console.log("city: " + $city);
    //console.log("street: " + $street);
    var $address = $city + ', ' + $street;
    googleStreetViewImage += $address;
    $greeting.text("So you want to live at " + $address + "!");
    $body.append('<img class="bgimg" src="' + googleStreetViewImage + '">');

    //Load NYTimes data
    var NYTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYTimesURL += '?' + $.param({
      'api-key': "1315706dd301431ebc3f3de8fa11d2e6",
      'q': $city,
      'sort': "newest"
    });
    $.getJSON( NYTimesURL, function( data ) 
    {
        var items = [];
        //console.log(data.response.docs);
        var news = data.response.docs;
        $.each( news, function( key, val )
        {
            items.push( "<li id='article'>");
            items.push("<a href=" + val.web_url +">");
            if (key != 0)
            {
                items.push(val.headline.print_headline);
            }
            else
            {
                items.push("Overview of " + $city);
            }
            items.push("</a>");
            items.push("<p>" + val.snippet + "</p>");
            items.push("</li>")
        });
        $('#nytimes-articles-default').detach();
        $('#nytimes-articles').detach();
        $( "<ul/>", 
        {
            "id": "nytimes-articles",
            "class": "article-list",
            html: items.join( "" )
        }).appendTo( ".nytimes-container" );
    })
    .error(function()
    {
        if ($('#nytimes-articles-default').length)
        {
            $('#nytimes-articles-default').detach();
            $( "<h2/>", 
            {
                html: "NewYork Time Articles Could Not Be Loaded"
            }).appendTo( ".nytimes-container" );
        }
        console.error(data.message);
    });

    //Get Info from Wikipedia API
    var wikipediaRequestTimeout = setTimeout(function(){
        $('#wikipedia-links').text('Failed to get wikipedia results');
    }, 8000);
    var wikipediaURL = 'https://en.wikipedia.org/wiki/';
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        jsonp: "callback", 
        dataType: 'jsonp', 
        data: { 
            action: "query", 
            list: "search", 
            srsearch: $city, 
            format: "json" 
        },
        success: function(jsonp) { 
            //console.log(jsonp.query.search);
            var wikipediaArray = jsonp.query.search;
            for (var i = 0; i<wikipediaArray.length; i++)
            {
                var linkTitle = wikipediaArray[i].title;
                $("#wikipedia-links").append('<li><a href="' + wikipediaURL + linkTitle + '">' + linkTitle + '</a></li>');
            }
            clearTimeout(wikipediaRequestTimeout);
        }/*,
        error: function(xhr, status, error) {
            console.error('Error on wiki api call');
            alert("error");
        }*/
    });
    //END Get Info from Wikipedia API
    return false;
};

$('#form-container').submit(loadData);
