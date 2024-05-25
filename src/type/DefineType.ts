import exp from 'node:constants';
import { Role } from './../enum/Role';
export  type Payload = {
   id:number;
   email:string;
   role:Role;
} 

export type Answer = {
   testItemId:number
   answer:string;
   }