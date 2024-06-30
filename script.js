const Api_key = '88aa5679ba8645708bfc2d36ed30ad06'
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load' , ()=>fetchNews("India"));
async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${Api_key}`);
    let data = await response.json();
    bindData(data.articles)

}

function bindData(articles){
   
    const card_container = document.getElementById("card-container")
    const news_card_template = document.getElementById("template-news-card")
    card_container.innerHTML = " " ;
    articles.forEach(article => {
        if(!article.urlToImage) return ;
        const cardclone = news_card_template.content.cloneNode(true)
        fillDataInCard(cardclone , article)
        card_container.appendChild(cardclone);
    });
}
function fillDataInCard(cardclone , article){
    console.log(article)
        const newsImg = cardclone.getElementById('news-img');
        const newsTitle = cardclone.getElementById('news-title');
        const newsSource = cardclone.getElementById('news-source');
        const newsDesc = cardclone.getElementById('news-desc');
         newsImg.src=article.urlToImage
         newsTitle.innerHTML = article.title;
         newsDesc.innerHTML = article.description;
        const date = new Date(article.publishedAt).toLocaleString("en-us")
         newsSource.innerHTML = `${article.source.name}.${date}`
         cardclone.firstElementChild.addEventListener('click' , ()=>{
            window.open(article.url , "_blank");
         })
}

let nav = document.querySelectorAll(".hover-link")
nav.forEach((e)=>{
    e.addEventListener('click' , ()=>{
        let query = e.getAttribute('id');
       fetchNews(query);
    })
})

