import axios from "axios"



 export default function bing(image,option) {
        console.log('opt',option,image) 
        return axios.get(`user/bing/${image}/${option}`)
        
    }


    
      
