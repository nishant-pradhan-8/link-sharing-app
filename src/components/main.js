import useDataBase from '../firebase'
import { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from '../context/context'
import LeftMain from './leftmain'
import RightMain from './rightmain'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
function Main(){
    const {retreiveData} = useDataBase()
    const {user,navigate} = useContext( DataContext)

    useEffect(()=>{
        async function getData(){
            await retreiveData()
        }
        getData()
    },[user])

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
            <RightMain />
        </main>
    )
}
export default Main