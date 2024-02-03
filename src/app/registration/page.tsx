import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileForm from "../registrations/page"

export const Form = () => {
    return (
        <div className=" flex justify-center">
            <Card className="w-[950px] ">
                <CardHeader>
                    <CardTitle className="text-center text-4xl">Registration Form</CardTitle>
                </CardHeader>
                <CardContent className=" grid">
                    < ProfileForm />

                </CardContent>

            </Card>
        </div>

    )
}
