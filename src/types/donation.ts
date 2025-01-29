export interface DonationCampaign {
  id: string;
  title: string;
  organization: string;
  isVerified: boolean;
  collected: number;
  target: number;
  daysLeft: number;
  imageUrl: string | File;
  createdAt: string;
}

export interface PrayerTime {
  id: string;
  name: string;
  adhan: string;
  iqamah: string;
}
