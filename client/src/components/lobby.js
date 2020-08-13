import React, { useState, useEffect } from "react";
// import Chat from './Chat/Chat'
import queryString from 'query-string';
// import { TableSortLabel } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PhotoIcon from '@material-ui/icons/Photo';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import io from "socket.io-client";
// import BottomAppBar from './lobbyBar'
import Messages from './Chat/Messages/Messages';
import Api from "../authorize/api"
import InfoBar from "./Chat/InfoBar/InfoBar"
import "./lobby.css"
import Draggable from 'react-draggable';
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
  let [imageUrl,setImageUrl] = useState('');
  const [open, setOpen] = React.useState(false);
  let [search,setSearch] = useState('');
  let [imageGallery,setImageGallery] = useState([]);
  let [room, setRoom]= useState('');
  const [alignment, setAlignment] = React.useState('char');
  let [bg,setBG]=useState('')
  let [user,setUser]=useState('')
  socket = io(ENDPOINT);
  const [playRender, setPlayRender] = React.useState([]);
  const character = []  
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setUser(name); 
  console.log({name},room)
  socket.emit('join',  {name,room}, (error) => {
    
    if(error) {
      alert(error);
    }
  });

}, [location.search]);

//-----------------socket-----------------------------------------------------------------
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
  
  
  var myVar = setInterval(myTimer, 2000);
  // let data={user,imageUrl}
  function myTimer() {
    socket.emit('dom',{user});
  }
  socket.on('broadcast', function(data) {
  let x = data.data.user
  if  (x === '' || x === user){
    return
  }else {  
  if (character.indexOf(x) === -1)
    {character.push(data.data.user)}
    else
    {   setPlayRender(character)
      console.log(character)}
  }
        
        
  })
  

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
      if (alignment === 'bg'){
        setBG(event.target.src)
      }
      
      setImageUrl(event.target.src);
    }
    //-------------query api
    const onSubmitform = e =>{
      e.preventDefault();
      let option = alignment;
      let image=search;

      Api(image,option)
      .then(data=>{
       setImageGallery(data.data.value)
      }).catch(err => console.error(err))
    }

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
    const divStyle = {
      backgroundColor: 'black',
      height:'100vh',
      backgroundImage: `url(${bg})`,
    };
    
 
      return(
      <div className='bg' style={divStyle} >
       
       <InfoBar room={room} ></InfoBar>       
       <div className='char'>
       <Draggable>
       <img className="Avatar" id={user} src={imageUrl} alt=''></img>
       </Draggable>
       </div>
       
       {playRender.map(function ( i) {
					return <Draggable>
          <img className="Avatar" id={i.value}  key={i*i} src={'https://fanart.tv/fanart/movies/9806/hdmovieclearart/the-incredibles-55101ab1827a4.png'} alt=''></img>
          </Draggable>
				})}
       
       
       
       <Messages messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage}        />
       
       <div className="main" >
        <Toolbar>{
          <div>
          <div>
      <button type="button" onClick={handleOpen}>
        Images
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
					<input
						type="text"
						id="search"
						label='Search'
						name="search"
						autoComplete='search'
						onChange={onChange}
						
						
					/>
          <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
           <ToggleButton value="char" color="primary"  aria-label="bold">
        <EmojiPeopleIcon />
      </ToggleButton>
      <ToggleButton value="bg"  color="primary" fontSize="large" aria-label="bold">
        <PhotoIcon />
      </ToggleButton>
           </ToggleButtonGroup>
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
    <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>

       </div>
        }
        </Toolbar>
        
       
      </div>
      
      <div className={classes.offset} /> 
      </div>
       ) ;
       
  }
  export default Lobby