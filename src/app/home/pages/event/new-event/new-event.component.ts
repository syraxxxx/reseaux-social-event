import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";
import {PublicationService} from "../../../../@core/services/publication.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  user_connected: any;
  categories: any;
  formNewEvent = new FormGroup({
    utilisateur_id: new FormControl(''),
    categories_id: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    payement_link: new FormControl('', [Validators.required]),
    event_name: new FormControl('', [Validators.required]),
    date_realisation: new FormControl('', [Validators.required]),
    lieu: new FormControl(''),
  });

  constructor(
    private userService: UtilisateurService,
    private eventService: PublicationService,
    private router: Router,
    private spinner : NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.userService.getUserByToken().subscribe(res => {
      this.user_connected = res.user[0];
    });
    this.eventService.getCategories().subscribe(response => {
      this.categories = response.likes;
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  create_event() {
    this.formNewEvent.get('utilisateur_id')?.setValue(this.user_connected.id);
    this.eventService.create(this.formNewEvent.value).subscribe({
      next(res: any) {

      },
      error(err: any) {
      }
    });
    Swal.fire({
      text: `Votre évènement a été crée avec succès`, icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(r => 'nothing');
    this.formNewEvent.reset();
  }
}
