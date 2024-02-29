let searchElement = document.getElementsByClassName("search");
searchElement[0].addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        search(e);
    }
});

async function search() {
    let text = searchElement.value;
    console.log('Search Value: ' + text);
    if(text = 'Undefined'){
        console.log('Search Value is undefined, searching for "Confessiosn - USHER" (placeholder) instead!');
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
        const result = await response.text();
        console.log(JSON.parse(result));

        // $("results-area").append(result.);

    } catch (error) {
        console.error(error);
    }
}