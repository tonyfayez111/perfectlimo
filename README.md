# Perfect Company - Limousine Service Website

A premium car ride-hailing website built with Next.js, Three.js, GSAP, and Tailwind CSS, featuring smooth scroll animations and an interactive 3D car model.

## Features

- 🚗 **3D Car Model**: Interactive Three.js car model with GSAP animations
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Smooth Animations**: GSAP and ScrollTrigger for seamless scroll animations
- 📋 **Booking Form**: Complete booking form with validation
- 📊 **Google Sheets Integration**: Automatic data logging to Google Sheets
- 📧 **Email Notifications**: Automated email alerts for new bookings
- 💬 **WhatsApp Integration**: Direct WhatsApp messaging for bookings
- 🎯 **Perfect Company Branding**: Red and white theme with professional styling

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Perfect Company theme
- **3D Graphics**: Three.js for car model and animations
- **Animations**: GSAP with ScrollTrigger plugin
- **Forms**: React Hook Form with validation
- **Icons**: Font Awesome 6

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd perfect-company-limo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy environment variables:

```bash
cp env.example .env.local
```

4. Update the environment variables in `.env.local` with your actual values.

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/booking/         # API route for booking submissions
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page component
│   └── providers.tsx        # Context providers
├── components/
│   ├── BookingForm.tsx      # Booking form with validation
│   ├── Contact.tsx          # Contact section
│   ├── Footer.tsx           # Footer component
│   ├── Hero.tsx             # Hero section with 3D scene
│   ├── LoadingScreen.tsx    # Loading animation
│   ├── Navbar.tsx           # Navigation bar
│   ├── Services.tsx         # Services showcase
│   └── ThreeScene.tsx       # Three.js 3D car model
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies and scripts
```

## Configuration

### Google Sheets Integration

1. Create a new Google Sheet for storing booking data
2. Go to Google Apps Script (script.google.com)
3. Create a new project and add this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.startPoint,
    data.endPoint,
    data.tripType,
    data.passengers,
    data.pickupDate,
    data.pickupTime,
    data.specialRequests || "",
  ]);

  return ContentService.createTextOutput("Success");
}
```

4. Deploy as a web app and copy the URL to `GOOGLE_SCRIPT_URL` in your `.env.local`

### Email Integration

Choose one of these email services:

#### Option 1: SendGrid

1. Sign up for SendGrid
2. Get your API key
3. Add `SENDGRID_API_KEY` to your `.env.local`

#### Option 2: EmailJS

1. Sign up for EmailJS
2. Create a service and template
3. Add your service ID, template ID, and public key to `.env.local`

### WhatsApp Integration

The website automatically generates WhatsApp messages with booking details. Users can click to send the message directly to your WhatsApp number (01200272020).

For automated WhatsApp messages, you can integrate with WhatsApp Business API.

## Customization

### Branding Colors

The website uses Perfect Company's brand colors defined in `tailwind.config.js`:

```javascript
colors: {
  perfect: {
    red: '#e31e24',
    'dark-red': '#b71c22',
    white: '#ffffff',
    gold: '#ffd700',
    // ... other colors
  }
}
```

### Contact Information

Update the contact information in:

- `components/Hero.tsx` - Phone number in hero section
- `components/Contact.tsx` - All contact details
- `components/Footer.tsx` - Footer contact info
- `components/BookingForm.tsx` - WhatsApp number and email

### Services

Modify the services array in `components/Services.tsx` to update service offerings.

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:

- Netlify
- Heroku
- AWS Amplify
- DigitalOcean App Platform

## Performance

- ✅ Optimized images and assets
- ✅ Code splitting with Next.js
- ✅ Lazy loading for components
- ✅ Efficient Three.js rendering
- ✅ Compressed animations and styles

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Perfect Company.

## Support

For support or customization requests, contact:

- **Phone**: 01200272020
- **Email**: info@perfectcompany.com
- **WhatsApp**: https://wa.me/201200272020

---

**Perfect Company** - Excellence in providing Limousine services
