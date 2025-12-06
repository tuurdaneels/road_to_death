import { useState, useEffect, useCallback } from 'react';
import { zones, getZoneOrderForTeam } from '../data/zones';

interface TeamProgress {
  teamId: string;
  currentZoneIndex: number;
  completedCafes: string[];
  zoneOrder: number[];
}

const STORAGE_KEY_PREFIX = 'kroegentocht_team_';

function getStorageKey(teamId: string): string {
  return `${STORAGE_KEY_PREFIX}${teamId}`;
}

function saveProgress(teamId: string, progress: TeamProgress): void {
  try {
    localStorage.setItem(getStorageKey(teamId), JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

function initializeProgress(teamId: string): TeamProgress {
  const zoneOrder = getZoneOrderForTeam(teamId);
  return {
    teamId,
    currentZoneIndex: 0,
    completedCafes: [],
    zoneOrder,
  };
}

export function useTeamProgress(teamId: string) {
  const [progress, setProgress] = useState<TeamProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always start from zone 1 on page refresh
    const initial = initializeProgress(teamId);
    setProgress(initial);
    saveProgress(teamId, initial);
    setLoading(false);
  }, [teamId]);

  const markCafeComplete = useCallback((cafeId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const newCompleted = prev.completedCafes.includes(cafeId)
        ? prev.completedCafes.filter(id => id !== cafeId)
        : [...prev.completedCafes, cafeId];
      const updated = { ...prev, completedCafes: newCompleted };
      saveProgress(teamId, updated);
      return updated;
    });
  }, [teamId]);

  const moveToNextZone = useCallback(() => {
    setProgress((prev) => {
      if (!prev) return prev;
      if (prev.currentZoneIndex >= prev.zoneOrder.length - 1) {
        return prev;
      }
      const updated = {
        ...prev,
        currentZoneIndex: prev.currentZoneIndex + 1,
      };
      saveProgress(teamId, updated);
      return updated;
    });
  }, [teamId]);

  const currentZone = progress
    ? zones.find(z => z.id === progress.zoneOrder[progress.currentZoneIndex])
    : null;

  const currentZoneCafes = currentZone?.cafes.map(c => c.id) || [];
  const completedInZone = currentZoneCafes.filter(id =>
    progress?.completedCafes.includes(id)
  );
  const zoneComplete = currentZoneCafes.length > 0 &&
    currentZoneCafes.length === completedInZone.length;

  const isComplete = progress
    ? progress.currentZoneIndex >= progress.zoneOrder.length - 1
    : false;

  return {
    progress,
    loading,
    currentZone,
    zoneComplete,
    isComplete,
    markCafeComplete,
    moveToNextZone,
  };
}

