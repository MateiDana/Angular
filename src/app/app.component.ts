import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface NamedItem {
  id: number;
  name: string;
}

interface SuperPower extends NamedItem {}

interface Weapon extends NamedItem {
  description: string;
}

interface Hero extends NamedItem {
  realName?: string;
  superPowers?: SuperPower[];
  weapons?: Weapon[];
}

// THE Controller
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
  applicationTitle = 'Title from AppComponent';
  isEditing: boolean = false;
  heroToBeEdited: Hero | null = null;

  heroes: Hero[] = [
    {
      name: 'Hero 1',
      id: 11,
    },
    {
      name: 'Not so much of a Hero 2',
      id: 12,
      realName: 'Boris Johnson',
    },
    {
      name: 'Hero 3',
      id: 13,
    },
  ];

  editHeroForm: FormGroup;

  constructor() {
    this.editHeroForm = new FormGroup({
      heroName: new FormControl(null, Validators.required),
      heroRealName: new FormControl(null),
    });
  }

  addNewHero() {
    const lastEntry = this.heroes.at(-1)!;
    const [_, heroNumber] = lastEntry.name.split(' ');
    const newHero = {
      id: lastEntry?.id + 1,
      name: `Hero ${Number(heroNumber) + 1}`,
    };

    this.heroes.push(newHero);
  }

  deleteHero(heroToBeDeleted: Hero): void {
    console.log('hero to be deleted: ', heroToBeDeleted);
    console.log(this.heroes.includes(heroToBeDeleted));

    this.heroes.splice(this.heroes.indexOf(heroToBeDeleted), 1);

    // this.heroes = this.heroes.filter((hero) => hero !== heroToBeDeleted);
  }

  editHero(hero: Hero): void {
    console.log('hero to be edited: ', hero);
    this.isEditing = true;
    this.heroToBeEdited = hero;
    this.editHeroForm.setValue({
      heroName: hero.name,
      heroRealName: hero.realName || '',
    });

    console.log(this.editHeroForm);
  }

  // updateHero(heroToBeUpdated: Hero): void {
  //   heroToBeUpdated.name = `${heroToBeUpdated.name}--UPDATED`;
  // }

  updateHero(e: MouseEvent): void {
    console.log(this.editHeroForm.value);
    const { heroName: name, heroRealName: realName } = this.editHeroForm.value;

    this.heroToBeEdited!.name = name;
    this.heroToBeEdited!.realName = realName;
    this.heroToBeEdited = null;
  }

  cancelEditAction(): void {
    this.heroToBeEdited = null;
    this.editHeroForm.reset();
  }

  nameToUppercase(name: string): void {
    name.toUpperCase();
  }
}
