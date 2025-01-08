import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.logout();
  }

  logout() {
    // localStorage.removeItem("id");
    // localStorage.removeItem("user");
    // this.router.navigate(['/']);
  }
}
