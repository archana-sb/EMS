import { InjectionToken } from "@angular/core";
import { IEventService } from "../events/events-services.interface";
import { ILoading } from "./loading.service";


export const EVENT_API_URL = new InjectionToken<string>('EVENT_API_URL');
export const Event_Service_Token = new InjectionToken<IEventService>('IEventService');
// export const Toast_Token = new InjectionToken<>('ToastService');
export const Loading_Service_Token = new InjectionToken<ILoading>('ILoading')
