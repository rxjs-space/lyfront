import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-metadata',
  templateUrl: './details-metadata.component.html',
  styleUrls: ['./details-metadata.component.scss']
})
export class DetailsMetadataComponent implements OnInit {
  createdAt;
  modifiedAt;
  @Input() metadata: any;
  constructor() { }

  ngOnInit() {
    this.createdAt = new Date(this.metadata.createdAt);
    this.modifiedAt = new Date(this.metadata.modifiedAt);
  }

}
