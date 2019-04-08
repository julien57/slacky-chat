import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {User} from '../models/user.model';

export class UserService {

    users: User[] = [];
    usersSubject = new Subject<User[]>();

    constructor() {
        this.getUsers();
    }

    emitUsers() {
        this.usersSubject.next(this.users);
    }

    saveUsers() {
        firebase.database().ref('/rooms').set(this.users);
    }

    getUsers() {
        firebase.database().ref('/rooms')
            .on('value', (data: DataSnapshot) => {
                this.users = data.val() ? data.val() : [];
                this.emitUsers();
            })
        ;
    }

    getSingleUser(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/rooms' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    createNewUser(newUser: User) {
        this.users.push(newUser);
        this.saveUsers();
        this.emitUsers();
    }
}
