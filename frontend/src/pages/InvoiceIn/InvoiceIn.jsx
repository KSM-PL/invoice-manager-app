import React from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const InvoiceIn = () => {


    return (
        <MainContainer type="invoice-in">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">???</TableCell>
                        <TableCell>??</TableCell>
                        <TableCell>??</TableCell>
                        <TableCell className="text-right">$???</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </MainContainer>
    )
}

export default InvoiceIn;
