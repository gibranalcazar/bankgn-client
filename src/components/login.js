import React, {useContext} from 'react';
import { UserContext } from './context';
import Card1 from './customCard';
import { auth } from '../config/firebase-conf';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect  } from 'firebase/auth';

export default function Login(){
    const {data, setData} = useContext(UserContext);

    const {useState, useEffect} = React;
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /* const data = React.useContext(UserContext); */
    const [user, setUser] = useState(data.userLogged); 
    const [logged, setLogged] = useState(false);
    const [provider, setProvider] = useState('');
    
    useEffect(()=>{
        console.log('inside useEffect')
        console.log(data);
        console.log(user);
        
        let provider2 = new GoogleAuthProvider();
        setProvider(provider2);
        onAuthStateChanged(auth, (user) => {
            console.log('entered change')
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user.email);
                console.log('uid =', uid);     
                let data2 = data;
                    data2.userLogged = user.email;
                    setData(data2); 
                    console.log(data);
                    console.log(data2);
                    setShow(false);
                    return('yes');
            } else {
                // User is signed out
                console.log('User is not logged in');
                setShow(true);
                //setUser(null);
                //alert("STATE CHANGED: User is signed out");
            }
          });
    }, [])

    const googleSignIn = (e) => {
        e.preventDefault();
        console.log('en google login');

        signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);
        console.log(result);

        let url = process.env.REACT_APP_API_URL + `/account/create/${email}/${email}/${password}/${0}`;

                (async () =>{
                    var res = await fetch (url);
                    var data = await res.json();
                    console.log(data);
                    return data;
                })().then(console.log);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    };

    
      
    function validate(field, label){
        if(!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true
    }

    const login = (e) =>{
        e.preventDefault();
        if (!validate(email, 'email field is empty'))    return;
        if (!validate(password, 'password field is empty'))    return;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const credential = userCredential.user;
            console.log(credential);
            let data2 = data;
            data2.userLogged = credential.email;
            setData(data2);
            //setData(credential.email);
            alert("SUCCESFULLY LOGGED IN"); 

            
            
            // ...
            setShow(false);
            })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage);
            // ..
        });
        //if(!validateUser())return;
    }

    const clearForm = () =>{

        signOut(auth).then(() => {
            // Sign-out successful.
            let data2 = data;
            data2.userLogged = null;
            setData(data2);
            //setData('');
            setEmail("");
            setPassword("");
            setShow(true);
            alert("SIGN OUT SUCCESFULLY");
          }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage);
          });
    }

    return(
        <div className="container content">
            <button type="submit" className="btn btn-dark" onClick={googleSignIn}>Sign in with Google!</button>
            {/* <h1>Login</h1> */}
            <Card1 
            customBg="rgb(21, 48, 121)"
            bgcolor=""
            header={show ? ("Login"):('')}
            status={status}
            body={show ? (
                <form>
                    
                    Email<br/>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                    
                    <button type="submit" className="btn btn-dark" onClick={e => login(e)}>Login</button>
                </form>
            ) : (<div>
                    <h5>Welcome {data.userLogged}!</h5>
                    <button type="submit" className="btn btn-dark" onClick={clearForm}>Confirm to logout!</button>
                </div>)}
        />
        </div>
    );
}

