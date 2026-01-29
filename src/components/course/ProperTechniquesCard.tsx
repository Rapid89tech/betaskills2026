
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Shield
} from 'lucide-react';

interface Technique {
  title: string;
  description: string;
  important?: boolean;
}

interface ProperTechniquesCardProps {
  title: string;
  techniques: Technique[];
  category?: 'safety' | 'technique' | 'important';
}

const ProperTechniquesCard = ({ title, techniques, category = 'technique' }: ProperTechniquesCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryIcon = () => {
    switch (category) {
      case 'safety':
        return <Shield className="h-6 w-6" />;
      case 'important':
        return <AlertTriangle className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const getCategoryColors = () => {
    switch (category) {
      case 'safety':
        return 'from-red-600 to-orange-600';
      case 'important':
        return 'from-yellow-600 to-orange-600';
      default:
        return 'from-purple-600 to-blue-600';
    }
  };

  return (
    <Card className="border-0 shadow-xl overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${getCategoryColors()} text-white cursor-pointer`} onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              {getCategoryIcon()}
            </div>
            {title}
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="space-y-4">
            {techniques.map((technique, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{technique.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{technique.description}</p>
                    {technique.important && (
                      <Badge variant="destructive" className="mt-2">
                        Critical Safety Point
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ProperTechniquesCard;
