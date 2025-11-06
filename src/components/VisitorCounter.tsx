import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye } from "lucide-react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetchCount = async () => {
      try {
        // Call the database function to increment the count
        const { data, error } = await supabase.rpc('increment_visitor_count');
        
        if (error) {
          console.error('Error incrementing visitor count:', error);
          // Fallback: just fetch the current count
          const { data: statsData, error: fetchError } = await supabase
            .from('site_stats')
            .select('visitor_count')
            .single();
          
          if (!fetchError && statsData) {
            setVisitorCount(statsData.visitor_count);
          }
        } else {
          setVisitorCount(data);
        }
      } catch (error) {
        console.error('Error with visitor counter:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementAndFetchCount();
  }, []);

  if (loading || visitorCount === null) {
    return null;
  }

  return (
    <div className="fixed top-20 right-8 z-40 flex items-center gap-2 px-4 py-2 bg-background/30 backdrop-blur-md border border-foreground/20 rounded-lg">
      <Eye className="h-4 w-4 text-foreground/70" />
      <span className="text-sm font-medium text-foreground/70">
        {visitorCount.toLocaleString()} {visitorCount === 1 ? 'visitor' : 'visitors'}
      </span>
    </div>
  );
};

export default VisitorCounter;
