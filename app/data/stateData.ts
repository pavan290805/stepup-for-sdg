export type Impact = {
  schools: number;
  students: string | number;
  ngos: number;
  projects: number;
};

export const stateImpactData: Record<string, Impact> = {
  "Andhra Pradesh": { schools: 64, students: "14,100+", ngos: 10, projects: 18 },
  "Arunachal Pradesh": { schools: 9, students: "1,800+", ngos: 2, projects: 3 },
  "Assam": { schools: 41, students: "9,100+", ngos: 6, projects: 11 },
  "Bihar": { schools: 67, students: "15,800+", ngos: 8, projects: 13 },
  "Chhattisgarh": { schools: 22, students: "4,900+", ngos: 3, projects: 6 },
  "Goa": { schools: 6, students: "1,200+", ngos: 1, projects: 2 },
  "Gujarat": { schools: 55, students: "12,500+", ngos: 9, projects: 16 },
  "Haryana": { schools: 31, students: "6,900+", ngos: 5, projects: 8 },
  "Himachal Pradesh": { schools: 19, students: "4,250+", ngos: 3, projects: 5 },
  "Jammu & Kashmir": { schools: 14, students: "3,100+", ngos: 2, projects: 4 },
  "Jharkhand": { schools: 28, students: "6,100+", ngos: 4, projects: 7 },
  "Karnataka": { schools: 72, students: "16,800+", ngos: 11, projects: 20 },
  "Kerala": { schools: 48, students: "11,200+", ngos: 8, projects: 14 },
  "Madhya Pradesh": { schools: 38, students: "8,200+", ngos: 5, projects: 10 },
  "Maharashtra": { schools: 94, students: "24,500+", ngos: 18, projects: 28 },
  "Manipur": { schools: 13, students: "2,700+", ngos: 2, projects: 4 },
  "Meghalaya": { schools: 16, students: "3,400+", ngos: 2, projects: 4 },
  "Mizoram": { schools: 8, students: "1,500+", ngos: 1, projects: 2 },
  "Nagaland": { schools: 11, students: "2,300+", ngos: 1, projects: 2 },
  "Odisha": { schools: 34, students: "7,600+", ngos: 5, projects: 9 },
  "Punjab": { schools: 25, students: "5,800+", ngos: 4, projects: 7 },
  "Rajasthan": { schools: 42, students: "9,400+", ngos: 6, projects: 11 },
  "Sikkim": { schools: 5, students: "950+", ngos: 1, projects: 1 },
  "Tamil Nadu": { schools: 81, students: "19,300+", ngos: 13, projects: 22 },
  "Telangana": { schools: 58, students: "13,400+", ngos: 9, projects: 15 },
  "Tripura": { schools: 14, students: "2,900+", ngos: 2, projects: 3 },
  "Uttar Pradesh": { schools: 89, students: "22,000+", ngos: 14, projects: 25 },
  "Uttarakhand": { schools: 12, students: "2,100+", ngos: 1, projects: 3 },
  "West Bengal": { schools: 76, students: "18,200+", ngos: 12, projects: 21 }
};
