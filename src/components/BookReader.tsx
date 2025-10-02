import { useState } from "react";
import { ChevronLeft, ChevronRight, X, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceViewer from "./ResourceViewer";

interface BookReaderProps {
  subject: string;
  onClose: () => void;
}

const mockPages = [
  {
    id: 1,
    title: "Introduction",
    content: "Welcome to the comprehensive guide on this subject.",
    resources: [
      { id: 1, type: "video", title: "Introduction Video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: 2, type: "pdf", title: "Chapter Overview", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
  {
    id: 2,
    title: "Core Concepts",
    content: "Let's explore the fundamental concepts of this subject.",
    resources: [
      { id: 3, type: "video", title: "Core Concepts Explained", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  {
    id: 3,
    title: "Advanced Topics",
    content: "Dive deeper into advanced topics and applications.",
    resources: [
      { id: 4, type: "pdf", title: "Advanced Reading", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
];

const mockLessonPlans = [
  { id: 1, title: "Week 1 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 2, title: "Week 2 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
];

const mockAssessments = [
  { id: 1, title: "Chapter 1 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 2, title: "Mid-term Assessment", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
];

const BookReader = ({ subject, onClose }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const page = mockPages[currentPage];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-foreground">{subject} - Book</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {mockPages.length}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {page.title}
                </h3>
                <p className="text-foreground leading-relaxed mb-8">
                  {page.content}
                </p>

                {/* Resources */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Learning Resources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {page.resources.map((resource) => (
                      <Card
                        key={resource.id}
                        className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                        onClick={() => setSelectedResource(resource)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          {resource.type === "video" ? (
                            <Video className="w-5 h-5 text-primary" />
                          ) : (
                            <FileText className="w-5 h-5 text-secondary" />
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              {resource.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Click to preview
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Viewer */}
            {selectedResource && (
              <ResourceViewer
                resource={selectedResource}
                onClose={() => setSelectedResource(null)}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                variant="outline"
              >
                {rightPanelOpen ? "Hide" : "Show"} Lesson Plans & Assessments
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage(Math.min(mockPages.length - 1, currentPage + 1))
                }
                disabled={currentPage === mockPages.length - 1}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {rightPanelOpen && (
          <div className="w-80 bg-card border-l border-border overflow-y-auto p-6">
            <Tabs defaultValue="lesson-plans">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lesson-plans">Lesson Plans</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
              </TabsList>

              <TabsContent value="lesson-plans" className="space-y-3 mt-4">
                {mockLessonPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                    onClick={() =>
                      setSelectedResource({ ...plan, type: "pdf" })
                    }
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-secondary" />
                      <p className="text-sm font-medium text-foreground">
                        {plan.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="assessments" className="space-y-3 mt-4">
                {mockAssessments.map((assessment) => (
                  <Card
                    key={assessment.id}
                    className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                    onClick={() =>
                      setSelectedResource({ ...assessment, type: "pdf" })
                    }
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-secondary" />
                      <p className="text-sm font-medium text-foreground">
                        {assessment.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReader;
