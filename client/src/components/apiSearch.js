import React, { useState,useCallback } from "react";
import Api from "../authorize/api"
// import "./apiSearch.css"


function ApiSearch (props ) {
	console.log("Props in Input :", props);
    let [search,setSearch] = useState('');
    let [imageGallery,setImageGallery] = useState([]);
	let [imageUrl,setImageUrl] = useState('');
	
	const onSubmitform = e =>{
		e.preventDefault();
		let image=search
		Api(image)
		// .then(result => result.json())
		.then(data=>{
		//  codatata) 
		 let results = data.data.value[1].contentUrl
		 console.log(results)
		 setImageGallery(data.data.value)
		}).catch(err => console.error(err))
	}
		
	
	// event handlers
	const onChange = e =>{
		setSearch( e.target.value);
		console.log(search)
	  }
	  const handleChange = event => {
    	props.onchange(event.target.src);
    }
        
	

	
	//  const Character = imageUrl;
	//  return <img src={Character} />
	  
	return (
		<div className="ApiBody">
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
			{/* <button onClick={console.log(this.props.data)} /> */}
			<img src={imageUrl}></img>
			<div className="grid">
				{imageGallery.map(function (image, i) {
					return <div ><img id='character' key={i} src={image.contentUrl}  alt="" onClick={handleChange}></img> </div>
				})}
			</div>
		</div>
	);
            }

export default ApiSearch;