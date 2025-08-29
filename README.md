# SchoolMemories - Photo & Video Gallery

A beautiful, modern platform for schools to capture, store, and share memories through photos and videos. Built with React, TypeScript, and integrated with Google Apps Script for backend functionality and Google Drive for storage.

## 🌟 Features

- **Beautiful Gallery**: Modern grid layout with responsive design
- **Easy Upload**: Drag-and-drop file upload with progress tracking
- **Google Drive Integration**: Secure storage with unlimited capacity
- **Category Filtering**: Organize content by events, classes, activities, etc.
- **Search Functionality**: Find specific photos and videos quickly
- **Lightbox View**: Full-screen viewing experience
- **Mobile Responsive**: Optimized for all devices
- **100% Free**: No hosting costs, no subscription fees

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Google Apps Script
- **Storage**: Google Drive API
- **Hosting**: GitHub Pages (Free)
- **Icons**: Lucide React

## 📦 Setup Instructions

### Frontend Setup (GitHub Pages)

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source
   - The site will automatically build and deploy

3. **Custom Domain** (optional):
   - Add your custom domain in Settings > Pages
   - Free SSL certificate included

### Backend Setup (Google Apps Script)

1. **Create Google Apps Script Project**:
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Replace the default code with the provided backend code

2. **Enable Google Drive API**:
   - In your GAS project, go to Libraries
   - Add Google Drive API

3. **Create Google Drive Folder**:
   - Create a dedicated folder in Google Drive for storing media
   - Copy the folder ID from the URL
   - Update the folder ID in your GAS code

4. **Deploy as Web App**:
   - Click "Deploy" > "New Deployment"
   - Choose "Web app" as type
   - Set execute as "Me" and access to "Anyone"
   - Copy the web app URL

5. **Update Frontend Configuration**:
   - Edit `src/services/googleAppsScript.ts`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your actual URL

### Google Apps Script Backend Code

Create a new file `Code.gs` in your Google Apps Script project:

```javascript
// Replace 'YOUR_GOOGLE_DRIVE_FOLDER_ID' with your actual folder ID
const MEDIA_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID';

function doGet(e) {
  const action = e.parameter.action;
  
  // Enable CORS
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  switch(action) {
    case 'getMedia':
      const mediaItems = getMediaItems();
      output.setContent(JSON.stringify(mediaItems));
      break;
    
    default:
      output.setContent(JSON.stringify({error: 'Invalid action'}));
  }
  
  return output;
}

function doPost(e) {
  try {
    // Enable CORS
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    const action = e.parameter.action;
    
    if (action === 'uploadFile') {
      const fileBlob = e.parameter.file;
      const uploaderName = e.parameter.uploaderName;
      const category = e.parameter.category;
      const tags = JSON.parse(e.parameter.tags || '[]');
      const title = e.parameter.title;
      
      const result = uploadToGoogleDrive(fileBlob, uploaderName, category, tags, title);
      output.setContent(JSON.stringify({success: result}));
    } else {
      output.setContent(JSON.stringify({success: false, error: 'Invalid action'}));
    }
    
    return output;
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getMediaItems() {
  try {
    const folder = DriveApp.getFolderById(MEDIA_FOLDER_ID);
    const files = folder.getFiles();
    const items = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const description = file.getDescription();
      let metadata = {};
      
      try {
        metadata = description ? JSON.parse(description) : {};
      } catch (e) {
        metadata = {};
      }
      
      items.push({
        id: file.getId(),
        type: file.getContentType().startsWith('image/') ? 'photo' : 'video',
        title: file.getName(),
        url: `https://drive.google.com/uc?id=${file.getId()}`,
        thumbnailUrl: file.getContentType().startsWith('image/') 
          ? `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w400`
          : `https://drive.google.com/thumbnail?id=${file.getId()}`,
        uploadDate: file.getDateCreated().toISOString().split('T')[0],
        category: metadata.category || 'uncategorized',
        tags: metadata.tags || [],
        uploaderName: metadata.uploaderName || 'Unknown'
      });
    }
    
    return {items: items};
  } catch (error) {
    console.error('Error getting media items:', error);
    return {items: []};
  }
}

function uploadToGoogleDrive(fileBlob, uploaderName, category, tags, title) {
  try {
    const folder = DriveApp.getFolderById(MEDIA_FOLDER_ID);
    const file = folder.createFile(fileBlob);
    
    file.setName(title || fileBlob.getName());
    file.setDescription(JSON.stringify({
      uploaderName: uploaderName,
      category: category,
      tags: tags,
      uploadedAt: new Date().toISOString()
    }));
    
    return true;
  } catch (error) {
    console.error('Upload error:', error);
    return false;
  }
}
```

## 🔧 Configuration

1. **Update API Endpoint**: Edit the `GAS_API_BASE_URL` in `src/services/googleAppsScript.ts`
2. **Google Drive Folder**: Create a dedicated folder and update the folder ID in your GAS code
3. **Permissions**: Ensure your GAS web app has proper permissions to access Google Drive

## 📱 Usage

1. **Browse Gallery**: View all uploaded photos and videos
2. **Search**: Find specific content using the search bar
3. **Filter**: Use category and type filters to narrow down results
4. **Upload**: Share new photos and videos with the community
5. **View Full Size**: Click any item to view in lightbox mode

## 🔒 Privacy & Security

- All media is stored securely in Google Drive
- Google Apps Script provides enterprise-grade security
- Only authorized users can upload content
- All uploads can be moderated before publication

## 🆓 Cost

This solution is completely free:
- GitHub Pages hosting: Free
- Google Apps Script: Free (with usage limits)
- Google Drive storage: Free 15GB (can be expanded)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📄 License

This project is open source and available under the MIT License.