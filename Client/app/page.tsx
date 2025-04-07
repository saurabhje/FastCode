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
{/*       <footer className='mt-auto pb-2 text-zinc-600 flex justify-center gap-8'>
        <a className='hover:text-primary hover:underline' href='https://saurabhje.vercel.app'>Blog</a>
        <a className='hover:text-primary hover:underline' href='https://x.com/ghostedglory'>Twitter</a>
        <a className='hover:text-primary hover:underline' href='https://github.com/saurabhje/fastcode'>Github repo</a>
      </footer> */}
    </div>
  )
}
