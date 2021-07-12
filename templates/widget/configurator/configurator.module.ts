import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  DYNAMIC_COMPONENT_NAME,
  DynamicComponentLoaderModule,
} from "ngpd-merceros-ui-widget-core";

import { ConfiguratorComponent } from "./configurator.component";

@NgModule({
  imports: [
    CommonModule,
    DynamicComponentLoaderModule.forChild(ConfiguratorComponent),
  ],
  providers: [
    {
      provide: DYNAMIC_COMPONENT_NAME,
      useValue: ConfiguratorComponent,
    },
  ],
  declarations: [ConfiguratorComponent],
  entryComponents: [ConfiguratorComponent],
})
export class ConfiguratorModule {}
