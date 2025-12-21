import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle('Our Heritage - Tea of Thamizhan');
    this.metaService.updateTag({ name: 'description', content: 'Learn about our passion for tea, our sustainable sourcing practices, and the heritage that makes every cup of Tea of Thamizhan special.' });
  }
}
