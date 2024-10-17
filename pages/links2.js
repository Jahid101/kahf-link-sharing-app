import CardContent from '@/components/customUI/CardContent';
import PageTitle from '@/components/customUI/PageTitle';
import VerticalDnd from '@/components/dnd/VerticalDnd';
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
        watch,
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
                <CardContent className="mb-7 py-7">

                    <VerticalDnd />

                    <PageTitle title="Customize your links" className="mb-2" />
                    <p className='text-sm'>Add/edit/remove links below and then share all your profiles with the world!</p>

                    
                </CardContent>
            </div>
        </Layout >
    );
};

export default LinkPage;
