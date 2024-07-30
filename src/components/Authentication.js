import { auth, provider } from '../firebaseconfig.js'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Authentication(props) {
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        props.setAuth(true);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className='h-screen h-full flex justify-center items-center'>
        <button onClick={signInWithGoogle} className='p-6 bg-blue-500 text-white font-bold text-[16px] rounded-[10px]'>Sign in with Google</button>
    </div>
  )
}

export default Authentication;