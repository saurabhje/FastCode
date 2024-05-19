import './page.css';
import { getToken } from '@/components/features/storeToken';
import ScrollToTypingGame from '@/components/home';

export default async function home() {
  const token = await getToken()
  const present = token?.value !== undefined;
  return (
    <div className='px-4 lg:px-20'>
      <ScrollToTypingGame present={present} />
      <footer className='mt-auto pb-2 text-zinc-600 flex justify-center gap-8'>
        <a className='hover:text-primary hover:underline' href='https://saurabhje.vercel.app'>Blog</a>
        <a className='hover:text-primary hover:underline' href='https://x.com/ghostedglory'>Twitter</a>
        <a className='hover:text-primary hover:underline' href='mailto:saurabhjesingh@gmail.com'>Send me a mail</a>
      </footer>
    </div>
  )
}
