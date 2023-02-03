import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-messages',
  templateUrl: './detail-messages.component.html',
  styleUrls: ['./detail-messages.component.scss']
})
export class DetailMessagesComponent implements OnInit {
  @Input() USER_CONNECTED :any;

  constructor() { }

  ngOnInit(): void {
  }

}
