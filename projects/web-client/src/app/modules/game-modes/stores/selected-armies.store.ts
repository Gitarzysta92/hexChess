import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Collection, ConfigurationService, StoreService } from 'src/app/core';
import { CommandBusService } from 'src/app/core/services/command-bus/command-bus.service';
import { NotificationsActions } from '../../notifications';
import { MySelectedArmy } from '../models/army';
import { ArmiesService } from '../services/armies/armies.service';
import { ArmiesNotificationsFactory } from '../services/notifications-factory/notifications.factory';


const selectedArmies = Symbol('selected-armies');
const setSelectedArmy = Symbol('setSelectedArmy');
const removeSelectedArmy = Symbol('removeSelectedArmy');


@Injectable({ providedIn: 'root'})
export class SelectedArmiesStore {
  public get state() { return this._collection.state };
  public get currentState() { return this._collection.currentState; }

  private _collection: Collection<MySelectedArmy[]>;

  constructor(
    private readonly _store: StoreService,
    private readonly _armiesService: ArmiesService,
    private readonly _commandBus: CommandBusService, 
    private readonly _configurationService: ConfigurationService,
    private readonly _notificationsFactory: ArmiesNotificationsFactory
  ) {
    this._registerStore();
  }

  public setSelectedArmy(selectedArmies: MySelectedArmy): void {
    this._collection.dispatch(setSelectedArmy, selectedArmies);
  }

  public remove(selectedArmy: MySelectedArmy): void {
    this._collection.dispatch(removeSelectedArmy, selectedArmy);
  }


  private _registerStore(): void {
    this._collection = this._store.register<MySelectedArmy[]>(selectedArmies, () => {
      return {
        initialState: this._armiesService.getMyArmies(),
        actions: { 
          [setSelectedArmy]: {
            before: [ (payload, state) => this._validateSelectionLimit(payload, state) ],
            action: this._setAssignedArmy,
            after: [ 
              (p, state) => this._armiesService.setSelectedArmies(state)
                .pipe(tap({ error: () => this._commandBus.dispatch(NotificationsActions.notifyHttpConnectionError) })),
              (p, state) => this._commandBus.dispatch(NotificationsActions.add,
                this._notificationsFactory.createSuccessNotification(this._collection.prevState, this._collection.currentState))
            ],
          },
          [removeSelectedArmy]: {
            action: this._remove,
            after: [ 
              (p, state) => this._armiesService.setSelectedArmies(state)
                .pipe(tap({ error: () => this._commandBus.dispatch(NotificationsActions.notifyHttpConnectionError) })),
              (p, state) => this._commandBus.dispatch(NotificationsActions.add, 
                this._notificationsFactory.createSuccessNotification(this._collection.prevState, this._collection.currentState))
            ]
          }
        } 
      }
    });
  }

  private _setAssignedArmy = (sa: MySelectedArmy, state: MySelectedArmy[]): MySelectedArmy[] => {    
    if (state.every(a => a.priority !== sa.priority)) {
      state = [...state, sa];
    } else {
      const index = state.indexOf(state.find(a => a.priority === sa.priority));
      state[index] = sa;
    }
  
    state.forEach((a, i) => a.priority = i + 1);
    return state;
  } 

  private _remove = (selectedArmy: MySelectedArmy, state: MySelectedArmy[]): MySelectedArmy[] => {
    return state.filter(a => a.armyId !== selectedArmy.armyId && a.priority !== selectedArmy.priority)
  }

  private _validateSelectionLimit(selectedArmies: MySelectedArmy[] | MySelectedArmy, state: MySelectedArmy[]): boolean {
    if (!selectedArmies) return;
    if (!Array.isArray(selectedArmies)) selectedArmies = [selectedArmies]
    const max = this._configurationService.selectedArmyFallbacksLimit + 1;
    return new Set(selectedArmies.concat(state).map(a => a.priority)).size <= max;
  }



}