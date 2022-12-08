import React, {useContext} from 'react';
import { UserContext } from './context';
import Card1 from './customCard';
import { auth } from '../config/firebase-conf';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default function Withdraw(){
    const {data, setData} = useContext(UserContext);

    const {useState, useEffect} = React;
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(data.userLogged);
    const [balance, setBalance] = useState('');
    const [actualbalance, setActualalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(()=>{

        onAuthStateChanged(auth, (usr) => {
            console.log('entered change')
            if (usr) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = usr.uid;
                console.log(usr.email);
                console.log('uid =', uid);     
                let data2 = data;
                    data2.userLogged = usr.email;
                    setUser(usr.email);
                    setData(data2); 
                    setShow(true);
                    return('yes');
            } else {
                // User is signed out
                console.log('User is not logged in');
                setShow(true);
                //setUser(null);
                //alert("STATE CHANGED: User is signed out");
            }
          });

        setUser(data.userLogged);
        /* if(user!=null){ */
        if(data.userLogged!=null){
            getBalance()
            .then((response)=>{
                setActualalance(response);
                console.log('response: ' + response);
            });
            setShow(true)
        }
        else{setReload(true)
        };
    }, [reload])

    async function getBalance(){
        console.log('Communicating with database...');
        let email = user;
        /* let url = `http://localhost:4000/account/balance/${email}`; */
        let url = process.env.REACT_APP_API_URL + `/account/balance/${email}`;
        console.log('en setloading true');
//        setLoading(true);
        var res = await fetch (url);
        console.log(res);
        //res.then(console.log);
        console.log('regresó de fetch');
        var data = await res.json();
        console.log('Actual Balance: ', data);
        console.log('en setloading false');
        setLoading(false);
        return data;
    };

    async function submitBalance(newBalance){
        console.log('Communicating with database...');
        let email = user;
        /* let url = `http://localhost:4000/account/withdraw/${email}/${newBalance}`; */
        let url = process.env.REACT_APP_API_URL + `/account/withdraw/${email}/${newBalance}`;
        setLoading(true);
        var res = await fetch (url);
        var data = await res.json();
        console.log('data en deposit: ', data);
        setLoading(false);
        return data;
    }

    const handleWithdraw=(e)=>{
        e.preventDefault();
        if(isNaN(balance)){
            alert('Only positive numbers are allowed in the "Deposit" field');
            setBalance('');
            return;
        };
        if(balance<0){
            alert('Negative numbers are not allowed');
            setBalance('');
            return;
        };
//Modificar        
        if(balance>actualbalance){
            alert('Transaction failed! insufficient funds!');
            setBalance('');
            return;
        };

        ///////// To back-end
        // Actual balance
        (async function sequentialStart(){
            let balanceActual = await getBalance();
            console.log('si esperó: ' + balanceActual);
            console.log(typeof(balance));
            let newBalance = balanceActual - Number(balance);
            console.log('New balance: ', newBalance);
            await submitBalance(newBalance);
            getBalance()
                .then((response)=>{
                    setActualalance(response);
                    console.log('response: ' + response);
                });
        })();

        setBalance('');
        if(balance>0){
            setMessage('The withdraw was made successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
    }

    return(
        <div className='container content'>
            <div className='user-data'>
            {show && <h1>{data.userLogged}</h1>}
            {/* {show && <h1>{user}</h1>} */}
            {show && <h3>Balance: { loading && <span> Loading...</span>}{ !loading && <span> ${actualbalance}</span>}</h3>}
            </div>

            <div>
            <Card1 
            header="Withdraw"
            bgcolor="warning"
            txtcolor="black"
            status={status}
            body={show ? (
                <div className='content'>
                    <h5>{message && <div className='message-w'>{message}</div>}</h5>
                    <h5>Withdraw Amount</h5>
                    <form>
                    <br/>
                    <input type="text" className="form-control" id="balance" placeholder="Withdraw" value={balance} onChange={e => setBalance(e.currentTarget.value)} /><br/>
                    <button disabled={balance==''} type="submit" className="btn btn-dark" onClick={(e)=>handleWithdraw(e)}>Withdraw</button>
                    </form>
                </div>
            ) : (<div>
                    <h1>Go to Login!</h1>
{/*                     <h5>Welcome {data.users[user].name}!</h5>
                    <button type="submit" className="btn btn-dark" onClick={clearForm}>Logout</button> */}
                </div>)}
            />
            </div>

        
        </div>
    )
}