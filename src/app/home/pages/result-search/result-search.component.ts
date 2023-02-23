import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../@core/services/search.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  search: any;
  result: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.search = params['search']
      this.getResult(params['search']);
    })
  }

  getResult(params: any) {
    this.searchService.search(params).subscribe(response => {
      this.result = response;
      console.log(this.result);
    })
  }

  getDetails(pub: any) {
    this.router.navigate(['/home/event', pub]);
  }

  goToUser(idUser: any) {
    this.router.navigate(['/home/profile', idUser]);
  }

}
