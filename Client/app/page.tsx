import './page.css';
import TypingGame from '@/components/typingGame';
import { getToken } from '@/components/features/storeToken';
import Hero from '@/components/hero';

export default async function home(){
  const token = await getToken()
  const present = token?.value !== undefined;
  return(
    <div className='px-4 lg:px-20'>
      {/* {present && <TypingGame present={present} />} */}
      {!present && <Hero />}
      <section id="game" className='w-full'>
        <TypingGame present={present}  />
      </section>
    </div>
  )
}
