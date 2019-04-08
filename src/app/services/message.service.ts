import {Subject} from 'rxjs';
import {Message} from '../models/message.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


export class MessageService {

    messages: Message[] = [];
    messagesSubject = new Subject<Message[]>();

    constructor() {
        this.getMessages();
    }

    emitMessages() {
        this.messagesSubject.next(this.messages);
    }

    saveMessages() {
        firebase.database().ref('/messages').set(this.messages);
    }

    getMessages() {
        firebase.database().ref('/messages')
            .on('value', (data: DataSnapshot) => {
                this.messages = data.val() ? data.val() : [];
                this.emitMessages();
            })
        ;
    }

    createNewMessage(newMessage: Message) {
        this.messages.push(newMessage);
        this.saveMessages();
        this.emitMessages();
    }
}
