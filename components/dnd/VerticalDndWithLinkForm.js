import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { setPreviewDetails } from '@/redux/preview/previewSlice';
import { setUserDetails } from '@/redux/user/usersSlice';
import { usersAPIs } from '@/utility/api/usersApi';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../ui/custom-input';


const restrictToVerticalAxis = ({ transform }) => {
  return {
    ...transform,
    x: 0,
  };
};

function DraggableItem({ id, item, index, fields, control, register, remove, errors, watch }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={item.id}
      className='bg-gray-50 p-4 rounded-lg border pb-5'
    >
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <button {...listeners} {...attributes} className="p-2 cursor-move">
            <HiOutlineMenu className="text-gray-600" />
          </button>
          <p className='font-semibold'>Link #{index + 1}</p>
        </div>
        {fields?.length > 1 &&
          <p className='cursor-pointer'
            onClick={() => {
              remove(index)
            }}
          >Remove</p>}
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
                <SelectItem value="Portfolio">
                  <div className='flex items-center gap-1'>
                    <TbBrandGithubFilled className='w-4 h-4' />
                    Portfolio
                  </div>
                </SelectItem>
                <SelectItem value="GitHub">
                  <div className='flex items-center gap-1'>
                    <TbBrandGithubFilled className='w-4 h-4' />
                    GitHub
                  </div>
                </SelectItem>
                <SelectItem value="LinkedIn">
                  <div className='flex items-center gap-1'>
                    <FaLinkedin className='w-4 h-4' />
                    LinkedIn
                  </div>
                </SelectItem>
                <SelectItem value="YouTube">
                  <div className='flex items-center gap-1'>
                    <AiFillYoutube className='w-4 h-4' />
                    YouTube
                  </div>
                </SelectItem>
                <SelectItem value="Facebook">
                  <div className='flex items-center gap-1'>
                    <AiFillFacebook className='w-4 h-4' />
                    Facebook
                  </div>
                </SelectItem>
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
              <CustomInput
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
  );
}

export default function VerticalDndWithLinkForm() {
  const { userDetails } = useSelector((state) => state.usersSlice);
  const { previewDetails } = useSelector((state) => state.previewSlice);
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
    getValues,
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

  const watchFieldArray = useWatch({ control, name: 'userLinks' });


  useEffect(() => {
    reset({ userLinks: userDetails?.links })
  }, [])


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );


  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      const newFields = arrayMove(watchFieldArray, oldIndex, newIndex);

      newFields.forEach((field, index) => {
        update(index, field);
      });
    }
  };


  const onSubmit = async (data) => {
    // console.log('submit data ==>', data);

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



  useEffect(() => {
    if (previewDetails?.id) {
      var info = { ...previewDetails, links: watchFieldArray };
      dispatch(setPreviewDetails(info));
    }
  }, [watchFieldArray])


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fields} strategy={verticalListSortingStrategy}>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  remove={remove}
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
