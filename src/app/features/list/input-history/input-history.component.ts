import { Component, OnInit } from '@angular/core';
import { HistoryService } from '@features/service/history-service/history.service';

@Component({
  selector: 'app-input-history',
  templateUrl: './input-history.component.html',
  styleUrls: ['./input-history.component.scss'],
})
export class InputHistoryComponent implements OnInit {
  public historyList;
  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.historyService.get().subscribe((result) => {
      this.historyList = result.data;
      this.historyList.forEach((item) => {
        item.ngay_tao = new Date(item.ngay_tao * 1000).toLocaleString();
      });
    });
  }
}
