import React, {useContext} from 'react';
import { UserContext } from './context';
import Card1 from './customCard';

export default function Withdraw(){
    const {data, setData} = useContext(UserContext);
    let url = '';
    let balanceActual = 0;
    let newBalance = 0;

    const {useState, useEffect} = React;
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(data.userLogged);
    const [balance, setBalance] = useState('');

    useEffect(()=>{

        const logedIn=()=>{
            setUser(data.userLogged);
            if(user!==null){setShow(true)};
            
        }
        logedIn();
    }, [user])

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
        if(balance>data.users[user].balance){
            alert('Transaction failed! insufficient funds!');
            setBalance('');
            return;
        };

        ///////// To back-end
        // Actual balance
        let email = 'Oranges@mit.edu';
        url = `http://localhost:4000/account/balance/${email}`;

        async function getBalance(){
            var res = await fetch (url);
            var data = await res.json();
            console.log('Actual Balance: ', data);
            return data;
        };
        
        async function submitBalance(){
            url = `http://localhost:4000/account/withdraw/${email}/${newBalance}`;
            var res = await fetch (url);
            var data = await res.json();
            console.log('data en deposit: ', data);
            return data;
        };

        (async function sequentialStart(){
            balanceActual = await getBalance();
            console.log(balanceActual);
            console.log(typeof(balance));
            newBalance = balanceActual - Number(balance);
            console.log(newBalance);
            submitBalance()

        })();

        let data2 = data;
        data2.users[user].balance -= Number(balance);
        console.log(data2);
        setData(data2);
        setBalance('');
        if(balance>0){
            setMessage('The withdraw was made successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
    }

    return(
        <div className='container content'>
            <div className='user-data'>
            {/* {show && <h1>{data.users[user].name}</h1>}
            {show && <h3>Balance: ${data.users[user].balance}</h3>} */}
            {show && <h1>{data.userLogged}</h1>}
            {show && <h3>Balance: $10</h3>}
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