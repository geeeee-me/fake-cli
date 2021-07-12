import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MercerOSModule } from 'merceros-ui-components';
import { BrighterModule } from 'merceros-ui-components/experimental-brighter';
import { DYNAMIC_COMPONENT_NAME, DynamicComponentLoaderModule, MasonModule } from 'ngpd-merceros-ui-widget-core';

import { WidgetComponent } from './widget.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicComponentLoaderModule.forChild(WidgetComponent),
    BrighterModule,
    MercerOSModule,
    MasonModule,
  ],
  providers: [
    {
      provide: DYNAMIC_COMPONENT_NAME,
      useValue: WidgetComponent,
    },
  ],
  declarations: [WidgetComponent],
  entryComponents: [WidgetComponent],
})
export class WidgetModule {}
