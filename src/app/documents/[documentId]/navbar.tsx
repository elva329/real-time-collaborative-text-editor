'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import DocumentInput from './document-input';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, Italic, PrinterIcon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';

const NavBar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted cursor-pointer">
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem>
                    <FilePlusIcon className='size-4' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />

                  <MenubarItem>
                    <FilePenIcon className='size-4' />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className='size-4' />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className='size-4' />
                    Print <MenubarShortcut>&#8984;P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Undo2Icon className='size-4' />
                    Undo <MenubarShortcut>&#8984;Z</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem>
                    <Undo2Icon className='size-4' />
                    Redo <MenubarShortcut>&#8984;Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                  Insert
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>1 × 1</MenubarItem>
                      <MenubarItem>2 × 2</MenubarItem>
                      <MenubarItem>3 × 3</MenubarItem>
                      <MenubarItem>4 × 4</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem>
                        <BoldIcon className='size-4' />
                        Bold<MenubarShortcut>&#8984;B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Italic className='size-4' />
                        Italic<MenubarShortcut>&#8984;I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <UnderlineIcon className='size-4' />
                        Underline<MenubarShortcut>&#8984;U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <StrikethroughIcon className='size-4' />
                        Strikethrough<MenubarShortcut>&#8984;S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem>
                    <RemoveFormattingIcon className='size-4' />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar