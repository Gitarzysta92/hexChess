import { Injectable } from '@angular/core';
import { ArmiesNotificationsFactory } from '../services/notifications.factory';
import { SelectedArmy } from './actions/actions';
import { SelectedArmiesService } from '../services/selected-armies.service';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { tap } from 'rxjs';
import { IArmyAssignmentDto } from '../models/army-assignment.dto';
import { notificationsStore } from 'src/app/aspects/notifications/stores/notifications.store';
import { NotificationAction } from 'src/app/aspects/notifications/stores/actions/actions';

export const selectedArmiesStore = Symbol('selected-armies-store');

@Injectable({ providedIn: 'root'})
export class SelectedArmiesStore {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<IArmyAssignmentDto[]>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _selectedArmiesService: SelectedArmiesService,
    private readonly _configurationService: ConfigurationService,
    private readonly _notificationsFactory: ArmiesNotificationsFactory,
    private readonly _localStorageService: LocalStorageService
  ) {
    this._registerStore();
  }

  public setSelectedArmy(sa: IArmyAssignmentDto): void {
    this._store.dispatch(SelectedArmy.setSelectedArmy, sa);
  }

  public remove(sa: IArmyAssignmentDto): void {
    this._store.dispatch(SelectedArmy.removeSelectedArmy, sa);
  }

  private _registerStore(): void {
    const storeDefinition = {
      initialState: this._selectedArmiesService.getMyArmies(),
      stateStorage: this._localStorageService,
      actions: { 
        [SelectedArmy.setSelectedArmy]: {
          before: [ ctx => this._validateSelectionLimit(ctx.payload, ctx.initialState) ],
          action: ctx => this._setAssignedArmy(ctx.payload, ctx.initialState),
          after: [ 
            ctx => this._selectedArmiesService.setSelectedArmies(ctx.computedState)
              .pipe(tap({ error: () => this._notifyFailure() })),
            ctx => this._notifySuccess(ctx.initialState, ctx.computedState)
          ],
        },
        [SelectedArmy.removeSelectedArmy]: {
          action: ctx => this._remove(ctx.payload, ctx.initialState),
          after: [ 
            ctx => this._selectedArmiesService.setSelectedArmies(ctx.computedState)
              .pipe(tap({ error: () => this._notifyFailure() })),
            ctx => this._notifySuccess(ctx.initialState, ctx.computedState)
          ]
        }
      }
    }

    this._store = this._storeService.createStore<IArmyAssignmentDto[]>(selectedArmiesStore, storeDefinition);
  }

  private _setAssignedArmy = (sa: IArmyAssignmentDto, state: IArmyAssignmentDto[]): IArmyAssignmentDto[] => {    
    if (state.every(a => a.priority !== sa.priority)) {
      state = [...state, sa];
    } else {
      const index = state.indexOf(state.find(a => a.priority === sa.priority));
      state[index] = sa;
    }
  
    state.forEach((a, i) => a.priority = i + 1);
    return state;
  } 

  private _remove = (selected: IArmyAssignmentDto, state: IArmyAssignmentDto[]): IArmyAssignmentDto[] => {
    return state.filter(a => a.armyId !== selected.armyId && a.priority !== selected.priority)
  }

  private _validateSelectionLimit(selectedArmies: IArmyAssignmentDto[] | IArmyAssignmentDto, state: IArmyAssignmentDto[]): boolean {
    if (!selectedArmies) return;
    if (!Array.isArray(selectedArmies)) selectedArmies = [selectedArmies]
    const max = this._configurationService.selectedArmiesLimit + 1;
    return new Set(selectedArmies.concat(state).map(a => a.priority)).size <= max;
  }

  private async _notifySuccess(prevState: IArmyAssignmentDto[], currentState: IArmyAssignmentDto[]): Promise<void> {
    const n = await this._notificationsFactory.createSuccessNotification(prevState, currentState);
    this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, n)
  }

  private async _notifyFailure(): Promise<void> {
    const n = await this._notificationsFactory.createFailureNotification();
    this._storeService.getStore(notificationsStore).dispatch(NotificationAction.add, n);
  }
}


