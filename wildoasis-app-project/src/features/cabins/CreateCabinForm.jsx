import toast from 'react-hot-toast';
import {useQueryClient,useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {createCabin} from '../../services/apiCabins';
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from './FormRow';



function CreateCabinForm() {

  // initialisating the register (update the value of entries each)  and the handleSubmit (stores and pass the form data to the function handler) functions
  const {handleSubmit, register,formState:{errors},getValues,reset} = useForm();

  // getting the query client
  const queryClient = useQueryClient();

  const {error,isPending,mutate} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin has been created Successfully');
      queryClient.invalidateQueries({queryKey: ['cabins']});
      reset()
    } ,
    onError: (errs) => toast.error(/*'Oops! Somthing went wrong.. try again.'*/errs.meassage),
  })


  // function handler : validate & submit the data to the server
  const submitCabin = (data) => {
    data = {...data, image: data.image[0]};
    console.log('d',data);
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(submitCabin,() =>{return null})}>
      <FormRow message={errors?.name?.message} label='Cabin Name'>
          <Input type="text" id="name" {...register('name',{
            required: 'The name field is required!'
          })}/>
      </FormRow>

      <FormRow message={errors?.max_capacity?.message} label='Max Capacity'>
        <Input type="number" id="maxCapacity" {...register('max_capacity',{required: 'the capacity field is required!' })} />
      </FormRow>

      <FormRow message={errors?.regular_price?.message} label='Regular Price'>
        <Input type="number" id="regularPrice"  {...register('regular_price',{
          required:'the price field is required!',
          min: {value:1,message:'the the regular price must be greater than 0£'}
        })}/>
      </FormRow>

      <FormRow message={errors?.discount?.message} label='Discount'>
        <Input type="number" id="discount" defaultValue={0}  {...register('discount',{
          min: {value:0,message:'the discount must be a positive amount!'},
          validate: v => v <= getValues().regular_price || "the discount must be less than the price"}
        )} />
      </FormRow>

      <FormRow message={errors?.description?.message} label='description'>
        <Textarea type="number" id="description" defaultValue=""  {...register('description')}/>
      </FormRow>

      <FormRow message={errors?.image?.message} label='Cabin Name'>
        <FileInput type='file' id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button size='medium' variation="secondary" type="reset">
          Cancel
        </Button>
        <Button size='medium' variation='primary' type="submit">Create cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
