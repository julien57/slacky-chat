import {Room} from '../models/room.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {Member} from '../models/member.model';

export class MemberService {

    members: Member[] = [];
    membersSubject = new Subject<Member[]>();

    constructor() {
        this.getMembers();
    }

    emitMembers() {
        this.membersSubject.next(this.members);
    }

    saveMembers() {
        firebase.database().ref('/members').set(this.members);
    }

    getMembers() {
        firebase.database().ref('/members')
            .on('value', (data: DataSnapshot) => {
                this.members = data.val() ? data.val() : [];
                this.emitMembers();
            })
        ;
    }

    getSingleMember(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/members/' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    createNewMember(newMember: Member) {
        this.members.push(newMember);
        this.saveMembers();
        this.emitMembers();
    }
}
