import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {TokenStorageService} from '../service/token-storage.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', [Validators.minLength(6), Validators.required]);
  isSubmited = false;
  matcher = new MyErrorStateMatcher();
  isRegister: string;

  // error: string;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.buildForm();
    if (localStorage.getItem('isRegister')) {
      this.isRegister = localStorage.getItem('isRegister');
      localStorage.removeItem('isRegister');
    }
    console.log(localStorage);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.onSuccess();
        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        // this.onFailed();
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  private onSuccess() {
    this.router.navigate(['control-panel']);
  }

}
