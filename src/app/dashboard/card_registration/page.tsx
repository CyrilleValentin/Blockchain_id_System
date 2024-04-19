"use client";
import * as React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { StateContext } from "@/components/Provider";

import { useQRCode } from "next-qrcode";
import { AlertDialogDemo } from "@/components/qrCode";

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
});


    // const styles = StyleSheet.create({
    //     page: {
    //       flexDirection: 'row',
    //       backgroundColor: '#E4E4E4'
    //     },
    //     section: {
    //       margin: 10,
    //       padding: 10,
    //       flexGrow: 1
    //     }
    //   });
      
    //   // Create Document Component
    //   const MyDocument = ((data: { birthDate?: Date | undefined; madeDate?: Date | undefined; expireDate?: Date | undefined; image?: any; Idnum?: any; firstname?: string; lastname?: string; city?: string; profession?: string; gender?: string;}) => (
    //     <Document>
    //       <Page size="A6" style={styles.page}>
    //         <View style={styles.section}>
    //           <Text>Identity Card</Text>
    //         </View>
    //         <View style={styles.section}>
    //           <Text>{data.firstname}</Text>
    //         </View>
    //       </Page>
    //     </Document>
    //   ));

export default function ProfileForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [madeDate, setMadeDate] = React.useState<Date>();
  const [expireDate, setExpireDate] = React.useState<Date>();
  const { toast } = useToast();
  const { contract, provider, signer } = useContext(StateContext);
  const [Hash, setHash] = React.useState<String>("");
  const { Image } = useQRCode();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Idnum: "",
      firstname: "",
      lastname: "",
      city: "",
      gender: "",
      profession: "",
      image: "",
    },
  });

  async function setDocument(docHash: string, imgHash: string) {
    const registerDocTx = await contract?.registerDocument(docHash, imgHash);
    return registerDocTx;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const updatedValues = {
      ...values,
      birthDate: birthDate,
      madeDate: madeDate,
      expireDate: expireDate,
    };
    console.log(updatedValues);
    const request = await fetch("/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedValues),
    }).then(async (response) => {
      if (response.ok) {
        // const data = await response.json();
        // await setDocument(data?.image, data?.document).then(async (tx) => {
        //     console.log(tx.hash)
        //     setHash(tx.Hash)
        //     if (tx.hash) {
        //         const request = await fetch('/saveCard', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(data),
        //         })
        //     }
        // })
        toast({
          description: "Your card has been saved.",
        });
        MyDocument(updatedValues);
       // ReactPDF.render(<MyDocument />, `/example.pdf`);
        setIsLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
      }
    });

    console.log(request);
    setBirthDate(undefined);
    setMadeDate(undefined);
    setExpireDate(undefined);
    form.setValue("gender", "Select a gender");
    form.reset();
  }

  return (
    <main className=" w-[55rem] h-[28rem] flex justify-center items-center flex-col">
      <h1 className="text-6xl mb-8 font-bold ">ID CARD REGISTRATION</h1>
      <Form {...form}>
        <form className="w-[50rem]" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2 mb-2 ">
            <FormField
              control={form.control}
              name="Idnum"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder=" Id Card Number "
                      {...field}
                    />
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
                    <Input
                      className="text-black"
                      placeholder="Last Name"
                      {...field}
                    />
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
                  {birthDate ? (
                    format(birthDate, "PPP")
                  ) : (
                    <span>Birth Date</span>
                  )}
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
                    <Input
                      className="text-black"
                      placeholder="Birth City"
                      {...field}
                    />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[800px] mb-2">
                    <SelectValue placeholder="Select a gender" />
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
                    <Input
                      className="text-black"
                      placeholder="Profession"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2 mb-1">
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
                  {expireDate ? (
                    format(expireDate, "PPP")
                  ) : (
                    <span>Expires On</span>
                  )}
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
              <FormItem className="w-full mb-1">
                <FormControl>
                  <Input
                    className="text-black"
                    accept="image/png, image/jpeg, image/gif"
                    type="file"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="qr">
            <Image
              text={`QmXJqipVU8DU3Kpy5ebVsLriwRdrRbkejLhaNa8FFYf9tQ`}
              options={{
                type: "image/jpeg",
                quality: 0.3,
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#010599FF",
                  light: "#FFBF60FF",
                },
              }}
            />
          </div>

          <div className="w-full flex justify-end">
            <Button className="w-44 " onClick={() => {}} type="submit">
              {isLoading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
