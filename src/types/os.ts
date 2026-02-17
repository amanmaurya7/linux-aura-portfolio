export type FileSystemNodeType = 'file' | 'directory';

export interface FileSystemNode {
    type: FileSystemNodeType;
    name: string;
}

export interface FileNode extends FileSystemNode {
    type: 'file';
    content: string;
    component?: string; // Identifier for a React component if it's a rich app
}

export interface DirectoryNode extends FileSystemNode {
    type: 'directory';
    children: { [key: string]: FileSystemNode };
}

export type FileSystem = DirectoryNode;

export interface WindowState {
    id: string;
    title: string;
    component: string; // Component key (e.g., 'Terminal', 'Browser', 'ImageViewer')
    props?: any;
    minimized: boolean;
    maximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}
