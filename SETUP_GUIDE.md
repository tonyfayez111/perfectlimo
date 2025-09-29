# Perfect Company - Setup Guide

## Quick Start

Your Next.js car ride-hailing website is now ready! Here's how to get it running and configure the integrations.

## 🚀 Running the Website

The development server should already be running at: **http://localhost:3000**

If not, run:

```bash
npm run dev
```

## 📋 Features Implemented

✅ **Next.js 14** with TypeScript and App Router  
✅ **Tailwind CSS** with Perfect Company branding (red/white theme)  
✅ **Three.js** interactive 3D car model  
✅ **GSAP** smooth scroll animations with ScrollTrigger  
✅ **Responsive design** for all devices  
✅ **Booking form** with validation  
✅ **Google Sheets integration** (ready to configure)  
✅ **WhatsApp integration** (working)  
✅ **Email notifications** (ready to configure)

## 🔧 Configuration Steps

### 1. Google Sheets Integration

**Step 1:** Create a Google Sheet

- Go to [Google Sheets](https://sheets.google.com)
- Create a new spreadsheet
- Add these headers in row 1:
  ```
  Timestamp | Name | Pick-up Location | Drop-off Location | Trip Type | Passengers | Date | Time | Special Requests | Status
  ```

**Step 2:** Set up Google Apps Script

- Go to [Google Apps Script](https://script.google.com)
- Create a new project
- Replace the default code with the content from `google-apps-script.js`
- Update the `SHEET_ID` constant with your Google Sheet ID
- Deploy as a web app with "Execute as: Me" and "Who has access: Anyone"

**Step 3:** Configure environment variables

- Copy `env.example` to `.env.local`
- Add your Google Apps Script web app URL to `GOOGLE_SCRIPT_URL`

### 2. Email Notifications

Choose one of these options:

**Option A: SendGrid**

- Sign up at [SendGrid](https://sendgrid.com)
- Get your API key
- Add `SENDGRID_API_KEY` to `.env.local`

**Option B: EmailJS (Client-side)**

- Sign up at [EmailJS](https://emailjs.com)
- Create a service and template
- Add your credentials to `.env.local`

### 3. WhatsApp Integration

**Current Status:** ✅ Working (manual)

- Users can click to send WhatsApp messages to 01200272020
- Messages include all booking details

**Optional Enhancement:** WhatsApp Business API

- For automated messages, integrate with WhatsApp Business API
- Add credentials to `.env.local`

## 📱 Testing the Website

1. **Hero Section**: Check 3D car animation and scroll indicator
2. **Services**: Verify hover animations and scroll triggers
3. **Booking Form**: Test form validation and submission
4. **Contact**: Ensure all contact methods work
5. **Mobile**: Test on different screen sizes

## 🎨 Customization

### Update Contact Information

Edit these files:

- `components/Hero.tsx` - Phone number
- `components/Contact.tsx` - All contact details
- `components/Footer.tsx` - Footer info
- `components/BookingForm.tsx` - WhatsApp number

### Modify Services

Edit the `services` array in `components/Services.tsx`

### Change Colors

Update `tailwind.config.js` for brand colors

### Add More Animations

Use GSAP and ScrollTrigger in any component

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

- Netlify
- Heroku
- AWS Amplify
- DigitalOcean App Platform

## 📞 Support

**Perfect Company Contact:**

- Phone: 01200272020
- WhatsApp: https://wa.me/201200272020
- Email: info@perfectcompany.com

## 🔒 Environment Variables

Create `.env.local` with:

```env
# Google Sheets Integration
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Email Configuration
ADMIN_EMAIL=info@perfectcompany.com
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Optional: EmailJS
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## 🎯 Next Steps

1. **Test locally**: Verify all features work
2. **Configure Google Sheets**: Set up data collection
3. **Set up email**: Choose SendGrid or EmailJS
4. **Deploy**: Push to production
5. **Custom domain**: Add your domain name
6. **SEO**: Optimize meta tags and content
7. **Analytics**: Add Google Analytics or similar

## 🐛 Troubleshooting

**Common Issues:**

1. **3D car not showing**: Check browser WebGL support
2. **Animations not working**: Verify GSAP is loaded
3. **Form not submitting**: Check API routes and environment variables
4. **Styles not loading**: Ensure Tailwind is configured correctly

**Development Commands:**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check for code issues
```

---

🎉 **Congratulations!** Your Perfect Company limousine website is ready to take bookings!
