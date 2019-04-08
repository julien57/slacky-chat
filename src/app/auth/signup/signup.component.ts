import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Member} from '../../models/member.model';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private memberService: MemberService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      pseudo: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const pseudo = this.signUpForm.get('pseudo').value;
    const type = 'member';

    this.authService.createNewUser(email, password).then(
        () => {
          const newUser = new User(pseudo, type);
          const newMember = new Member(pseudo, email);
          this.userService.createNewUser(newUser);
          this.memberService.createNewMember(newMember);
          this.router.navigate(['chats']);
        },
        (error) => {
          this.errorMessage = error;
        }
    );
  }
}
