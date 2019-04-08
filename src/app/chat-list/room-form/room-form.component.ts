import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../services/room.service';
import {Router} from '@angular/router';
import {Room} from '../../models/room.model';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {

  roomForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSaveRoom() {
    const name = this.roomForm.get('name').value;
    const type = 'salon';

    const newRoom = new Room(name, type);
    this.roomService.createNewRoom(newRoom);
    this.router.navigate(['chats']);
  }
}
