import './page.css';
import { getToken } from '@/components/features/storeToken';
import ScrollToTypingGame from '@/components/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KeyScripter | Homepage',
  description: 'snippet typing application'
}

export default async function home() {
  const token = await getToken()
  const present = token?.value !== undefined;

  return (
    <div className='px-4 lg:px-20 flex flex-col'>
      <ScrollToTypingGame present={present}/>
    </div>
  )
}
