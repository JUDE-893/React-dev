import {useEffect} from 'react';
import {useQuery, useMutation,useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {getSettings,updateSetting} from '../../services/apiSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {

  // permanantly fetch and cach the settings data
  const {isPending,data,error} = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  });

  // set Query client
  const queryClient = useQueryClient();

  // set query mutation
  const {error:updateError,data:updatedSettings,isPending:isUpdating,mutate} = useMutation({
    mutationFn: updateSetting,
    onSuccess: () =>{toast.success('updated successfuly!');
                     queryClient.invalidateQueries({queryKey: ['settings']})
  },
    onError: (e) => toast.error(/*"Oops! can't update setting. Try again.."*/e.message)
  })

  // function that get executed in submit
  function submitSettings(e,field) {
    console.log(data[field] !== e.target.value, data[field], e.target.value );
    data[field] !== +e.target.value && mutate({[field]: +e.target.value})
  }

  console.log('vdvdfffffffffffffffffffffffffffffff');
  return (
    <>
    {!isPending ? <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={data.min_booking_length} name={/*...register ('min_booking_length')*/"sd"} onBlur={(e) => submitSettings(e,'min_booking_length')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating} defaultValue={data.max_booking_length} onBlur={(e) => submitSettings(e,'max_booking_length')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating} defaultValue={data.max_gests_per_booking}  onBlur={(e) => submitSettings(e,'max_gests_per_booking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={data.breakfast_price} onBlur={(e) => submitSettings(e,'breakfast_price')}/>
      </FormRow>
    </Form>
    :<Spinner/>}
    </>
  );
}

export default UpdateSettingsForm;
