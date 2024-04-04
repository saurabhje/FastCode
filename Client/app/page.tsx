import NavBar from '@/components/navbar';
import './page.css';
import TypingGame from '@/components/typingGame';

export default async function home(){

  return(
    <div>
      <NavBar/>
      <TypingGame />
    </div>
  )
}
