const axios = require("axios")
const rawGallery =[]
let   imageGallery =[]
// const url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${data}&safeSearch=Strict&imageType=Transparent`;
function search(image,option) {
    if (option === 'bg'){
      return  axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=background${image}&safeSearch=Strict`, {
        headers: {
          "Ocp-Apim-Subscription-Key": "76501de503bb4ee28569eaee88b08fb9"
          }
        })
    }
    else
    {
  return  axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${image}&safeSearch=Strict&imageType=Transparent`, {
      headers: {
        "Ocp-Apim-Subscription-Key": "76501de503bb4ee28569eaee88b08fb9"
        }
      })
     
      
}}
module.exports = search;
// data.value[1].contentUrl