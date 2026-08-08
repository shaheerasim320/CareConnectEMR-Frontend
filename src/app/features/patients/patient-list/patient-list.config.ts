import { PatientStats } from "../models";


export const STAT_CONFIG: Record<keyof PatientStats, { label: string; icon: string }> = {
  totalPatients: { label: 'Total patients', icon: 'ti-users' },
  registeredToday: { label: 'Registered today', icon: 'ti-user-plus' },
  incompleteRecords: { label: 'Incomplete records', icon: 'ti-alert-triangle' },
  patientsWaiting: { label: 'Patients waiting', icon: 'ti-clock' },
  seenToday: { label: 'Seen today', icon: 'ti-user-check' },
  followUpsDue: { label: 'Follow-ups due', icon: 'ti-calendar-exclamation' },
}