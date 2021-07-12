import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { ConfiguratorBaseComponent } from "ngpd-merceros-ui-widget-core";

import { Config } from "../interfaces/config";

@Component({
  selector: "{{selector}}-configurator",
  templateUrl: "./configurator.component.html",
  styleUrls: ["./configurator.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorComponent extends ConfiguratorBaseComponent<Config> {}
