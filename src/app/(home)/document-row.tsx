import { SiGoogledocs } from 'react-icons/si'
import { Doc } from '../../../convex/_generated/dataModel'
import { TableCell, TableRow } from '../../components/ui/table'
import { Building2Icon, CircleUserIcon } from 'lucide-react'
import { format } from 'date-fns'
import DocumentMenu from './document-menu'

interface DocumentRowProps {
  document: Doc<"documents">
}

const DocumentRow = ({ document }: DocumentRowProps) => {

  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, '_blank')
  }

  return (
    <TableRow className='hover:bg-muted cursor-pointer'>
      <TableCell className='w-[50px]'>
        <SiGoogledocs className='size-6 fill-blue-500' />
      </TableCell>
      <TableCell className='font-medium md:w-[45%]'>
        {document.title}
      </TableCell>
      <TableCell className='hidden md:table-cell text-muted-foreground'>
        <div className='flex items-center gap-2'>
          {document.organizationId ? <Building2Icon className='size-4' /> : <CircleUserIcon className='size-4' />}
          {document.organizationId ? 'Organization' : 'Personal'}
        </div>
      </TableCell>
      <TableCell className='hidden md:table-cell text-muted-foreground'>
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className='flex justify-end'>
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  )
}

export default DocumentRow