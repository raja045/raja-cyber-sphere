import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye } from "lucide-react";

const VISITOR_ID_KEY = 'visitor_unique_id';

const getOrCreateVisitorId = (): string => {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  
  return visitorId;
};

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const visitorId = getOrCreateVisitorId();
        
        // Call the database function to track unique visitor
        const { data, error } = await supabase.rpc('track_unique_visitor', {
          p_visitor_id: visitorId
        });
        
        if (error) {
          console.error('Error tracking visitor:', error);
          // Fallback: just fetch the current count
          const { data: statsData, error: fetchError } = await supabase
            .from('site_stats')
            .select('visitor_count')
            .single();
          
          if (!fetchError && statsData) {
            setVisitorCount(statsData.visitor_count);
          }
        } else if (data && typeof data === 'object' && 'visitor_count' in data) {
          setVisitorCount(data.visitor_count as number);
        }
      } catch (error) {
        console.error('Error with visitor counter:', error);
      } finally {
        setLoading(false);
      }
    };

    trackVisitor();
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
