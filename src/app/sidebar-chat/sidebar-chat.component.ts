import {Component, OnDestroy, OnInit} from '@angular/core';
import {Room} from '../models/room.model';
import {Subscription} from 'rxjs';
import {RoomService} from '../services/room.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss']
})
export class SidebarChatComponent implements OnInit, OnDestroy {

  rooms: Room[];
  roomSubscription: Subscription;

  isActive: number;

  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.roomSubscription = this.roomService.roomsSubject.subscribe(
        (rooms: Room[]) => {
          this.rooms = rooms;
        }
    );
    this.roomService.emitRooms();

    this.isActive = this.route.snapshot.params['id'];
  }

  onNewRoom() {
    this.router.navigate(['nouveau-salon']);
  }

  onViewRoom(id: number) {
    this.router.navigate(['chat', id]);
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }

  getColor(id: number) {

    if (this.isActive === id) {
      return 'red';
    }
  }
}
