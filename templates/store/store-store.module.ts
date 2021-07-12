import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/{{selector}}.reducer';
import { {{SELECTOR}}_FEATURE_NAME } from './const/feature-name.const';
import { {{Selector}}StoreEffects } from './effects/{{selector}}.effects';
import { {{Selector}}ApiService } from './services/{{selector}}-api.service';
import { {{Selector}}FacadeService } from './facade/{{selector}}.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature({{SELECTOR}}_FEATURE_NAME, reducer),
    EffectsModule.forFeature([{{Selector}}StoreEffects]),
  ],
  providers: [{{Selector}}ApiService, {{Selector}}FacadeService],
})
export class {{Selector}}StoreModule {}
