const API_KEY = "AIzaSyDSvjYnWiHZzl3W3FBXQF2fAG8DjCFx8fs"

let q;

let search = async () => {
    let query = document.querySelector("#query").value;
    let data = await getData(query);
    append(data)
    // console.log(data)
}

let getData = async (query) =>{
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`
    let res = await fetch(url);
    let data = await res.json();
    return data.items;
}

let append = (data) => {
    let container = document.querySelector("#container");
    container.innerHTML = null;
    data.forEach((el)=>{
        let {snippet:{title,thumbnails:{medium:{url}},channelTitle}} = el;
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src= url;
        let h2 = document.createElement("h2");
        h2.innerText = title;
        let p = document.createElement("p"); 
        p.innerText = channelTitle;
        div.onclick = () => {
            saveVideo(el)
        }
        div.append(img,h2,p)
        container.append(div);
    })
}

let saveVideo = (el) =>{
    localStorage.setItem("video",JSON.stringify(el));
    window.location.href = "video.html"

}

// 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&key=[YOUR_API_KEY]'

// let query = `most popular videos in India`;
// let url = https://youtube.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&maxResults=20&order=viewCount&q=${query}&key=${apiKey};

let popVideo = async () =>{
    let query = "Most popular videos in India";
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&maxResults=20&order=viewCount&q=${query}&key=${API_KEY}`
    let res = await fetch(url);
    let data = await res.json();
    append(data.items)
}