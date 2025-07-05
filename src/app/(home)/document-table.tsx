import { PaginationStatus } from 'convex/react';
import { Doc } from '../../../convex/_generated/dataModel';
import { LoaderIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import DocumentRow from './document-row';


interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus
}

const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      {documents === undefined ? (
        <div className='flex justify-center items-center h-24'>
          <LoaderIcon className='animate-spin text-muted-foreground size-5' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent border-none'>
              <TableHead className='w-[50px]'></TableHead>
              <TableHead className='md:w-[45%]'>Name</TableHead>
              <TableHead className='hidden md:table-cell'>Shared</TableHead>
              <TableHead className='hidden md:table-cell'>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='text-center text-muted-foreground h-24'>
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default DocumentsTable