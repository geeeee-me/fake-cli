import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/dimensions.reducer';
import { DIMENSIONS_FEATURE_NAME } from './const/feature-name.const';
import { DimensionsStoreEffects } from './effects/dimensions.effects';
import { DimensionsApiService } from './services/dimensions-api.service';
import { DimensionsFacadeService } from './facade/dimensions.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(DIMENSIONS_FEATURE_NAME, reducer),
    EffectsModule.forFeature([DimensionsStoreEffects]),
  ],
  providers: [DimensionsApiService, DimensionsFacadeService],
})
export class DimensionsStoreModule {}
