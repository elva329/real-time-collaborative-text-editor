import { SiGoogledocs } from 'react-icons/si'
import { Doc } from '../../../convex/_generated/dataModel'
import { Table, TableCell, TableRow } from '../../components/ui/table'
import { Building2Icon, CircleUserIcon, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '../../components/ui/button'

interface DocumentRowProps {
  document: Doc<"documents">
}

const DocumentRow = ({ document }: DocumentRowProps) => {
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
        <Button variant="ghost" size='icon' className='rounded-full cursor-pointer'>
          <MoreVertical className='size-4' />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default DocumentRow