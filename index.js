function myFunction() {
    console.clear();
    document.getElementById("anime-display").innerHTML = "";
    const xhr = checkForHTTP();
    const anime = document.getElementById("title").value;
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
            console.log(json["results"]);
            let limit = (json["results"].length < 15) ? json.results.length : 15;
            let count = 0;
            while (count < limit) {
                let results = json["results"];

                /** 
                 * Initalize each HTML element
                */
               
                let anime = document.createElement("div");
                let animeBody = document.createElement("div");
                let summary = document.createTextNode(results[count].synopsis);
                let title = document.createElement("h4");
                let image = document.createElement("img");
                let url = document.createElement("a");

                /** 
                 * Attach each classlist to each HTML element
                */

                anime.classList.add("card");
                const classList = ["col-12", "col-sm-6", "col-md-4","col-lg-3", "col-xl-2"];
                for (let classCount = 0; classCount < classList.length; classCount++) {
                    anime.classList.add(classList[classCount]);
                }
                animeBody.classList.add("card-body");
                title.classList.add("card-title");
                image.classList.add("card-img-top");
                url.classList.add("card-link");
                url.classList.add("d-block");

                /**
                 * Final Adjustments
                 */

                url.setAttribute("href",results[count].url);
                image.src = results[count].image_url;
                title.textContent = results[count].title;
                anime.style.cssText = "padding: 10px;";

                /**
                 * Appending HTML in order of BootStrap card pattern. 
                 */

                url.appendChild(document.createTextNode("Learn more about " + title.innerHTML + " here!"));
                anime.appendChild(image);
                anime.appendChild(animeBody);
                animeBody.appendChild(title);
                animeBody.appendChild(summary);
                animeBody.appendChild(url);
                document.getElementById("anime-display").appendChild(anime);
                count ++;
            }
        };
    }
}

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