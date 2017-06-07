import { InjectionToken } from '@angular/core';

export interface AppConfig {
  backEndUrl: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG_VALUE: AppConfig = {
  backEndUrl: 'http://localhost:3001'
  // backEndUrl: 'https://longyunback.herokuapp.com'
};


export const BACK_END_URL = new InjectionToken<string>('backEndUrl');
export const BACK_END_URL_VALUE = 'http://localhost:3001';
