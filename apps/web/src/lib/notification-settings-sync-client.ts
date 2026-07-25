import type { PersistentUserSettingsInput } from '@qyou/shared';

const STORAGE_KEY = 'sidewalk_notification_settings_v1';

export function saveLocalNotificationSettings(settings: PersistentUserSettingsInput): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}

export function getLocalNotificationSettings(): PersistentUserSettingsInput | null {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  }
  return null;
}
