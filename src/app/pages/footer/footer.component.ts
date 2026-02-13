import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FadeUpDirective } from "../../core/direcitve/fade-up.directive";
import { FadeLeftDirective } from "../../core/direcitve/fade-left.directive";
import { FadeRightDirective } from "../../core/direcitve/fade-right.directive";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FadeUpDirective, FadeLeftDirective, FadeRightDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
