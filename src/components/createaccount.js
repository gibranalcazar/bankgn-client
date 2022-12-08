import React, {useContext} from 'react';
import { UserContext } from './context';
import Card1 from './customCard';
import { auth } from '../config/firebase-conf';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function CreateAccount() {
  const {data, setData} = useContext(UserContext);
  const {useState, useEffect} = React;
    console.log('in create account');
    //const useState = React.useState;
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [balance2, setBalance2] = useState('');
    
    useEffect(()=>{
        
        onAuthStateChanged(auth, (user) => {
            console.log('entered change')
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user);
                console.log(user.email);
                console.log('uid =', uid);     
                let data2 = data;
                    data2.userLogged = user.email;
                    setData(data2); 
                    console.log(data);
                    console.log(data2);
                    return('yes');
            } else {
                // User is signed out
                console.log('User is not logged in');
            }
          });
    }, [])

    

    function validates(field, label){
        if(!field){
            alert(label);
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true
    }
    const handleCreate = (e) =>{
        e.preventDefault();
        
        if (!validates(name, 'Name field is blank'))    return;
        if (!validates(email, 'Email field is blank'))    return;
        if (!validates(password, 'Password field is blank'))    return;
        if (password.length<8){
            alert('The password must have at least 8 characters');
            setStatus('Error: ' + 'The password must have at least 8 characters');
            setTimeout(() => setStatus(''), 3000);
            return;
        }
        if (!validates(confpassword, 'Password must be confirmed'))    return;
        if (password != confpassword){
            alert('Password must match!');
            setStatus('Error: ' + 'The password must match');
            setTimeout(() => setStatus(''), 3000);
            return;
        }
        if (!validates(balance2, 'Deposit field is blank'))    return;
        if(balance2<0){
            alert('Negative numbers are not allowed');
            setBalance2('');
            return;
        };
        
        console.log('Creating user!');
        let balance = Number(balance2);
        console.log(name,email,password, balance);
        let error1 = null;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("SUCCESFULL REGISTER"); 

                console.log('Registrando en base de datos...');
                /* let url = `http://localhost:4000/account/create/${name}/${email}/${password}/${balance}`; */
                let url = process.env.REACT_APP_API_URL + `/account/create/${name}/${email}/${password}/${balance}`;

                (async () =>{
                    var res = await fetch (url);
                    var data = await res.json();
                    console.log(data);
                    return data;
                })().then(console.log);
                //setData(data2);
                setShow(false);
                // ...
                })
            .catch((error) => {
                error1 = error.code;
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                if(errorCode == 'auth/email-already-in-use'){alert('Email already in use!')}
                else{alert(errorMessage);};
                //clearForm();
                // ..
        });
    }

    const clearForm = () =>{
        setName("");
        setEmail("");
        setPassword("");
        setShow(true);
        setBalance2('');
    }

    return(
        <div className='container content'>
        
        <div><h1>Create Account</h1></div>
        <Card1 
            bgcolor=""
            customBg="#07acc9"
            header=""
            status={status}
            body={show ? (
                <form>
                    Name<br/>
                    <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                    Email<br/>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                    Confirm Password<br/>
                    <input type="password" className="form-control" id="confpassword" placeholder="Confirm password" value={confpassword} onChange={e => setConfpassword(e.currentTarget.value)} /><br/>
                    Deposit<br/>
                    <input type="number" className="form-control" id="balance" placeholder="Initial deposit" value={balance2} onChange={e => setBalance2(e.currentTarget.value)} /><br/>
                    <button disabled={name=='' && email=='' && password=='' && balance2==''} type="submit" className="btn btn-dark" onClick={(e)=>handleCreate(e)}>Create and login!</button>
                </form>
            ) : (<div>
                    <h5>Account created successfully!</h5>
                    <button type="submit" className="btn btn-dark" onClick={clearForm}>Add another Account</button>
                </div>)}
        />
        </div>
    );
  }