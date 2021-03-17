import { Route } from "@angular/compiler/src/core";
import { Routes } from "@angular/router";

export abstract class AbstractModule {
  static path: string;
  static routes: Routes;
}