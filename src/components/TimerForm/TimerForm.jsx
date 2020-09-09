import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

import { 
  Row, 
  Button, 
  BaseForm, 
  FormLabel, 
  FormControl, 
  InputField 
} from '../styled';
import { TimerServiceContext } from '../../services/timer-service';

export const TimerForm = () => {
  const [name, setName] = useState('New timer');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const { addTimer } = useContext(TimerServiceContext);

  const submitHandle = (e) => {
    e.preventDefault();

    const hoursToSec = hours * 60 * 60;
    const minutesToSec = minutes * 60;
    const endtime = moment().seconds(hoursToSec + minutesToSec).valueOf();

    const newTimer = {
      id: uuidv4(),
      name,
      endtime
    };
    
    console.log(newTimer);
    addTimer(newTimer);
  };

  const onMinutesChange = (e) => {
    const val = e.target.value;
    setMinutes(val);

    if (+val === 60) {
      setHours((state) => +state + 1);
      setMinutes(0);
    }
  };

  return (
    <BaseForm onSubmit={submitHandle}>
      <FormControl>
        <FormLabel>
          Timer name
        </FormLabel>
        <InputField 
          type="text" 
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
      <Row justify="space-between">
        <FormControl>
          <FormLabel>
            Hours
          </FormLabel>
          <InputField 
            type="number" 
            w="150px"
            min="0"
            max="12"
            onChange={(e) => setHours(e.target.value)}
            value={hours}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Minutes
          </FormLabel>
          <InputField 
            type="number" 
            w="150px"
            min="0"
            max="60"
            onChange={onMinutesChange}
            value={minutes}
          />
        </FormControl>
      </Row>
      <Row
        mt="15px"
        justify="flex-end"
      >
        <Button 
          minheight="40px"
        >Create timer</Button>
      </Row>
    </BaseForm>
  );
};