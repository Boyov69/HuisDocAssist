
import React, { useState } from "react";
import { FileUp, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  patientId: number;
  onUploadComplete?: (fileData: { name: string, type: string, size: number }) => void;
}

const DocumentUpload = ({ patientId, onUploadComplete }: DocumentUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "Geen bestanden geselecteerd",
        description: "Selecteer ten minste één bestand om te uploaden.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      
      files.forEach(file => {
        if (onUploadComplete) {
          onUploadComplete({
            name: file.name,
            type: file.type,
            size: file.size
          });
        }
      });
      
      toast({
        title: "Bestanden geüpload",
        description: `${files.length} bestand(en) succesvol geüpload naar patiëntdossier.`,
      });
      
      setFiles([]);
    }, 1500);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) return "📷";
    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("word") || fileType.includes("document")) return "📝";
    return "📁";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Document Upload</h3>
        {files.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-medical hover:bg-medical-accent"
            size="sm"
          >
            {uploading ? "Bezig met uploaden..." : "Uploaden"}
          </Button>
        )}
      </div>

      <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-accent/50 cursor-pointer transition-colors relative">
        <Input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          multiple
          onChange={handleFileChange}
        />
        <FileUp className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">
          Klik of sleep bestanden hierheen
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Ondersteunde formaten: PDF, JPG, PNG, DOC
        </p>
      </div>

      {files.length > 0 && (
        <Card>
          <CardContent className="p-3">
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getFileIcon(file.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;
