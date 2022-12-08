import Card1 from './customCard';
import React, {useContext} from 'react';
import { UserContext } from './context';
import { auth } from '../config/firebase-conf';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home(){
    const {data, setData} = useContext(UserContext);

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
                //setShow(false);
                return('yes');
        } else {
            // User is signed out
            console.log('User is not logged in');
            //setUser(null);
            //alert("STATE CHANGED: User is signed out");
        }
      });

    return(
        <div className="content">           
{/* Colors: light, dark, info, success, warning, danger, primary, secondary */}
            <Card1 
                status=""
                bgcolor="light"
                txtcolor="black"
                /* header="Bank Landing Page" */
                header=""
                title="Welcome to Smart Bank"
                text="We help you build your heritage"
                body={(<img src="favicon.png" className="img-fluid" alt="Responsive image"/>)}
            />
        </div>
    );

}