import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';
import { Loader2, Upload, CheckCircle2, X } from 'lucide-react';

interface ChunkedVideoUploadProps {
    onUploadSuccess: (path: string) => void;
    currentVideoPath?: string;
}

const CHUNK_SIZE = 1024 * 1024 * 2; // 2MB chunks

export default function ChunkedVideoUpload({ onUploadSuccess, currentVideoPath }: ChunkedVideoUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file.');
            return;
        }

        setFileName(file.name);
        await startUpload(file);
    };

    const startUpload = async (file: File) => {
        setUploading(true);
        setProgress(0);

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const filename = `${Date.now()}_${file.name}`;

        try {
            for (let i = 0; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);

                const formData = new FormData();
                formData.append('chunk', chunk);
                formData.append('chunkIndex', i.toString());
                formData.append('filename', filename);

                await axios.post(route('dashboard.content.video-chunk'), formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                setProgress(Math.round(((i + 1) / totalChunks) * 90)); // Save last 10% for merge
            }

            // Merge chunks
            const mergeResponse = await axios.post(route('dashboard.content.video-merge'), {
                filename,
                totalChunks
            });

            if (mergeResponse.data.success) {
                setProgress(100);
                onUploadSuccess(mergeResponse.data.path);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Video upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const reset = () => {
        setFileName(null);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-4 border-2 border-dashed rounded-xl p-6 bg-muted/30 transition-colors hover:bg-muted/50">
            {!uploading && !fileName && (
                <div className="flex flex-col items-center justify-center space-y-2 py-4 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                        <p className="font-medium text-sm">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">MP4, WebM or MOV (Large files supported)</p>
                    </div>
                </div>
            )}

            {uploading && (
                <div className="space-y-3 py-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            Uploading {fileName}...
                        </span>
                        <span className="text-muted-foreground font-mono">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-[10px] text-muted-foreground text-center italic">
                        {progress < 90 ? 'Uploading chunks...' : 'Merging file on server...'}
                    </p>
                </div>
            )}

            {!uploading && fileName && progress === 100 && (
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-3 text-sm text-green-600 font-medium">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Upload complete!</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={reset} className="h-8 w-8 p-0">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {currentVideoPath && !uploading && !fileName && (
                <div className="mt-4 pt-4 border-t space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Video</p>
                    <div className="relative aspect-[9/16] max-w-[200px] bg-black rounded-lg overflow-hidden group">
                        <video 
                            src={currentVideoPath} 
                            className="w-full h-full object-cover opacity-80" 
                            muted 
                            loop 
                            autoPlay 
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={() => fileInputRef.current?.click()}
                                className="scale-90"
                            >
                                Change Video
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
            />
        </div>
    );
}
