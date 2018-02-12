import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    SystemGatewayModuleSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        SystemGatewayModuleSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        SystemGatewayModuleSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class SystemGatewayModuleSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
