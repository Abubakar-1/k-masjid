export interface PrayerTime {
  id: string;
  name: string;
  adhan: string;
  iqamah: string;
}

export interface PrayerTimes {
  fajr: PrayerTime;
  dhuhr: PrayerTime;
  asr: PrayerTime;
  maghrib: PrayerTime;
  isha: PrayerTime;
}
