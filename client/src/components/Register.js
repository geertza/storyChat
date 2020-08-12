import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Message from '../components/Message';
import AuthService from '../authorize/AuthService';
import Paper from '@material-ui/core/Paper';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Dat Game
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Login = props=>{
    
      const useStyles = makeStyles((theme) => ({
      root: {
        height: '100vh',
      },
      image: {
        backgroundImage: 'url(https://3.bp.blogspot.com/-wZ9qLGU7h60/V7N_JKmaxeI/AAAAAAAABeg/FDpNlFFfmkY-1xIacO5jbacnbuhHW0vFQCEw/s1600/04_manatarms.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      }));
          const classes = useStyles();
        

        const [player,setPlayer] = useState({username: "", password : ""});
        const [message,setMessage] = useState(null);
        // const quickuser = {username: "andy", password : "pass"}
        let name = player.username
        let room = 'lobby'
        const onChange = e =>{
          setPlayer({...player,[e.target.name] : e.target.value});
        }
        
        const onSubmitform = e =>{
          e.preventDefault();
          AuthService.register(player).then(data=>{
            props.history.push(`/`)
          });
        }
      
      
      
         
     
          
    return (
      
      <Grid container component="main" className={classes.root}>
       
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
             
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up...extreme Cation is adviced....
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmitform}>
              <TextField
               onChange={onChange} 
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Character Name"
               name="username"
               autoComplete="email"
               autoFocus
               
              />
              <TextField
                 onChange={onChange} 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }  
export default Login;