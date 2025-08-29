// Google Apps Script API integration
// This file contains the frontend integration for Google Apps Script backend

const GAS_API_BASE_URL = 'https://script.google.com/macros/s/AKfycbx-FZAW7XYpWlxdrC489bzi6lxG3npiXLZMuDZCGXF4YeOXWDK-c1sT1-rCfVt-XQq11w/exec'; // Replace with your actual GAS web app URL

export interface UploadData {
  file: File;
  uploaderName: string;
  category: string;
  tags: string[];
  title: string;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  url: string;
  thumbnailUrl: string;
  uploadDate: string;
  category: string;
  tags: string[];
  uploaderName: string;
}

export class GoogleAppsScriptAPI {
  /**
   * Fetch all media items from Google Drive via Google Apps Script
   */
  static async fetchMediaItems(): Promise<MediaItem[]> {
    try {
      const response = await fetch(`${GAS_API_BASE_URL}?action=getMedia`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching media items:', error);
      return [];
    }
  }

  /**
   * Upload file to Google Drive via Google Apps Script
   */
  static async uploadFile(uploadData: UploadData, onProgress?: (progress: number) => void): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('file', uploadData.file);
      formData.append('uploaderName', uploadData.uploaderName);
      formData.append('category', uploadData.category);
      formData.append('tags', JSON.stringify(uploadData.tags));
      formData.append('title', uploadData.title);
      formData.append('action', 'uploadFile');

      // For progress tracking, we'll need to use XMLHttpRequest
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable && onProgress) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response.success);
            } catch (error) {
              reject(new Error('Invalid response format'));
            }
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', GAS_API_BASE_URL);
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  }

  /**
   * Delete media item from Google Drive via Google Apps Script
   */
  static async deleteMediaItem(itemId: string): Promise<boolean> {
    try {
      const response = await fetch(`${GAS_API_BASE_URL}?action=deleteMedia&id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting media item:', error);
      return false;
    }
  }
}

// Example Google Apps Script code for backend (Code.gs):
/*
function doGet(e) {
  const action = e.parameter.action;
  
  switch(action) {
    case 'getMedia':
      return ContentService
        .createTextOutput(JSON.stringify(getMediaItems()))
        .setMimeType(ContentService.MimeType.JSON);
    
    default:
      return ContentService
        .createTextOutput(JSON.stringify({error: 'Invalid action'}))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'uploadFile') {
      const file = e.parameter.file;
      const uploaderName = e.parameter.uploaderName;
      const category = e.parameter.category;
      const tags = JSON.parse(e.parameter.tags);
      const title = e.parameter.title;
      
      const result = uploadToGoogleDrive(file, uploaderName, category, tags, title);
      
      return ContentService
        .createTextOutput(JSON.stringify({success: result}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Invalid action'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getMediaItems() {
  // Implementation to fetch files from Google Drive
  const folder = DriveApp.getFolderById('YOUR_GOOGLE_DRIVE_FOLDER_ID');
  const files = folder.getFiles();
  const items = [];
  
  while (files.hasNext()) {
    const file = files.next();
    items.push({
      id: file.getId(),
      type: file.getContentType().startsWith('image/') ? 'photo' : 'video',
      title: file.getName(),
      url: `https://drive.google.com/uc?id=${file.getId()}`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.getId()}`,
      uploadDate: file.getDateCreated().toISOString(),
      category: 'events', // You can store this in file description or properties
      tags: [], // You can store this in file description or properties
      uploaderName: 'Unknown' // You can store this in file description or properties
    });
  }
  
  return {items: items};
}

function uploadToGoogleDrive(fileBlob, uploaderName, category, tags, title) {
  try {
    const folder = DriveApp.getFolderById('YOUR_GOOGLE_DRIVE_FOLDER_ID');
    const file = folder.createFile(fileBlob);
    file.setName(title);
    file.setDescription(JSON.stringify({
      uploaderName: uploaderName,
      category: category,
      tags: tags
    }));
    
    return true;
  } catch (error) {
    console.error('Upload error:', error);
    return false;
  }
}
*/
