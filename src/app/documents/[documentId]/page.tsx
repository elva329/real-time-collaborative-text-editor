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
      <NavBar />
      <Toolbar />
      <Editor />
    </div>
  )
}

export default DocumentIdPage