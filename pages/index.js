import Loader from '../components/Loader'
import { useRouter } from "next/router";
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'
import {getSession,useSession} from 'next-auth/react'

function NextPage(){
   const { status, data: session } = useSession();

   if (status === "loading") {
    return <Loader />;
  }


  return (
    <div className="bg-black h-screen overflow-hidden">
      

      <main className="flex relative" >
        <Sidebar  />
        <Center/>
      {/*Center*/}
      
      </main>     

      <div className="sticky bottom-0" >
        <Player/>
      </div>
    </div>
  )
}

export default NextPage;


export async function getServerSideProps(context){
  const session = await getSession(context);

  return{
    props:{
      session,
    }
  }

}


