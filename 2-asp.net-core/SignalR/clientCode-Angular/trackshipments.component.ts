import { Component } from '@angular/core';
import { SignalRService } from '../Services';
//...

@Component({
  selector: 'app-trackshipments',
  templateUrl: './trackshipments.component.html',
  styleUrls: ['./trackshipments.component.scss']
})
export class TrackShipmentsComponent {
  //...
  pinnedAWBsStatusInfo: AWBStatusInfo[];
  //...
  
  constructor(http: HttpClient,
    //...
    private readonly _signalRService: SignalRService) {
  }

  ngOnInit() {
    //...
    this._signalRService.init();
    this._signalRService.messages.subscribe(message => {
      console.log(message);
      if (this.pinnedAWBsStatusInfo) {
        var userTrackedAWBStatusUpdated = this.pinnedAWBsStatusInfo.find(o => o.awbNumber === message.awbNumber);

        if (userTrackedAWBStatusUpdated) {
          userTrackedAWBStatusUpdated.status = message.status;
          this.updatedAWBStatusInfo = userTrackedAWBStatusUpdated;
        }
      }
    });
  }

