let searchElement = document.getElementsByClassName("search");
let result;

searchElement[0].addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        search(e);
    }
});

async function search() {
    let text = searchElement.value;
    console.log('Search Value: ' + text);
    if(text = 'Undefined'){
        console.log('Search Value is undefined, searching for "Confessions - USHER" (placeholder) instead!');
        text = "Confessions - USHER";
    }

    const url = 'https://shazam.p.rapidapi.com/search?term='+ encodeURIComponent(text) + '&locale=en-US&offset=0&limit=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b9c6f2bdf6mshf58ffb2dba877f9p1be862jsn8bf18d21e059',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        result = await response.text();
        let resultJSON = JSON.parse(result);
        console.log(resultJSON);

        for(let i = 0; i < 3 ; i++){

            $(".results-area").append("\
            <div class='result'>\
                <img src='" + resultJSON.tracks.hits[i].track.share.image + "'>\
                <div class='song-details-card'>\
                    <p class='song-title'>" + resultJSON.tracks.hits[i].track.title + "</p>\
                    <p class='song-artist'>" + resultJSON.tracks.hits[i].track.subtitle + "</p>\
                </div>\
            </div>");

            $(".song-details-card").append($("<button type='button' class='btn btn-primary select-button'>Select</button>")).click(details.resultJSON)
        }

    } catch (error) {
        console.error(error);
    }
}



function details(resultJSON) {
    console.log("worked i think: \n", resultJSON);
    // console.log(resultJSON.tracks.hits[parseInt(i)].track);
}