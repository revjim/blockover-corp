# Vercel Blob Storage Setup

## Overview

This application uses Vercel Blob storage to create permanent backup copies of all Excel spreadsheets uploaded by users. These backups are never deleted, even if users delete their uploads from the application.

## Setup Instructions

### 1. Create Vercel Blob Store

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Navigate to your project
3. Go to the "Storage" tab
4. Click "Create Database" and select "Blob"
5. Name your store (e.g., "vine-uploads-backup")
6. Click "Create"

### 2. Get Your Blob Token

1. After creating the store, you'll see environment variables
2. Copy the `BLOB_READ_WRITE_TOKEN` value
3. Add it to your local `.env` file:
   ```
   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
   ```
4. For production, the token is automatically added to your Vercel project environment variables

### 3. Deploy robots.txt Configuration

The `public/robots.txt` file has been configured to prevent search engines from indexing blob storage URLs.

**Note:** Vercel Blob storage URLs are public by default but:
- They use random, unguessable URLs
- The robots.txt prevents search engine indexing
- The application never exposes these URLs to users
- Only ZeroETV administrators have access to the Vercel dashboard where blob files can be viewed

## How It Works

### Upload Flow

1. User uploads an Excel file through `/api/vine/upload`
2. The API immediately saves a backup copy to Vercel Blob storage:
   - Path structure: `backups/{userId}/{timestamp}-{filename}`
   - Example: `backups/user_abc123/2026-01-03T10-30-00-000Z-vine-orders.xlsx`
3. The file is then processed and data is stored in the database
4. If the user later deletes their upload, only the database records are deleted - the blob backup remains intact

### Backup File Organization

```
backups/
├── user_abc123/
│   ├── 2026-01-03T10-30-00-000Z-vine-orders.xlsx
│   ├── 2026-01-05T14-15-22-000Z-vine-orders-january.xlsx
│   └── ...
├── user_xyz789/
│   ├── 2026-01-02T08-45-11-000Z-orders.xlsx
│   └── ...
```

### Security & Privacy

- **Never exposed to users**: The application does not provide any UI or API to access blob backups
- **Admin-only access**: Only through Vercel dashboard with proper authentication
- **No deletion**: Backups are permanent and cannot be deleted through the application
- **robots.txt protection**: Search engines are instructed not to index blob storage URLs
- **Organized by user**: Each user's backups are stored in separate folders for easy identification

## Accessing Backups (Admin Only)

To view or download backup files:

1. Log into Vercel dashboard
2. Go to your project → Storage tab
3. Select your Blob store
4. Browse the `backups/` folder structure
5. Download files as needed

## Environment Variables

Required environment variables:

```bash
# Local development (.env file)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Production (automatically set by Vercel)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

## Cost Considerations

Vercel Blob pricing (as of 2026):
- **Free tier**: 1 GB storage, 10 GB bandwidth/month
- **Pro**: $0.15/GB storage, $0.30/GB bandwidth

**Estimation for ZeroETV:**
- Average Excel file: ~100 KB
- 1,000 uploads = ~100 MB storage
- 10,000 uploads = ~1 GB storage (free tier limit)

Monitor usage in Vercel dashboard → Storage → Usage tab.

## Troubleshooting

### Uploads fail with blob error

1. Check that `BLOB_READ_WRITE_TOKEN` is set correctly
2. Verify the blob store exists in Vercel dashboard
3. Check Vercel logs for specific error messages

**Note:** The application continues to work even if blob backup fails - it only logs an error and proceeds with the upload.

### Can't see backups in Vercel dashboard

1. Ensure you're looking in the correct project
2. Check the correct blob store (if you have multiple)
3. Navigate to the `backups/` folder explicitly

## Code References

- Upload handler with blob backup: [app/api/vine/upload/route.ts:34-46](app/api/vine/upload/route.ts#L34-L46)
- Blob import: [app/api/vine/upload/route.ts:6](app/api/vine/upload/route.ts#L6)
- robots.txt configuration: [public/robots.txt](public/robots.txt)
