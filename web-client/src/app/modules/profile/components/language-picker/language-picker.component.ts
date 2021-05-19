import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MyProfileStore } from 'src/app/core/services/profile.store';

const languages = [
  { id: 1, name: "english", flagUrl: "assets/images/uk-flag.png" },
  { id: 2, name: "polish", flagUrl: "assets/images/pl-flag.png" },
]

@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {

  @Input() selectedLanguage: number;

  private _languages: LanguageSelect[] = [];
  public languagesForView: LanguageSelect[] = [];
  public selected: Observable<LanguageSelect>;

  constructor(
    private readonly _myProfileStore: MyProfileStore
  ) { 
    this._languages = languages.map(l => new LanguageSelect(l));
    this.selected = this._myProfileStore.state
      .pipe(tap(p => this.languagesForView = this._languages.filter(l => l.id !== p.languageId)))
      .pipe(map(p => this._languages.find(l => l.id === p.languageId) || this._languages[0]))
     
  }

  ngOnInit(): void { }

  public setChoosenLanguage(lang: LanguageSelect): void {
    this._myProfileStore.update({ languageId: lang.id });
  }

}



export class LanguageSelect {
  id: number;
  name: string;
  flagUrl: string;

  constructor(data: LanguageSelect) {
    this.id = data.id;
    this.name = data.name;
    this.flagUrl = data.flagUrl;
  }
}
