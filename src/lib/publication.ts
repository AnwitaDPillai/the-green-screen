/**
 * The Green Screen - Publication Rule & Security Filter
 * 
 * Enforces editorial boundary rule:
 * 1. Entry must have status === "published"
 * 2. Must have valid publishDate <= current time
 * 3. Must have valid approvedBy and approvedAt metadata
 */

export interface PublicationEntry {
  data: {
    status: 'draft' | 'review' | 'approved' | 'published';
    publishDate: Date | string;
    approvedBy?: string;
    approvedAt?: Date | string;
    title: string;
    [key: string]: any;
  };
}

export function isPubliclyPublished<T extends PublicationEntry>(
  entry: T,
  now: Date = new Date()
): boolean {
  if (!entry || !entry.data) return false;

  const { status, publishDate, approvedBy, approvedAt } = entry.data;

  // Strict status check
  if (status !== 'published') return false;

  // Date validation
  const pubDate = new Date(publishDate);
  if (Number.isNaN(pubDate.getTime()) || pubDate > now) {
    return false;
  }

  // Approval validation
  if (!approvedBy || !approvedAt) {
    return false;
  }

  const appDate = new Date(approvedAt);
  if (Number.isNaN(appDate.getTime())) {
    return false;
  }

  return true;
}

/**
 * Filter collection entries to strictly published items sorted by publication date descending.
 */
export function getPublishedEntries<T extends PublicationEntry>(
  entries: T[],
  now: Date = new Date()
): T[] {
  return entries
    .filter((entry) => isPubliclyPublished(entry, now))
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());
}
