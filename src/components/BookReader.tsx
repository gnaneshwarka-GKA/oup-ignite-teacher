import { useState } from "react";
import { ChevronLeft, ChevronRight, X, FileText, Video, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResourceViewer from "./ResourceViewer";

interface BookReaderProps {
  subject: string;
  onClose: () => void;
}

const mockPages = [
  {
    id: 1,
    title: "Introduction",
    content: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men.

Most of the confidences were unsought — frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions.`,
    annotations: [
      { id: 'a1', type: 'video', title: 'Introduction to Chapter 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 280 },
      { id: 'a2', type: 'pdf', title: 'Reference Material', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', position: 520 },
      { id: 'a3', type: 'video', title: 'Detailed Explanation', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 780 },
    ],
    resources: [
      { id: 1, type: "video", title: "Introduction Video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: 2, type: "pdf", title: "Chapter Overview", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
  {
    id: 2,
    title: "Core Concepts",
    content: `Let's explore the fundamental concepts of this subject. Understanding the core principles is essential for mastering this field.

The foundation of knowledge begins with understanding basic terminology and concepts. Each concept builds upon the previous one, creating a comprehensive framework for learning.

As we delve deeper into the subject matter, you'll discover how these concepts interconnect and support one another. This interconnected web of knowledge forms the basis of expertise in this domain.

Practice and application are key to truly grasping these concepts. Theory alone is insufficient; you must engage with the material actively to develop true understanding and competence.`,
    annotations: [
      { id: 'a4', type: 'pdf', title: 'Core Concepts Guide', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', position: 180 },
      { id: 'a5', type: 'video', title: 'Visual Learning Aid', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 360 },
    ],
    resources: [
      { id: 3, type: "video", title: "Core Concepts Explained", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  {
    id: 3,
    title: "Advanced Topics",
    content: `Dive deeper into advanced topics and applications. This chapter explores sophisticated concepts that build upon your foundational knowledge.

Advanced learners will find these topics particularly engaging as they push the boundaries of conventional understanding. The complexity increases, but so does the reward of mastery.

Real-world applications of these advanced concepts demonstrate their practical value. You'll see how theory translates into practice in professional settings.

Critical thinking and analysis become paramount at this level. You're encouraged to question, explore, and develop your own insights as you progress through this material.`,
    annotations: [
      { id: 'a6', type: 'video', title: 'Advanced Tutorial', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 200 },
      { id: 'a7', type: 'pdf', title: 'Advanced Reading Material', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', position: 450 },
      { id: 'a8', type: 'video', title: 'Case Study Examples', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 650 },
    ],
    resources: [
      { id: 4, type: "pdf", title: "Advanced Reading", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
];

const classes = [
  { id: "6", name: "Class 6" },
  { id: "7", name: "Class 7" },
  { id: "8", name: "Class 8" },
  { id: "9", name: "Class 9" },
  { id: "10", name: "Class 10" },
];

const chapters = [
  { id: 1, name: "Locating Places on the Earth" },
  { id: 2, name: "Oceans and Continents" },
  { id: 3, name: "Landforms and Life" },
];

const mockWorksheets = [
  { id: 1, title: "Worksheet 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Worksheet 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 3, title: "Worksheet 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 4, title: "Worksheet 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 5, title: "Worksheet 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
];

const mockAnswerKeys = [
  { id: 1, title: "Answer Key 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Answer Key 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 3, title: "Answer Key 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 4, title: "Answer Key 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 5, title: "Answer Key 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
];

const mockLessonPlans = [
  { id: 1, title: "Week 1 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Week 2 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 3, title: "Week 3 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 4, title: "Week 4 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
];

const mockAssessments = [
  { id: 1, title: "Chapter 1 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Chapter 2 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 3, title: "Chapter 3 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
  { id: 4, title: "Mid-term Assessment", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
];

const BookReader = ({ subject, onClose }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showResources, setShowResources] = useState(false);
  const [showLessonPlans, setShowLessonPlans] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  

  const page = mockPages[currentPage];

  // Filter resources based on selected chapter
  const filteredResources = selectedChapter === "all" 
    ? page.resources 
    : page.resources.filter(r => r.id === parseInt(selectedChapter));

  // Filter lesson plans based on selected chapter
  const filteredLessonPlans = selectedChapter === "all"
    ? mockLessonPlans
    : mockLessonPlans.filter(plan => plan.chapterId === parseInt(selectedChapter));

  // Filter assessments based on selected chapter
  const filteredAssessments = selectedChapter === "all"
    ? mockAssessments
    : mockAssessments.filter(assessment => assessment.chapterId === parseInt(selectedChapter));

  // Function to render content with annotations
  const renderContentWithAnnotations = () => {
    const content = page.content;
    const annotations = page.annotations || [];
    
    if (annotations.length === 0) {
      return <div className="text-foreground leading-relaxed whitespace-pre-line text-justify">{content}</div>;
    }

    // Sort annotations by position
    const sortedAnnotations = [...annotations].sort((a, b) => a.position - b.position);
    
    const parts = [];
    let lastIndex = 0;

    sortedAnnotations.forEach((annotation, idx) => {
      // Add text before annotation
      parts.push(
        <span key={`text-${idx}`}>
          {content.substring(lastIndex, annotation.position)}
        </span>
      );

      // Add annotation icon
      parts.push(
        <button
          key={`annotation-${annotation.id}`}
          onClick={() => setSelectedResource(annotation)}
          className="inline-flex items-center justify-center w-6 h-6 mx-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group relative"
          title={annotation.title}
        >
          {annotation.type === 'video' ? (
            <Video className="w-3.5 h-3.5 text-primary" />
          ) : (
            <FileText className="w-3.5 h-3.5 text-secondary" />
          )}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            {annotation.title}
          </span>
        </button>
      );

      lastIndex = annotation.position;
    });

    // Add remaining text
    parts.push(
      <span key="text-end">
        {content.substring(lastIndex)}
      </span>
    );

    return <div className="text-foreground leading-relaxed text-justify">{parts}</div>;
  };

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
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {subject} - Book
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedChapter} onValueChange={setSelectedChapter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chapter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id.toString()}>
                  Ch{chapter.id}: {chapter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowResources(!showResources);
              setShowLessonPlans(false);
            }}
            className="flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            Learning Resources
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowLessonPlans(!showLessonPlans);
              setShowResources(false);
            }}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Lesson Plans & Assessments
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentPage + 1} / {mockPages.length}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content - Book View */}
        <div className="flex-1 overflow-y-auto bg-muted/30">
          <div className="max-w-5xl mx-auto p-12">
            {/* Book Page Container */}
            <div className="bg-card shadow-2xl rounded-lg min-h-[600px] p-12 border border-border">
              {/* Chapter and Title */}
              <div className="flex items-start gap-8 mb-8">
                <div className="flex-shrink-0 w-48 border-2 border-primary/20 p-6 rounded-lg bg-primary/5">
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    Chapter
                  </h3>
                  <div className="text-6xl font-bold text-primary">
                    {currentPage + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2">
                    {page.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {renderContentWithAnnotations()}
              </div>

              {/* Page Number */}
              <div className="mt-12 pt-6 border-t border-border flex justify-center">
                <span className="text-sm text-muted-foreground font-medium">
                  {currentPage + 1}/{mockPages.length}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                size="lg"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Page
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage(Math.min(mockPages.length - 1, currentPage + 1))
                }
                disabled={currentPage === mockPages.length - 1}
                size="lg"
                className="flex items-center gap-2"
              >
                Next Page
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Learning Resources */}
        {showResources && (
          <div className="w-96 bg-card border-l border-border overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Learning Resources</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowResources(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Filter by Type
                </label>
                <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Chapters</SelectItem>
                    <SelectItem value="1">Chapter 1</SelectItem>
                    <SelectItem value="2">Chapter 2</SelectItem>
                    <SelectItem value="3">Chapter 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                {filteredResources.map((resource) => (
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
                        <p className="font-medium text-foreground text-sm">
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
          </div>
        )}

        {/* Right Panel - Lesson Plans & Assessments */}
        {showLessonPlans && (
          <div className="w-96 bg-card border-l border-border overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Resources</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLessonPlans(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Tabs defaultValue="worksheets">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
                  <TabsTrigger value="answer-keys">Answer Keys</TabsTrigger>
                </TabsList>

                <TabsContent value="worksheets" className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {chapters.map((chapter) => {
                      const chapterWorksheets = mockWorksheets.filter(
                        (w) => w.chapterId === chapter.id
                      );
                      return (
                        <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                          <AccordionTrigger className="text-sm hover:no-underline">
                            Ch{chapter.id}: {chapter.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-4">
                              {chapterWorksheets.map((worksheet) => (
                                <div
                                  key={worksheet.id}
                                  onClick={() =>
                                    setSelectedResource({ ...worksheet, type: "pdf" })
                                  }
                                  className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-border"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    <p className="text-sm text-foreground">
                                      {worksheet.title}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </TabsContent>

                <TabsContent value="answer-keys" className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {chapters.map((chapter) => {
                      const chapterAnswerKeys = mockAnswerKeys.filter(
                        (a) => a.chapterId === chapter.id
                      );
                      return (
                        <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                          <AccordionTrigger className="text-sm hover:no-underline">
                            Ch{chapter.id}: {chapter.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-4">
                              {chapterAnswerKeys.map((answerKey) => (
                                <div
                                  key={answerKey.id}
                                  onClick={() =>
                                    setSelectedResource({ ...answerKey, type: "pdf" })
                                  }
                                  className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-border"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-secondary" />
                                    <p className="text-sm text-foreground">
                                      {answerKey.title}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>

      {/* Resource Viewer Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-8">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <ResourceViewer
              resource={selectedResource}
              onClose={() => setSelectedResource(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReader;
