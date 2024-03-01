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
                detailsF(result.tracks.hits[i].track.key);
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

async function detailsF(id) {
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
        coverArt.src = "";//insert cover art here
        
        let btnPlay = document.createElement('button');
        btnPlay.className = "button-play";
        btnPlay.type = "button";
        btnPlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        btnPlay.addEventListener("click",function(){
            console.log("Congrats, the play button was clicked, please change this");
        });
    
        imageCont.append(coverArt);
        imageCont.append(btnPlay);
        details.append(imageCont);
    
        //div with all the shit that needs to be shown to the user
        let songMetadata = document.createElement('div');
        let songTitle = document.createElement('p');
        songTitle.innerHTML = "test";//insert song title here
        songTitle.className = "song-title";
    
        let songArtist = document.createElement('p');
        songArtist.innerHTML = "test";//insert artist name here aka subtitle
        songArtist.className = "song-artist";
    
        let songGenres =  document.createElement('p');
        songGenres.innerHTML = "test";//insert genres with bullets between them
        songGenres.className = "genres";
    
        let listenON = document.createElement('p');
        listenON.innerHTML = "Listen On";
        listenON.className = "listen-on";
    
        //colocar só para aparecer botão desse serviço se a musica lá estiver disponivel
        let streamingServices = document.createElement('div');
        streamingServices.className = "streaming-services";
    
        let btnSpotify = document.createElement('button');
        btnSpotify.className = "btn btn-outline-dark streaming-button";
        btnSpotify.type = "button";
        btnSpotify.innerHTML = '<img class="streaming-logo" src="assets/spotify-logo.svg">';
        
        let btnApple = document.createElement('button');
        btnApple.className = "btn btn-outline-dark streaming-button";
        btnApple.type = "button";
        btnApple.innerHTML = '<img class="streaming-logo" src="assets/apple-music-3.svg">';
    
        let btnDeezer = document.createElement('button');
        btnDeezer.className = "btn btn-outline-dark streaming-button";
        btnDeezer.type = "button";
        btnDeezer.innerHTML = '<img class="streaming-logo" src="assets/deezer-logo.svg">';
    
        let btnAmazon = document.createElement('button');
        btnAmazon.className = "btn btn-outline-dark streaming-button";
        btnAmazon.type = "button";
        btnAmazon.innerHTML = '<img class="streaming-logo" src="assets/Amazon_Music_logo.svg">';
    
        let btnTidal = document.createElement('button');
        btnTidal.className = "btn btn-outline-dark streaming-button";
        btnTidal.type = "button";
        btnTidal.innerHTML = '<img class="streaming-logo" src="assets/tidal-1.svg">';
    
        let btnYoutube = document.createElement('button');
        btnYoutube.className = "btn btn-outline-dark streaming-button";
        btnYoutube.type = "button";
        btnYoutube.innerHTML = '<img class="streaming-logo" src="assets/youtube-6.svg">';
    
        streamingServices.append(btnSpotify);
        streamingServices.append(btnApple);
        streamingServices.append(btnDeezer);
        streamingServices.append(btnAmazon);
        streamingServices.append(btnTidal);
        streamingServices.append(btnYoutube);
    
        let lyricsTitle = document.createElement('p');
        lyricsTitle.className = "lyrics-title";
        lyricsTitle.innerHTML = '<a href="' + 'insert link here' + '" target=”_blank” style="text-decoration: none;">\
                                    Lyrics\
                                </a>';
        
        let lyrics = document.createElement('div');
        lyrics.className = "lyrics";
        lyrics.innerHTML = 'Insert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\nInsert Lyrics Here\n';
    
        songMetadata.append(songTitle);
        songMetadata.append(songArtist);
        songMetadata.append(songGenres);
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