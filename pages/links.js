import CardContent from '@/components/customUI/CardContent';
import PageTitle from '@/components/customUI/PageTitle';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { setUserDetails } from '@/redux/user/usersSlice';
import { usersAPIs } from '@/utility/api/usersApi';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';


const LinkPage = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const dispatch = useDispatch();
    const { toast } = useToast()
    const [loading, setIsLoading] = useState(false);


    const [initialValue, setInitialValue] = useState({
        platform: '',
        link: '',
    });

    const form = useForm({
        defaultValues: {
            platform: '',
            link: '',
        },
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            userLinks: [initialValue],
        },
        mode: 'all',
        shouldFocusError: false,
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'userLinks',
    });


    useEffect(() => {
        reset({ userLinks: userDetails?.links })
    }, [])


    const onSubmit = async (data) => {
        // console.log('data ==>', data);

        const userInfo = {
            links: data.userLinks
        }

        setIsLoading(true);

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
                <CardContent className="mb-7">
                    <PageTitle title="Customize your links" className="mb-2" />
                    <p>Add/edit/remove links below and then share all your profiles with the world!</p>

                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <Button
                                variant="outline"
                                className="mt-7 font-semibold w-full py-5 mb-2"
                                type="button"
                                disabled={fields?.length >= 5}
                                onClick={() => {
                                    append(initialValue, {
                                        shouldFocus: false,
                                    });
                                }}
                            >
                                <FiPlus className='mr-2' />
                                Add new link
                            </Button>

                            <div className='max-h-[384px] overflow-y-auto space-y-5 px-1'>
                                {fields.map((item, index) => (
                                    <div key={item.id} className='bg-slate-50 p-4 rounded-lg border'>
                                        <div className='flex justify-between'>
                                            <p className='font-semibold'>Link #{index + 1}</p>
                                            {fields?.length > 1 && <p className='cursor-pointer' onClick={() => remove(index)}>Remove</p>}
                                        </div>

                                        <FormField
                                            control={control}
                                            name={`userLinks.${index}.platform`}
                                            render={({ field }) => (
                                                <FormItem className="w-full mt-2">
                                                    <FormLabel>Platform</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        {...field}
                                                        {...register(`userLinks.${index}.platform`, {
                                                            required: "Platform is required",
                                                        })}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select platform" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Portfolio">Portfolio</SelectItem>
                                                            <SelectItem value="GitHub">GitHub</SelectItem>
                                                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                                            <SelectItem value="YouTube">YouTube</SelectItem>
                                                            <SelectItem value="Facebook">Facebook</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage>
                                                        {errors?.userLinks?.[index]?.platform ? (
                                                            <span className="font-medium text-xs mt-0" key={'platform'}>
                                                                {errors?.userLinks?.[index]?.platform?.message ?? "Required"}
                                                            </span>
                                                        )
                                                            :
                                                            null
                                                        }
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`userLinks.${index}.link`}
                                            render={({ field }) => (
                                                <FormItem className='mt-3'>
                                                    <FormLabel>Link</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="link"
                                                            placeholder="Link"
                                                            autoComplete="off"
                                                            {...field}
                                                            {...register(`userLinks.${index}.link`, {
                                                                required: "Link is required",
                                                                // pattern: {
                                                                //     value: /\S+@\S+\.\S+/,
                                                                //     message: "Invalid email address",
                                                                // },
                                                            })}
                                                        />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {errors?.userLinks?.[index]?.link ? (
                                                            <span className="font-medium text-xs mt-0" key={'link'}>
                                                                {errors?.userLinks?.[index]?.link?.message ?? "Required"}
                                                            </span>
                                                        )
                                                            :
                                                            null
                                                        }
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-end'>
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

export default LinkPage;
