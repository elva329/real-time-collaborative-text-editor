import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      Click <Link href='/documents/123'><span className='text underline'></span>&nbsp;Here</Link> to go to document ID
    </div>
  );
} 
