import {AiOutlineCheckCircle,AiFillCheckCircle} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {signOut} from 'next-auth/react'
import {useEffect} from 'react'
import { useRecoilState } from 'recoil'
import {micState} from '../atoms/slideAtom'

function Settings({func,reveal}){

	const [mic,setMic] = useRecoilState(micState)

	useEffect(()=>{
		if(reveal===true){
			let settings = document.getElementById('Settings')
			settings.classList.remove('bottom-[120vh]')
			let Logout = document.getElementById('Logout')
			Logout.classList.remove('-skew-y-[50deg]')
			let Enable = document.getElementById('Enable');
			Enable.classList.remove('skew-y-[50deg]')
			
		}
		if (reveal===false) {
			let Logout = document.getElementById('Logout')
			Logout.classList.add('-skew-y-[50deg]')
			let Enable = document.getElementById('Enable');
			Enable.classList.add('skew-y-[50deg]')
			setTimeout(()=>{
				let settings = document.getElementById('Settings')
				settings.classList.add('bottom-[120vh]')
			},300)

		}
	},[reveal])
		
	function micOn(){
		if(mic===true){
			setMic(false)
		}
		else{
			setMic(true)
		}

	}

	


return(

	<div>
		<div id="Settings" className="flex z-50 absolute w-screen bottom-[120vh] transition ease-in-out delay-300 h-screen bg-opacity-60 bg-slate-600 text-black">
			<div classNam="flex items-center">	 
				<button 
				className="rounded-full fixed hover:shadow-green-500 shadow-white mt-6 hover:scale-125 hover:transition hover:ease-in-out mt-2 text-white shadow ml-5 border-r hover:border-green-500 border-gray-100 w-[50px]" 
				onClick={()=>func()}
				>
				close
				</button>

				<div className="h-screen w-screen my-auto transition ease-in-out duration-300 items-center flex">
					<div className="m-auto space-y-5" >
						<form 
						id="Enable"
						onClick={micOn}
						className="flex space-x-3 cursor-pointer hover:scale-110 transition duration-500 ease-in-out skew-y-[50deg] ">	
							{mic ? <AiFillCheckCircle className="h-5 w-5 text-green-500"/> : <AiOutlineCheckCircle className="h-5 w-5 text-gray-500"/> }
							
							<button onClick={(e)=>e.preventDefault()} className="font-bold text-white" >Enable NoDisturbOnConvo Mode</button>
							
						</form>
						<form 
						id="Logout"
						onClick={signOut} 
						className="flex space-x-3 cursor-pointer  hover:scale-110 transition duration-500 ease-in-out -skew-y-[50deg]">	
							<FiLogOut className="h-5 w-5 text-green-500"/>
							<p className="font-bold text-white" >Log out</p>
							
						</form>
					</div>
				</div>

			</div>
		</div>

	</div>

	)


}

export default Settings;