import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/components/ui/use-toast';
import { setUserDetails } from '@/redux/user/usersSlice';
import { usersAPIs } from '@/utility/api/usersApi';
import { changeThemeColor, handleErrorMessage } from '@/utility/utilityFunctions';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';


const RegistrationForm = () => {
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast()

    const {
        register,
        formState: { errors, isSubmitting, isValid },
        handleSubmit,
        control,
    } = useForm({ mode: "all" });

    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {
        setIsLoading(true);

        let userCredentials = {
            firstName: data.firstName?.trim(),
            lastName: data.lastName?.trim(),
            email: data.email?.trim(),
            contactEmail: data.email?.trim(),
            password: data.password,
            themeColor: '#5F41DC',
        };

        try {
            const response = await usersAPIs.loginUser(userCredentials)
            if (response?.length > 0) {
                toast({
                    variant: "error",
                    title: "User already exists",
                })
                setIsLoading(false);
                return;
            }
        } catch (error) {
            // console.log("error ==>", error);
        }


        try {
            const response = await usersAPIs.createUser(userCredentials)

            if (response) {
                const user = response;
                delete user.password;

                // console.log('response ==>', response);

                if (user?.id) {
                    changeThemeColor(user?.preferences?.themeColor);
                    dispatch(setUserDetails(user));
                    toast({
                        variant: "success",
                        title: "Account created successfully.",
                    })
                    router.push('/links')
                } else {
                    toast({
                        variant: "error",
                        title: "Account create failed",
                    })
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log("error ==>", error);
            toast({
                variant: "error",
                title: "Account create failed",
            })
            setIsLoading(false);
        }
    }


    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className='flex flex-col lg:flex-row gap-3 lg:gap-5'>
                    <FormField
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        id="firstName"
                                        placeholder="First name"
                                        autoComplete="off"
                                        {...field}
                                        {...register("firstName", {
                                            required: "First name is required",
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {
                                        handleErrorMessage(errors, "firstName") ? (
                                            <span className="font-medium text-xs mt-0">
                                                {handleErrorMessage(errors, "firstName")}
                                            </span>
                                        ) : null
                                    }
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        id="lastName"
                                        placeholder="Last name"
                                        autoComplete="off"
                                        {...field}
                                        {...register("lastName", {
                                            required: "Name is required",
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {
                                        handleErrorMessage(errors, "lastName") ? (
                                            <span className="font-medium text-xs mt-0">
                                                {handleErrorMessage(errors, "lastName")}
                                            </span>
                                        ) : null
                                    }
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                    {...field}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </FormControl>
                            <FormMessage>
                                {
                                    handleErrorMessage(errors, "email") ? (
                                        <span className="font-medium text-xs mt-0">
                                            {handleErrorMessage(errors, "email")}
                                        </span>
                                    ) : null
                                }
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    {...field}
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                            </FormControl>
                            <FormMessage>
                                {
                                    handleErrorMessage(errors, "password") ? (
                                        <span className="font-medium text-xs mt-0">
                                            {handleErrorMessage(errors, "password")}
                                        </span>
                                    ) : null
                                }
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    className="mt-4 w-full"
                    size="lg"
                    type="submit"
                    disabled={loading}
                    loading={loading}
                >
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegistrationForm;
