let searchElement = document.getElementsByClassName("search");

searchElement[0].addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        search(e);
    }
});

async function search() {
    let details = document.querySelectorAll(".details");
    if (details.length > 0) {
        details[0].remove();
    }

    let container = document.querySelector(".results-area");
    container.innerHTML = " ";
    //getting the input box value and setting everything up for the request down below
    document.getElementsByClassName(".results-area").innerHTML = "";
    let text = document.querySelector(".search").value;
    console.log('Search Value: ' + text);
    if(text == ''){
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
        let resultJSON = await response.text();
        let result = JSON.parse(resultJSON);
        console.log(result);

        for(let i = 0; i < 3 ; i++){
            //selecting container and creating the card
            let resultCard = document.createElement("div");
            resultCard.className = "result";
            
            //adding cover
            let cover = document.createElement("img");
            cover.src = result.tracks.hits[i].track.share.image;

            //creating the div for the song details (title, artist and that button)
            let songDetails = document.createElement("div");
            songDetails.className = "song-details-card";

            let songTitle = document.createElement("p");
            songTitle.innerHTML = result.tracks.hits[i].track.title;
            songTitle.className = "song-title";

            let songArtist = document.createElement("p");
            songArtist.innerHTML = result.tracks.hits[i].track.subtitle;
            songArtist.className = "song-artist";

            let btn = document.createElement("button");
            btn.className = "btn btn-primary select-button";
            btn.innerHTML = "Select";
            btn.type = "button";
            btn.addEventListener("click",function(){
                console.log("The Song Selected is: " + result.tracks.hits[i].track.title + " - " + result.tracks.hits[i].track.subtitle + "\nShowing Details...");
                detailsF(result.tracks.hits[i].track.key, result.tracks.hits[i].track.hub);
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

async function detailsF(id, providersHub) {
    let container = document.querySelector(".results-area");
    container.innerHTML = ""; 

    const url = 'https://shazam.p.rapidapi.com/shazam-songs/get-details?id=' + id + '&locale=en-US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b9c6f2bdf6mshf58ffb2dba877f9p1be862jsn8bf18d21e059',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const resultJSON = await response.text();
        const result = JSON.parse(resultJSON);
        console.log(result);

        let details = document.createElement('div');
        details.className = "details";
        
        //image-container and the kids
        let imageCont = document.createElement('div');
        imageCont.className = "image-container";
        
        let coverArt = document.createElement('img');
        coverArt.src = result.resources["shazam-songs"][id].attributes.images.coverArtHq;
        
        let audio = new Audio();
        audio.volume = 0.25;
        audio.loop = false;
        audio.src = result.resources["shazam-songs"][id].attributes.streaming.preview;
        audio.pause();

        let btnPlay = document.createElement('button');
        btnPlay.className = "button-play";
        btnPlay.type = "button";
        btnPlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        btnPlay.addEventListener("click",function(){
            console.log("Playing Audio...");
            playPausePreview(audio);
        });
    
        imageCont.append(coverArt);
        imageCont.append(btnPlay);
        details.append(imageCont);
    
        //div with all the shit that needs to be shown to the user
        let songMetadata = document.createElement('div');
        let songTitle = document.createElement('p');
        songTitle.innerHTML = result.resources["shazam-songs"][id].attributes.title;//insert song title here
        songTitle.className = "song-title";
    
        let songArtist = document.createElement('p');
        songArtist.innerHTML = result.resources.albums[result.resources["shazam-songs"][id].relationships.albums.data[0].id].attributes.artistName + ' • ' + result.resources.albums[result.resources["shazam-songs"][id].relationships.albums.data[0].id].attributes.name + ' • ' + result.resources.albums[result.resources["shazam-songs"][id].relationships.albums.data[0].id].attributes.releaseDate + ' • ' + result.resources["shazam-songs"][id].attributes.genres.primary;
        songArtist.className = "song-artist";
        
        let listenON = document.createElement('p');
        listenON.innerHTML = "Listen On";
        listenON.className = "listen-on";
    
        //colocar só para aparecer botão desse serviço se a musica lá estiver disponivel
        let streamingServices = document.createElement('div');
        streamingServices.className = "streaming-services";

        for (let i = 0; i < providersHub.providers.length; ++i) { 
            if(providersHub.providers[i].type == "SPOTIFY"){
                let btnSpotify = document.createElement('button');
                btnSpotify.className = "btn btn-outline-dark streaming-button";
                btnSpotify.type = "button";
                btnSpotify.innerHTML = '<i class="bi bi-spotify"></i>';
                btnSpotify.addEventListener("click", function(){
                    window.open(providersHub.providers[i].actions[0].uri, "_self");
                });
                streamingServices.append(btnSpotify);
            } else if (providersHub.providers[i].type == "DEEZER"){
                let btnDeezer = document.createElement('button');
                btnDeezer.className = "btn btn-outline-dark streaming-button";
                btnDeezer.type = "button";
                btnDeezer.innerHTML = '<i class="fa-brands fa-deezer"></i>';
                btnDeezer.addEventListener("click", function(){
                    //I CANT GET THIS TO WORK ON WINDOWS/MAC JUST IGNORE THE ERROR!!! 
                    //WHO USES DEEZER ANYWAYS? JUST USE SPOTIFY! 
                    //ITS IMPLEMENTED IDK HOW TO GET IT TO WORK BECAUSE DEEZER DOCS ARE BAD AND THIS API GIVES ME A URI AND NOT A URL!!
                    window.open(providersHub.providers[i].actions[0].uri, "_self");
                });
                streamingServices.append(btnDeezer);
            } 
        }
        if (providersHub.options[0].providername == 'applemusic'){
            let btnApple = document.createElement('button');
            btnApple.className = "btn btn-outline-dark streaming-button";
            btnApple.type = "button";
            btnApple.innerHTML = '<i class="bi bi-apple"></i>';
            btnApple.addEventListener("click", function(){
                window.open(providersHub.options[0].actions[1].uri, "_self");
            });
            streamingServices.append(btnApple);
        }
    
        const urlM = 'https://api.musixmatch.com/ws/1.1/track.get?apikey=41bf102baf84ef9e2d9895ee610fa541&commontrack_id=907374';
        const optionsM = {
            method: 'GET',
        };
    
        try {
            const responseM = await fetch(urlM, optionsM);
            const resultMJSON = await response.text();
            const resultM = JSON.parse(resultMJSON);
            console.log(resultM);
            let lyricsTitle = document.createElement('p');
            lyricsTitle.className = "lyrics-title";
            lyricsTitle.innerHTML = '<a href="' + resultM.message + '" target=”_blank” style="text-decoration: none;">\
                                        Lyrics\
                                    </a>';
        } catch (error) {
            console.error(error);
        }


        
        let lyrics = document.createElement('div');
        lyrics.className = "lyrics";
        let lyricsText = "";

        for (let i = 0; i < result.resources.lyrics[result.resources["shazam-songs"][id].relationships.lyrics.data[0].id]['attributes']['text'].length; ++i) { 
            const element = result.resources.lyrics[result.resources["shazam-songs"][id].relationships.lyrics.data[0].id]['attributes']['text'][i];
            lyricsText = lyricsText + element + '<br>';
        }

        lyricsText = lyricsText + '<br><br>' + result.resources.lyrics[result.resources["shazam-songs"][id].relationships.lyrics.data[0].id]['attributes'].footer;

        lyrics.innerHTML = lyricsText;
    
        songMetadata.append(songTitle);
        songMetadata.append(songArtist);
        songMetadata.append(listenON);
        songMetadata.append(streamingServices);
        songMetadata.append(lyricsTitle);
        songMetadata.append(lyrics);
        details.append(songMetadata);
        container.append(details);

    } catch (error) {
        console.error(error);
    }
}

function playPausePreview(audio){
    if(audio.duration > 0 && !audio.paused){
        audio.pause();
    }
    else{
        audio.play();
    }
}