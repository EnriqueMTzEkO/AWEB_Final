/**
 * @fileoverview Stores Input variables to draw the input on screen.
 * 
 * It also provides a variable to store the state and the event that
 * triggers the change
 * .
 */
 import { TextFieldTypes } from '@ionic/core/components';

 export interface IUserForm {
   key: number;
   state: string;
   labelText: string;
   type: TextFieldTypes | undefined;
   id: string;
   ref?: React.Ref<HTMLIonInputElement>;
   autoComplete?: boolean;
   changeEvent: any;// This is bad, I'm not fixing it doe.
   value: string;
   required: boolean;
 };
 
 export interface IUserAccessForm {
   event: React.FormEventHandler<HTMLFormElement>;
   inputs: Array<IUserForm>;
   buttonLabel: string;
 };