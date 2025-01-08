import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private loggedInSubscription: Subscription | null = null;
  isLoggedIn : boolean = false;
  username : string | null = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.loggedIn$.subscribe((loggedIn : boolean) => {
        this.isLoggedIn = loggedIn;
        this.username = loggedIn ? localStorage.getItem('user') || '' : '';
      })
  }

  logout() : void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if(this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
