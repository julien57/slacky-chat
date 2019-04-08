import { Component, OnInit } from '@angular/core';
import {Room} from '../../models/room.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {MessageService} from '../../services/message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {Message} from '../../models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.scss']
})
export class SingleChatComponent implements OnInit {

  room: Room;
  messageForm: FormGroup;

  messages: Message[];
  messageSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService, private messageService: MessageService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.room = new Room('', '');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.roomService.getSingleRoom(+id).then(
          (room: Room) => {
            this.room = room;
          }
      )

        this.messageSubscription = this.messageService.messagesSubject.subscribe(
            (messages: Message[]) => {
                let items = messages.filter(item => item.idRecipient == id);
                this.messages = items;
            }
        );
      this.messageService.emitMessages();
    });


    this.initForm();
  }

    private initForm() {
        this.messageForm = this.formBuilder.group({
            message: ['', Validators.required]
        });
    }

    onSaveMessage(event: KeyboardEvent) {
        if (event.keyCode === 13) {

            const id = this.route.snapshot.paramMap.get('id');

            const message = this.messageForm.get('message').value;
            const atDate = Date.now();
            const userMessage = firebase.auth().currentUser;
            const mailUser = userMessage.email;
            const newMessage = new Message(message, mailUser, atDate, +id);

            this.messageService.createNewMessage(newMessage);

            this.messageForm.reset();
            this.router.navigate(['chat', id]);
        }
    }
}
