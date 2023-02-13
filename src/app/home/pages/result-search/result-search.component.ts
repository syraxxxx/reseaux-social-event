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
    private router:Router,
    private searchService: SearchService,
    private spinner : NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.search = this.route.snapshot.paramMap.get('search');
    this.getResult();
  }

  getResult() {
    console.log("valeur de recherche : " + this.search);
    this.searchService.search(this.search).subscribe(response => {
      console.log(response);
      this.result = response;
      // setTimeout(() => {
      //   this.spinner.hide();
      // }, 500);
    })
  }

  getDetails(pub: any) {
    this.router.navigate(['/home/event', pub]);
  }


}
