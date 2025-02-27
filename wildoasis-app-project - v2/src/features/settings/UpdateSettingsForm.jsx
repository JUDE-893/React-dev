import {useForm} from 'react-hook-form';
import useSettings from './useSettings';

import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';
import Input from '../../ui/Input';
import Form from '../../ui/Form';

function UpdateSettingsForm() {


  const {updateError,updatedSettings,isUpdating,mutate, isPending,data,error} = useSettings();

  if (isPending) return <Spinner />

  // function that get executed in submit
  function submitSettings(e,field) {
    data[field] !== +e.target.value && mutate({[field]: +e.target.value})
  }


  return (

    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={data.min_booking_length} name={/*...register ('min_booking_length')*/"sd"} onBlur={(e) => submitSettings(e,'min_booking_length')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating} defaultValue={data.max_booking_length} onBlur={(e) => submitSettings(e,'max_booking_length')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating} defaultValue={data.max_guest_per_booking}  onBlur={(e) => submitSettings(e,'max_gests_per_booking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={data.breakfast_price} onBlur={(e) => submitSettings(e,'breakfast_price')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
