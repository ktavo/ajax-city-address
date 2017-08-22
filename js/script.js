
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

    console.log("city: " + $city);
    console.log("street: " + $street);

    var $address = $city + ', ' + $street;

    googleStreetViewImage += $address;

    $greeting.text("So you want to live at " + $address + "!");


    $body.append('<img class="bgimg" src="' + googleStreetViewImage + '">');
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
