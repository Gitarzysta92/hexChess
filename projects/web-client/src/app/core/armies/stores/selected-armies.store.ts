import { Injectable } from '@angular/core';
import { ArmiesNotificationsFactory } from '../services/notifications.factory';
import { SelectedArmy } from './actions/actions';
import { SelectedArmiesService } from '../services/selected-armies.service';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { forkJoin, map, Observable } from 'rxjs';
import { IArmyAssignmentDto } from '../models/army-assignment.dto';

export const selectedArmiesStore = Symbol('selected-armies-store');

@Injectable({ providedIn: 'root'})
export class SelectedArmiesStore {

  public get state() { return this._collection.state };
  public get currentState() { return this._collection.currentState; }

  private _collection: Store<IArmyAssignmentDto[]>;

  constructor(
    private readonly _store: StoreService,
    private readonly _selectedArmiesService: SelectedArmiesService,
    private readonly _configurationService: ConfigurationService,
    private readonly _notificationsFactory: ArmiesNotificationsFactory
  ) {
    this._registerStore();
  }

  public setSelectedArmy(sa: IArmyAssignmentDto): void {
    this._collection.dispatch(SelectedArmy.setSelectedArmy, sa);
  }

  public remove(sa: IArmyAssignmentDto): void {
    this._collection.dispatch(SelectedArmy.removeSelectedArmy, sa);
  }


  private _registerStore(): void {
    this._collection = this._store.createStore<IArmyAssignmentDto[]>(selectedArmiesStore, {
      initialState: this._selectedArmiesService.getMyArmies(),
      actions: { 
        [SelectedArmy.setSelectedArmy]: {
          before: [ (payload, state) => this._validateSelectionLimit(payload, state) ],
          action: this._setAssignedArmy,
          after: [ 
            // (_, state) => this._selectedArmiesService.setSelectedArmies(state)
            //   .pipe(tap({ error: () => this._store.dispatch(NotificationsActions.notifyHttpConnectionError) })),
            // () => this._commandBus.dispatch(NotificationsActions.add,
            //   this._notificationsFactory.createSuccessNotification(this._collection.prevState, this._collection.currentState))
          ],
        },
        [SelectedArmy.removeSelectedArmy]: {
          action: this._remove,
          after: [ 
            // (p, state) => this._selectedArmiesService.setSelectedArmies(state)
            //   .pipe(tap({ error: () => this._commandBus.dispatch(NotificationsActions.notifyHttpConnectionError) })),
            // (p, state) => this._commandBus.dispatch(NotificationsActions.add, 
            //   this._notificationsFactory.createSuccessNotification(this._collection.prevState, this._collection.currentState))
          ]
        }
      }
    });
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
}


