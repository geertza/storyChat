import React, { useState,useEffect } from "react";
import Api from "../authorize/api"
import "./apiSearch.css"


const ApiSearch = () => {
    const [search,setSearch] = useState('');
    const [imageGallery,setImageGallery] = useState([]);

	const onSubmitform = e =>{
		e.preventDefault();
		let image=search
		Api('ninja')
		// .then(result => result.json())
		.then(data=>{
		//  codatata) 
		 let results = data.data.value[1].contentUrl
		 console.log(results)
		 setImageGallery(data.data.value)
		}).catch(err => console.error(err))
	}
		
            
	// 	console.log('login = ',data)  
		 
	
	
	//     useEffect( () => {
	// //mount axios request for api dataa

	//     }, [])
	// event handlers
	const onChange = e =>{
		setSearch( e.target.value);
		console.log({search})
	  }

	return (
		<div className="empBody">
			<div className="searchBar">
				<form onSubmit={onSubmitform}>
					<label>Search</label>
					<input
						type="text"
						id="search"
						label='Search'
						name="search"
						autoComplete='search'
						onChange={onChange}
						
						
					/>
					<button type="submit">submit</button>
				</form>
			</div>
			<div className="grid">
				{imageGallery.map(function (image, i) {
					// return (
					// 	<div key={i} className="empBlock">
					// 		<img src={image} alt=""></img>
					// 	</div> */}
					// {/* );
					return <div><img style={{height: '150px'}} src={image.contentUrl} alt=""></img> </div>
				})}
			</div>
		</div>
	);
            }

export default ApiSearch;
