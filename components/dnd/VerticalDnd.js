// components/VerticalDnd.js
import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiOutlineMenu } from 'react-icons/hi';


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
import { useFieldArray, useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

// Custom modifier for vertical axis restriction
const restrictToVerticalAxis = ({ transform }) => {
  return {
    ...transform,
    x: 0, // Restrict horizontal movement
  };
};

function DraggableItem({ id, item, index, fields, control, register, errors, watch }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-2 border mb-2 bg-white shadow-md rounded"
    >
      <button {...listeners} {...attributes} className="p-2 cursor-move">
        <HiOutlineMenu className="text-gray-600" />
      </button>

      <div key={item.id} className='bg-gray-50 p-4 rounded-lg border pb-5'>
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
                    pattern: {
                      value:
                        watch(`userLinks.${index}.platform`) == 'Portfolio' ?
                          /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/
                          :
                          watch(`userLinks.${index}.platform`) == 'GitHub' ?
                            /^(https:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9_.-]+)?(\/)?$/
                            :
                            watch(`userLinks.${index}.platform`) == 'Facebook' ?
                              /^(https:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]+(\/)?$/
                              :
                              watch(`userLinks.${index}.platform`) == 'LinkedIn' ?
                                /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+(\/)?$/
                                :
                                watch(`userLinks.${index}.platform`) == 'YouTube' ?
                                  /^(https:\/\/)?(www\.)?(youtube\.com\/(channel\/[A-Za-z0-9_-]+|c\/[A-Za-z0-9_-]+|user\/[A-Za-z0-9_-]+|watch\?v=[A-Za-z0-9_-]+(&[A-Za-z0-9_-]+=[A-Za-z0-9_-]+)*)|youtu\.be\/[A-Za-z0-9_-]+)(\/)?$/
                                  :
                                  ''
                      ,
                      message: "Invalid URL",
                    },
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
    </div>
  );
}

export default function VerticalDnd(data) {
  // console.log('initial data', data?.data);
  const [items, setItems] = useState(data?.data);
  // const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );


  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      // Use arrayMove to rearrange the fields
      const newFields = arrayMove(fields, oldIndex, newIndex);

      // Update the field array with the new order
      newFields.forEach((field, index) => {
        update(index, field);
      });
    }
  };


  // const handleDragEnd = ({ active, over }) => {
  //   console.log('object', active.id, over.id);
  //   if (active.id !== over.id) {
  //     console.log("fields ==>", fields);
  //     // setItems((items) => {
  //     //   const oldIndex = items.indexOf(active.id);
  //     //   const newIndex = items.indexOf(over.id);
  //     //   console.log('oldIndex new', oldIndex, newIndex);
  //     //   return arrayMove(items, oldIndex, newIndex);
  //     // });
  //   }
  // };




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
    console.log('submit data ==>', data);

    return

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

  console.log("fields ==>", fields);


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fields} strategy={verticalListSortingStrategy}>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              variant="outline"
              className="mt-7 font-semibold w-full py-5 mb-7"
              type="button"
              onClick={() => append(initialValue)}
            >
              <FiPlus className='mr-2 hover:text-white h-4 w-4' />
              Add new link
            </Button>

            <div className='space-y-7 px-1'>
              {fields.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  index={index}
                  fields={fields}
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                />
              ))}
            </div>

            <div className='flex justify-end mt-7'>
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
      </SortableContext>
    </DndContext>
  );
}
