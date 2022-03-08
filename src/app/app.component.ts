import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

interface Day {
  day: string;
  month: string;
  date: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private startDate: string;
  week: number; // 月週
  month: string; // 年月

  d: Day[][];

  ngOnInit(): void {
    moment.updateLocale('ja', {
      weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      weekdaysShort: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜'],
      weekdaysMin: ['日', '月', '火', '水', '木', '金', '土']
    });
    this.calendar();
    // console.log('今のunixTime', moment().unix());
    // console.log('今の日付をformat化', moment().format('YYYY/MM/DD (ddd)'));
    // console.log('１ヶ月後', moment().add(1, 'months').format('YYYY/MM/DD (ddd)'));
    // console.log('15ヶ月後は？', moment().add(15, 'months').format('YYYY/MM/DD (ddd)'));
    // console.log('今月末', moment().endOf('month').format('YYYY/MM/DD (ddd)'));    
    // console.log('来月末', moment().add(1, 'months').endOf('month').format('YYYY/MM/DD (ddd)'));
    // console.log('来月末のunixTime', moment().add(1, 'months').endOf('month').unix());

    // console.log('曜日略称をリストアップ', moment.weekdaysShort());
    // console.log('曜日をリストアップ', moment.weekdays());
    // console.log('曜日最小略称をリストアップ', moment.weekdaysMin());
    // console.log('週頭', moment().startOf('isoWeek').format('YYYY/MM/DD (dd)'));
    // console.log('週末', moment().endOf('isoWeek').format('YYYY/MM/DD (dd)'));

    // console.log('今日', moment().format('YYYY/MM/DD (ddd)'));
    // console.log('今月末', moment().endOf('month').format('YYYY/MM/DD (ddd)'));
    // console.log('今月頭', moment().startOf('month').format('YYYY/MM/DD (ddd)'));  
    // console.log('今月頭日の週頭', moment().startOf('month').startOf('isoWeek').format('YYYY/MM/DD (ddd)'));
    // console.log('文字列「05-15-2013」をフォーマット', moment('05-15-2013', 'MM-DD-YYYY').format('YYYY/MM/DD (dd)'));

  }

  calendar(month: number = 0) {
    this.month = moment().add(month, 'months').format('YYYY/MM');
    // 月頭の週頭を取得
    this.startDate = moment().add(month, 'months').startOf('month').startOf('isoWeek').format('YYYY-MM-DD'); // 計算するときのフォーマット
    //今月の月初と月末の日付を求める
    const startOfMonth = moment().add(month, 'months').startOf('month');
    const endOfMonth = moment().add(month, 'months').endOf('month');
    const _month = moment(endOfMonth).format('MM');
    // //月初と月末の年の週番号を求める
    const startOfMonthOfWeekNum = Number(moment(startOfMonth).format('WW'));
    let endOfMonthOfWeekNum = Number(moment(endOfMonth).format('WW'));
    if (_month === '12' && endOfMonthOfWeekNum === 1) endOfMonthOfWeekNum = 53;
    let WeekNum = endOfMonthOfWeekNum > startOfMonthOfWeekNum ? 
        endOfMonthOfWeekNum - startOfMonthOfWeekNum + 1: // 2月 ~ 12月
        endOfMonthOfWeekNum + 1;
    this.week = WeekNum;
    const a: Day[][] = [];
    for(let j=0; j < WeekNum; j++) {
      const b: Day[] = [];
      for(let i=0; i<7; i++) {
        const m = moment(this.startDate).add(i + 7 * j, 'days')
        b.push({
          day: m.format('D'),
          month: m.format('YYYY/MM'),
          date: m.format('YYYY/MM/DD')
        });
      }
      a.push(b);
    }
    this.d = a;
  }

  monthNumber = 0;

  lastMonth() {
    this.calendar(--this.monthNumber);
  }
  nextMonth() {
    this.calendar(++this.monthNumber);
  }
  getDate(m: string) {
    console.log(m);
  }
}
