import { toast } from "@/components/ui/use-toast";

export const clearAppCache = () => {
  try {
    console.log('Clearing application cache...');
    let itemsRemoved = 0;

    // Get all keys from localStorage
    const allKeys = Object.keys(localStorage);

    // Filter for keys related to enrollments
    const cacheKeys = allKeys.filter(key => 
      key.startsWith('enrollments') || 
      key.startsWith('user-enrollments-') ||
      key.startsWith('cached_')
    );

    // Remove each key
    cacheKeys.forEach(key => {
      localStorage.removeItem(key);
      itemsRemoved++;
    });

    toast({
      title: "Cache Cleared",
      description: `${itemsRemoved} cached item(s) have been removed. The application will now fetch fresh data.`,
    });

    console.log(`✅ Application cache cleared. Removed ${itemsRemoved} items.`);

  } catch (error) {
    console.error('Failed to clear application cache:', error);
    toast({
      title: "Error",
      description: "Failed to clear application cache.",
      variant: "destructive",
    });
  }
};
