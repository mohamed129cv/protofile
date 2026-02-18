import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta ) { }

  updateMate(description: string, title: string , keywords :string) {
    this.meta.updateTag({ name: 'description', content: description })
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({
      name: 'keywords',
      content: keywords
    })
  }

}
