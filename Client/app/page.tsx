import NavBar from '@/components/navbar';
import './page.css';
import TypingGame from '@/components/typingGame';
import { getToken } from '@/components/features/storeToken';

export default async function home(){
  const token = await getToken()
  const present = token?.value !== undefined;
  return(
    <div>
      <TypingGame present={present} />
    </div>
  )
}
