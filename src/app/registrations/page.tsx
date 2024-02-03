"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { FilePond, registerPlugin } from 'react-filepond'
import { FilePondFile } from "filepond"
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
    Idnum: z.string(),
    firstname: z.string().min(2, {
        message: "Firstname must be at least 3 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Lastname must be at least 3 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 3 characters.",
    }),

    profession: z.string().min(2, {
        message: "Profession must be at least 3 characters.",
    }),
    gender: z.string({
        required_error: "Please select a gender.",
    }),
    image: z.string({
        required_error: "Please select a image.",
    }),


})

export default function ProfileForm() {
    const [birthDate, setBirthDate] = React.useState<Date>()
    const [madeDate, setMadeDate] = React.useState<Date>()
    const [expireDate, setExpireDate] = React.useState<Date>()
    const [imageurl, setimageurl] = React.useState<String>();
   
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Idnum: "",
            firstname: "",
            lastname: "",
            city: "",
            gender: "",
            profession: "",
            image: ""
        },

    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const updatedValues = {
            ...values, birthDate: birthDate, madeDate: madeDate, expireDate: expireDate
        }
        console.log(updatedValues);
        const request = await fetch('/files', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //   'API-Key': process.env.DATA_API_KEY!,
            },
            body: JSON.stringify(updatedValues),
        })
        console.log(request);
        const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;
        // const pinataConfig:PinataConfig ={
        //     pinataApiKey:PINATA_API_KEY,
        //     pinataSecretApiKey:PINATA_API_SECRET,
        //     pinataJWTKey:PINATA_JWT

        // }
        // const pinata = new PinataClient(pinataConfig);
        // pinata.pinFileToIPFS( formSchema).then((result: any) => {   
        //     //handle results here
        //     console.log(result);
        // }).catch((err: any) => {
        //     //handle error here
        //     console.log(err);
        // });

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="flex flex-row gap-2 mb-2">
                    <FormField
                        control={form.control}
                        name="Idnum"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="text-black" placeholder=" Id Card Number " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row gap-2  mb-2">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="text-black" placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[800px] justify-start text-left font-normal mb-4",
                                    !birthDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {birthDate ? format(birthDate, "PPP") : <span>Birth Date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={birthDate}
                                onSelect={setBirthDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="text-black" placeholder="Birth City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[800px] mb-2">
                                    <SelectValue placeholder="Select a gender " />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="text-black" placeholder="Profession" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[400px] justify-start text-left font-normal",
                                    !madeDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {madeDate ? format(madeDate, "PPP") : <span>Made On</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={madeDate}
                                onSelect={setMadeDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[400px] justify-start text-left font-normal mb-1",
                                    !expireDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {expireDate ? format(expireDate, "PPP") : <span>Expires On</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={expireDate}
                                onSelect={setExpireDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>


                </div>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input className="text-black" accept="image/png, image/jpeg, image/gif" type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button type="submit">Submit</Button>

                </div>
               
            </form>
        </Form>
    )
}
