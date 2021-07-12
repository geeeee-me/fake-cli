import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { WidgetBaseComponent } from "ngpd-merceros-ui-widget-core";

import { Config } from "../interfaces/config";
import { State } from "../interfaces/state";

@Component({
  selector: "{{selector}}-widget",
  templateUrl: "./widget.component.html",
  styleUrls: ["./widget.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent
  extends WidgetBaseComponent<Config, State>
  implements OnDestroy {
  __databound = true;
  __eventEmittable = true;
}
