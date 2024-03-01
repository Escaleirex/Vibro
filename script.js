let searchElement = document.getElementsByClassName("search");

searchElement[0].addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        search(e);
    }
});

async function search() {
    let details = document.querySelector(".details");
    details.remove();

    let container = document.querySelector(".results-area");
    container.innerHTML = " ";
    //getting the input box value and setting everything up for the request down below
    document.getElementsByClassName(".results-area").innerHTML = "";
    let text = document.querySelector(".search").value;
    console.log('Search Value: ' + text);
    if(text == ' '){
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
        //GET request
        const response = await fetch(url, options);
        let result = await response.text();
        let resultJSON = JSON.parse(result);
        console.log(resultJSON);

        for(let i = 0; i < 3 ; i++){
            //selecting container and creating the card
            let resultCard = document.createElement("div");
            resultCard.className = "result";
            
            //adding cover
            let cover = document.createElement("img");
            cover.src = resultJSON.tracks.hits[i].track.share.image;

            //creating the div for the song details (title, artist and that button)
            let songDetails = document.createElement("div");
            songDetails.className = "song-details-card";

            let songTitle = document.createElement("p");
            songTitle.innerHTML = resultJSON.tracks.hits[i].track.title;
            songTitle.className = "song-title";

            let songArtist = document.createElement("p");
            songArtist.innerHTML = resultJSON.tracks.hits[i].track.subtitle;
            songArtist.className = "song-artist";

            let btn = document.createElement("button");
            btn.className = "btn btn-primary select-button";
            btn.innerHTML = "Select";
            btn.type = "button";
            btn.addEventListener("click",function(){
                console.log("The Song Selected is: " + resultJSON.tracks.hits[i].track.title + " - " + resultJSON.tracks.hits[i].track.subtitle + "\nShowing Details...");
            });

            //append everything, i hate js
            container.appendChild(resultCard);
            resultCard.appendChild(cover);
            songDetails.appendChild(songTitle);
            songDetails.appendChild(songArtist);
            songDetails.appendChild(btn);
            resultCard.appendChild(songDetails);
        }

    } catch (error) {
        console.error(error);
    }
}

function details() {
    let container = document.querySelector(".results-area");
    container.innerHTML = " ";

    let details = document.createElement('div');
    details.className = "details";
    
    //image-container and the kids
    let imageCont = document.createElement('div');
    imageCont.className = "image-container";
    
    let coverArt = document.createElement('img');
    coverArt.src = "";//insert cover art here
    
    let btnPlay = document.createElement('button');
    btnPlay.className = "button-play";
    btnPlay.type = "button";
    btnPlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    btn.addEventListener("click",function(){
        console.log("Congrats, the play button was clicked, please change this");
    });

    imageCont.append(coverArt);
    imageCont.append(btnPlay);
    details.append(imageCont);

    //div with all the shit that needs to be shown to the user
    let songMetadata = document.createElement('div');
    let 
}