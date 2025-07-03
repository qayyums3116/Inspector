
import React, { useState } from "react";
import { FileUp, CheckCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";

// ← pull in your AuthContext hook
import { useAuth } from "@/context/AuthContext";
interface Template {
  id: string;
  name: string;
  type: string;
  lastUsed: string;
  isDefault: boolean;
}

const Templates = () => {
  // Mock user data for DashboardHeader
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "API 570 Inspection Template",
      type: "API Standards",
      lastUsed: "2023-09-15",
      isDefault: true,
    },
    {
      id: "2",
      name: "API 653 Tank Inspection",
      type: "API Standards",
      lastUsed: "2023-08-22",
      isDefault: false,
    },
    {
      id: "3",
      name: "Custom Pre-Startup Checklist",
      type: "Custom",
      lastUsed: "2023-10-01",
      isDefault: false,
    },
    {
      id: "4",
      name: "Equipment Condition Monitoring",
      type: "Custom",
      lastUsed: "2023-07-30",
      isDefault: false,
    },
  ]);

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setTemplates(
      templates.map(template => ({
        ...template,
        isDefault: template.id === id,
      }))
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Templates</h1>
              <Button className="gap-2">
                <FileUp size={18} />
                Upload Template
              </Button>
            </div>

            {/* Templates List */}
            {templates.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow p-5"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-lg">{template.name}</h3>
                          {template.isDefault && (
                            <span className="flex items-center text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                              <CheckCircle size={12} className="mr-1" />
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{template.type}</span>
                          <span>
                            Last used: {new Date(template.lastUsed).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-auto pt-3 border-t">
                        {!template.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleSetDefault(template.id)}
                          >
                            <CheckCircle size={16} />
                            Set as Default
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash size={16} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-medium mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your first template to get started.
                  </p>
                  <Button>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Template
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Templates;
