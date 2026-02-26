# Environment Variables Setup Guide

This guide will help you configure all the required environment variables for the HR Management System.

## Quick Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values as described below

---

## Required Configuration

### 1. Database (Neon PostgreSQL) ✅ CONFIGURED

```env
DATABASE_URL="postgresql://..."
```

**Your database is already connected!**

---

### 2. NextAuth (Authentication) ✅ CONFIGURED

```env
AUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
BASE_URL="http://localhost:3000"
```

**Your AUTH_SECRET is already generated!**

---

### 3. Email (Gmail SMTP) ⚠️ NEEDS SETUP

```env
EMAIL_FROM="your.email@gmail.com"
EMAIL_PASSWORD="your_gmail_app_password"
```

**How to set up Gmail:**

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Step Verification (Security > 2-Step Verification)
3. Generate App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: Mail
   - Select device: Other (Custom name) → "HR System"
   - Click Generate
   - Copy the 16-character password
4. Update `.env`:
   ```env
   EMAIL_FROM="youremail@gmail.com"
   EMAIL_PASSWORD="abcd efgh ijkl mnop"  # The 16-char password
   ```

**What it's used for:**
- Email verification when users sign up
- Sending employee credentials to new employees

---

### 4. Cloudinary (Image Uploads) ⚠️ NEEDS SETUP

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

**How to set up Cloudinary (FREE):**

1. Sign up at: https://cloudinary.com/users/register_free
2. After signing in, go to Dashboard
3. You'll see your credentials:
   - Cloud name
   - API Key
   - API Secret
4. Update `.env` with these values

**What it's used for:**
- Uploading company logos
- Profile pictures

**Alternative:** If you don't want to use Cloudinary, the app will still work, but logo/image upload will show a configuration error.

---

## Testing Your Setup

### Test Database Connection:
```bash
npx tsx fetch-data.ts
```

### Test Full Application:
```bash
npm run dev
```

Then visit: http://localhost:3000

---

## Troubleshooting

### "Cloudinary not configured" error
- Set up Cloudinary credentials (see section 4 above)
- Or skip logo upload feature for now

### "Email sending failed" error
- Check your Gmail App Password is correct
- Make sure you're using an App Password, NOT your regular Gmail password
- Check 2-Step Verification is enabled

### "AUTH_SECRET" error
- Make sure `.env` file has the AUTH_SECRET
- Restart your dev server after changing `.env`

### Database connection error
- Verify your DATABASE_URL is correct
- Check Neon project is active

---

## Production Deployment

When deploying to production (Vercel, etc.):

1. Set `BASE_URL` and `NEXTAUTH_URL` to your production domain:
   ```env
   NEXTAUTH_URL="https://yourdomain.com"
   BASE_URL="https://yourdomain.com"
   ```

2. All other environment variables should be added to your hosting provider's environment variables settings

---

## Current Status

✅ Database Connected (Neon PostgreSQL)  
✅ NextAuth Configured  
⚠️ Email Configuration Needed  
⚠️ Cloudinary Configuration Needed  

Your application will work without email and Cloudinary, but those features will be disabled.
