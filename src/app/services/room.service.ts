import {Room} from '../models/room.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

export class RoomService {

    rooms: Room[] = [];
    roomsSubject = new Subject<Room[]>();

    constructor() {
        this.getRooms();
    }

    emitRooms() {
        this.roomsSubject.next(this.rooms);
    }

    saveRooms() {
        firebase.database().ref('/rooms').set(this.rooms);
    }

    getRooms() {
        firebase.database().ref('/rooms')
            .on('value', (data: DataSnapshot) => {
                this.rooms = data.val() ? data.val() : [];
                this.emitRooms();
            })
        ;
    }

    getSingleRoom(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/rooms/' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    createNewRoom(newRoom: Room) {
        this.rooms.push(newRoom);
        this.saveRooms();
        this.emitRooms();
    }
}
