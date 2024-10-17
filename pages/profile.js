import CardContent from '@/components/customUI/CardContent';
import PageTitle from '@/components/customUI/PageTitle';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { setPreviewDetails } from '@/redux/preview/previewSlice';
import { setUserDetails } from '@/redux/user/usersSlice';
import { usersAPIs } from '@/utility/api/usersApi';
import { handleErrorMessage, uploadImage } from '@/utility/utilityFunctions';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';


const ProfilePage = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { previewDetails } = useSelector((state) => state.previewSlice);
    const dispatch = useDispatch();
    const { toast } = useToast()
    const [loading, setIsLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [hover, setHover] = useState(false);

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({ mode: "all" });

    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            contactEmail: "",
        },
    })

    const watchFieldArray = useWatch({ control });

    useEffect(() => {
        reset({
            firstName: userDetails?.firstName,
            lastName: userDetails?.lastName,
            contactEmail: userDetails?.contactEmail,
        })
    }, [])


    useEffect(() => {
        if (previewDetails?.id) {
            var info = { ...previewDetails, ...watchFieldArray };
            dispatch(setPreviewDetails(info));
        }
    }, [watchFieldArray])


    const onClickUpload = () => {
        document.getElementById('uploadProfileImage').click();
    };

    const handleChange = async (event) => {
        const imageFile = event.target.files[0];
        const imagePath = imageFile && URL.createObjectURL(imageFile)

        if ((imageFile?.size / 1048576) > 2) {
            toast({
                variant: "error",
                title: "Image size is too large",
            })
        } else {
            setImagePath(imagePath);
            setUploadedImage(imageFile);
            if (previewDetails?.id) {
                var info = { ...previewDetails, picture: imagePath};
                dispatch(setPreviewDetails(info));
            }
        }
    };


    const onSubmit = async (data) => {
        // console.log('data ==>', data);

        const userInfo = {
            firstName: data?.firstName,
            lastName: data?.lastName,
            contactEmail: data?.contactEmail,
        }

        setIsLoading(true);

        if (uploadedImage && imagePath) {
            var picUrl = await uploadImage(uploadedImage)
        }
        userInfo.picture = picUrl;

        try {
            const response = await usersAPIs.updateUser(userInfo, userDetails?.id)
            // console.log('response ==>', response);

            if (response) {
                const user = response;
                delete user.password;

                if (user?.id) {
                    dispatch(setUserDetails(user));
                    toast({
                        variant: "success",
                        title: "Your changes saved successfully",
                    })
                    setIsLoading(false);
                } else {
                    toast({
                        variant: "error",
                        title: "Failed to save the changes",
                    })
                    setIsLoading(false);
                }
            } else {
                toast({
                    variant: "error",
                    title: "Something went wrong. Please try again later",
                })
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error ==>", error);

            toast({
                variant: "error",
                title: "Failed to save the changes",
            })
            setIsLoading(false);
        }
    }


    return (
        <Layout>
            <div className="w-full lg:w-[60%]">
                <CardContent className="mb-7 pt-7">
                    <PageTitle title="Profile Details" className="mb-2" />
                    <p className='text-sm'>Add your details to create a personal touch to your profile.</p>

                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-3 sm:flex-row justify-between sm:items-center bg-gray-50 rounded-lg px-3 py-7 mt-10">
                                <p className='w-fit'>Profile picture</p>
                                <div className='w-full sm:w-[70%] flex flex-col sm:flex-row items-center gap-5'>
                                    <div className='relative w-fit'>
                                        <Avatar
                                            className={cn('border border-solid rounded-lg border-slate-300 h-40 w-40',
                                                hover && 'opacity-20'
                                            )}
                                            onMouseOver={() => setHover(true)}
                                            onMouseLeave={() => setHover(false)}
                                        >
                                            <AvatarImage
                                                src={(uploadedImage && imagePath) ? imagePath : userDetails?.picture}
                                            />
                                            <AvatarFallback className="rounded-lg text-3xl uppercase">{userDetails?.firstName ? userDetails?.firstName[0] : 'A'}</AvatarFallback>
                                        </Avatar>

                                        <Input id="uploadProfileImage" type="file" accept="image/*" onChange={handleChange} className="hidden" />

                                        <div
                                            className={cn('h-40 w-40 flex flex-col justify-center items-center absolute top-0 cursor-pointer z-[-10]',
                                                hover && 'z-[10]'
                                            )}
                                            onClick={() => onClickUpload()}
                                            onMouseOver={() => setHover(true)}
                                            onMouseLeave={() => setHover(false)}
                                        >
                                            <MdOutlineAddAPhoto className='text-primary text-xl' />
                                            <p className='text-[12px] text-black w-fit'>Change Image</p>
                                        </div>
                                    </div>
                                    <p className='w-fit text-[12px]'>Image size should not be more than 2MB*</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg px-3 py-7 space-y-5 my-5">
                                <div className="flex justify-between items-center">
                                    <p className=''>First name*</p>
                                    <div className='w-[70%]'>
                                        <FormField
                                            control={control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
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
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className=''>Last name*</p>
                                    <div className='w-[70%]'>
                                        <FormField
                                            control={control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
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
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className=''>Email</p>
                                    <div className='w-[70%]'>
                                        <FormField
                                            control={control}
                                            name="contactEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="contactEmail"
                                                            placeholder="Your contact email"
                                                            autoComplete="off"
                                                            {...field}
                                                            {...register("contactEmail", {
                                                                required: false,
                                                                pattern: {
                                                                    value: /\S+@\S+\.\S+/,
                                                                    message: "Invalid email address",
                                                                },
                                                            })}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        <small className='mt-0'>This is your contact email. Login credentials will remain as it is.</small>
                                                    </FormDescription>
                                                    <FormMessage>
                                                        {
                                                            handleErrorMessage(errors, "contactEmail") ? (
                                                                <span className="font-medium text-xs mt-0">
                                                                    {handleErrorMessage(errors, "contactEmail")}
                                                                </span>
                                                            ) : null
                                                        }
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end mt-7 mb-6'>
                                <Button
                                    className="w-full md:w-fit"
                                    size="lg"
                                    type="submit"
                                    disabled={loading}
                                    loading={loading}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Layout >
    );
};

export default ProfilePage;
