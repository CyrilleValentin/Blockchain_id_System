import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BirthDate, ExpiryDate, ManufactureDate } from "@/components/ui/datepicker"
import { RegistrationForm } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Form = () => {
    return (
        <Card className="w-[750px]">
            <CardHeader>
                <CardTitle className="text-center text-4xl">Registration Form</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center mb-4">
                    <Avatar className="h-28 w-28">
                        <AvatarImage  src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                {/* <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="">
                            <Input id="number" placeholder="Card Number" />
                        </div>
                        <div className="flex flex-row gap-2">
                            <Input id="fistname" placeholder="First Name" />
                            <Input id="lastname" placeholder="Last Name" />
                        </div>


                        <div className="flex flex-row gap-2">
                            <BirthDate />
                            <Input id="city" placeholder="Birth City" />
                        </div>
                        <div className="flex flex-row gap-2">
                            <Input id="gender" placeholder="Gender" />
                            <Input id="profession" placeholder="Profession" />
                        </div>
                        <div className="flex flex-row gap-4">
                            <ManufactureDate />
                            <ExpiryDate />
                        </div>

                    </div>
                </form> */}

                <RegistrationForm/>
            </CardContent>
            {/* <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
            </CardFooter> */}
        </Card>
    )
}
