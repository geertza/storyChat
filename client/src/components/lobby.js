import React, { useState, useEffect } from "react";
// import Chat from './Chat/Chat'
import queryString from 'query-string';
// import { TableSortLabel } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import io from "socket.io-client";
// import BottomAppBar from './lobbyBar'
import Messages from './Chat/Messages/Messages';
import Api from "../authorize/api"
import InfoBar from "./Chat/InfoBar/InfoBar"
import "./lobby.css"
let socket;
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))


const Lobby = ({ location }) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:3001';
  let [imageUrl,setImageUrl] = useState('https://f0.pngfuel.com/png/355/447/music-media-player-computer-icons-mp3-player-button-png-clip-art-thumbnail.png');
  const [open, setOpen] = React.useState(false);
  let [search,setSearch] = useState('');
  let [imageGallery,setImageGallery] = useState([]);
  let [room, setRoom]= useState('')
  let [bg,setBG]=useState('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/75e31e27-863b-4091-9a6f-56d3c368519a/ddqe2ra-adcf2540-9c46-47b8-8b91-751ba2f4b847.jpg/v1/fill/w_424,h_250,q_70,strp/kaminari__by_mangamie_ddqe2ra-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02MDQiLCJwYXRoIjoiXC9mXC83NWUzMWUyNy04NjNiLTQwOTEtOWE2Zi01NmQzYzM2ODUxOWFcL2RkcWUycmEtYWRjZjI1NDAtOWM0Ni00N2I4LThiOTEtNzUxYmEyZjRiODQ3LmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.KaFHpHKLa6aZsDXtIjgaUmSZeGthpq1EVDcA7yAqTOY')
  socket = io(ENDPOINT);
  
  
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room)  
  console.log({name},room)
  socket.emit('join',  {name,room}, (error) => {
    
    if(error) {
      alert(error);
    }
  });

}, [location.search]);

//-----------------socket
socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      // setUsers(users);
    });
  const sendMessage = (event) => {
    event.preventDefault();
      console.log(message)
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      setMessage('')
    }
  }
  
//event handlers------------------
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = e =>{
		setSearch( e.target.value);
		console.log(search)
	  }
	  const handleChange = event => {
    	setImageUrl(event.target.src);
    }
    //-------------query api
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
    const divStyle = {
      backgroundColor: 'blue',
      height:'100vh',
      backgroundImage: `url(${bg})`,
    };
    
 
      return(
      <div className='bg' style={divStyle} >
       
       <InfoBar room={room} ></InfoBar>       
       <img src={imageUrl} alt=''></img>
       <Messages messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage}        />
       <div className="main" >
        <Toolbar>{
          <div>
          <div>
      <button type="button" onClick={handleOpen}>
        Find Avatar
      </button>
      <Modal
     
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         <div>
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
			
			
			<div className="grid">
				{imageGallery.map(function (image, i) {
					return <div ><img id='character' key={i} src={image.contentUrl}  alt="" onClick={handleChange}></img> </div>
				})}
			</div>
		</div>
	);      
        </div>
          </Modal>
    </div>
  

       </div>
        }</Toolbar>
      </div>
      <div className={classes.offset} />
      </div>
       ) ;
      
  }
  export default Lobby