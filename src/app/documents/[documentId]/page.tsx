import React from 'react'
import { Editor } from './editor';
import Toolbar from './toolbar';
import NavBar from './navbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
        <NavBar />
        <Toolbar />
        <Editor />
      </div>
    </div>
  )
}

export default DocumentIdPage