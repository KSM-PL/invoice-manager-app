import React from 'react';
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Navigate, Link } from "react-router-dom";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    CalendarIcon
} from "@radix-ui/react-icons";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const CreateInvoice = () => {
    const authHeader = useAuthHeader();
    const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [selectedDate, setSelectedDate] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        // watch,
        // reset,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        console.log(values);
        
        if (isValid) {
            fetch("http://localhost:8080/api/v1/invoices/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    dueDate: values.dueDate,
                    recipientEmail: values.recipientEmail,
                    amount: values.amount,
                    currency: "USD",
                    name: values.description
                }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(JSON.stringify(err));
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                toast({
                    title: "Hurrah!",
                    description: "Successfully logged in!",
                    className: "bg-green-800"
                })

                navigate("/"); 
            })
            .catch(error => {
                console.log(error);
                const errorMessage = JSON.parse(error.message);

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage.message,
                })
            });

        } else {
            alert("INVALID");
        }

    };

    return (
        <MainContainer type="create-invoice" description="Fill in the details and then click the button.">
            <div className="flex flex-col justify-center items-center pt-4 md:pt-8 w-full">
                <form className="pt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="recipientEmail" className={cn(errors.recipientEmail ? "text-red-500" : "text-foreground")}>Recipient email</Label>
                            <Input 
                                id="recipientEmail"
                                type="email"
                                placeholder="example@gmail.com" 
                                {...register("recipientEmail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                                        message: "Email is not validated",
                                    },
                                })}
                            />
                            <p className="text-red-500 h-4 text-xs">{errors.recipientEmail && errors.recipientEmail.message}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount" className={cn(errors.amount ? "text-red-500" : "text-foreground")}>Amount (USD)</Label>
                            <Input 
                                id="amount"
                                type="number"
                                placeholder="$" 
                                {...register("amount", {
                                    required: "Amount is required",
                                })}
                            />
                            <p className="text-red-500 h-4 text-xs">{errors.amount && errors.amount.message}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description" className={cn(errors.description ? "text-red-500" : "text-foreground")}>Description</Label>
                            <Textarea 
                                id="description"
                                type="text"
                                placeholder="This is an invoice for..." 
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                            <p className="text-red-500 h-4 text-xs">{errors.description && errors.description.message}</p>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="dueDate" className={cn(errors.dueDate ? "text-red-500" : "text-foreground")}>Due date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                    >
                                        {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Controller
                                            control={control}
                                            name='dueDate'
                                            rules={{ required: "Due date is required" }}
                                            render={({ field: { onChange, value } }) => (
                                                <Calendar
                                                    mode="single"
                                                    selected={value} 
                                                    onSelect={(date) => {
                                                        setSelectedDate(date);
                                                        onChange(date);
                                                    }}
                                                    initialFocus
                                                />
                                            )}
                                        />

                                </PopoverContent>
                            </Popover>
                            <p className="text-red-500 h-4 text-xs">{errors.dueDate && errors.dueDate.message}</p>
                        </div>
                    </div>
                    <Button className="w-full" type="submit" >Send an invoice</Button>


                </form>
            </div>
        </MainContainer>
    )
}

export default CreateInvoice;
