
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

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
      'q': "buenos aires",
      'sort': "newest"
    });

    $.getJSON( NYTimesURL, function( data ) 
    {
        var items = [];
        console.log(data.response.docs);
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
        $( "<ul/>", 
        {
            "id": "nytimes-articles",
            "class": "article-list",
            html: items.join( "" )
        }).appendTo( ".nytimes-container" );
    });
    

    return false;
};

$('#form-container').submit(loadData);
