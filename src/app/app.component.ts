import { Component, OnInit } from '@angular/core'
import { MagloftService } from './services/MagloftService'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hpub2-example'

  constructor(public magloft: MagloftService) {}
}
