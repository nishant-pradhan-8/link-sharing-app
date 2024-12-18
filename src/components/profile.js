import LeftMain from './leftmain'
import RightMainProfile from './rightmainprofile'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext } from 'react';
import DataContext from '../context/context';

function Profile(){
    const{navigate} = useContext(DataContext)
    useEffect(()=>{
        const subscription = onAuthStateChanged(auth,(user) => {
          if (!user) {
          navigate('/login')
          }
        });
        return ()=>subscription();
    },[])
    return(
        <main className='primary-main'>
        <LeftMain />
        <RightMainProfile />
    </main>
    )
}
export default Profile