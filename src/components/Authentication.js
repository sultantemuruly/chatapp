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
    <div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default Authentication;