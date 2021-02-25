const createMockup = function(data){

    const showMockUp = `
    <div class="showItem card m-2 p-2">
        <div style="min-height: 150px; max-height: 250px; display: flex;">
            <div class="border border-secondary bg-light" style="margin-right: 10px; flex: none;  
            height: 200px; width: 200px; overflow: hidden; border-radius: 100%;">
                <div style="border: 5px solid white; border-radius: 100%; background-image: url(${data.image_url}); height: 100%; width 100%; background-position: center top;">
                
                </div>
            </div>
            <div style="height: 100%; width: 100%;" class="d-flex flex-column align-items-stretch justify-content-between bg-light rounded p-3 border border-secondary">
                <div >
                    <h5><strong>Title: </strong>${data.title}</h5>
                    <p><strong>Description: </strong>${data.synopsis}</p>
                </div>
                <a href="${data.url}">Learn More</a>
            </div>
        </div>
    </div>
    `;
    return showMockUp;
}

function getAnime() {
    document.getElementById("anime-container").innerHTML = "";
    const anime = document.getElementById("title").value; 
    document.getElementById("title").value = "";
    const xhr = checkForHTTP();
    let link = "https://api.jikan.moe/v3/search/anime?q=" + anime + "&page=1";
    if (xhr == false) {
        alert("Unable to use service with current browser.");
    }
    else {
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Request is successful.");
                }
            }
        };
        xhr.open("GET", link);
        xhr.send(null);
        xhr.onload = () => {
            const json = JSON.parse(xhr.responseText);
            let limit = (json["results"].length < 15) ? json.results.length : 15;
            let count = 0;
            let results = json["results"];
            while (count < limit) {
                var anime = results[count];
                document.getElementById("anime-container").insertAdjacentHTML("beforeend", createMockup(anime));
                count ++;
            }       
        };
    }
}

document.getElementById("title").addEventListener("keydown", event =>{
    if (event.code == "Enter"){
        getAnime();
    }
});

/**
 * CheckForHTTP()
 * ______________________________
 * 
 * Well check the user's browser for XMLHTTP compatibility
 * and ActiveXObject compatibility. Will return false for browsers 
 * that are unable to access the AJAX methods.
 * 
 */

function checkForHTTP() {
    let check = false;
    if (window.XMLHttpRequest) {
        check = new XMLHttpRequest;
    }
    else if (window.ActiveXObject) {
        try {
            check = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (err) {
            try {
                check = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch{
                check = false;
            }
        }
    }
    return check;
}