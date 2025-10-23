# Q HR - Modern HR Management System

A modern, scalable, and responsive HR Management System built with Next.js, React, TypeScript, and TailwindCSS. Features face recognition check-in/out, GPS tracking, and comprehensive HR management tools.

## 🚀 Features

### Core Functionality
- **Authentication System** - JWT-based authentication with role-based access control
- **Dashboard** - Real-time analytics and quick actions
- **Attendance Management** - Face recognition check-in/out with GPS tracking
- **Leave Tracker** - Time off management and vacation tracking
- **Self-Service Portal** - Employee self-service capabilities
- **Payroll Management** - Salary and payment processing
- **Reports & Analytics** - Comprehensive reporting system

### Technical Features
- **Responsive Design** - Works seamlessly on all devices
- **Smooth Animations** - Framer Motion for delightful user experience
- **Modular Architecture** - Clean, scalable code structure
- **Type Safety** - Full TypeScript implementation
- **Modern UI/UX** - Beautiful, intuitive interface

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS with custom components
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Database**: Prisma with PostgreSQL
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.io (ready for implementation)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Authentication pages
│   ├── self-service/      # Employee self-service
│   ├── leave-tracker/     # Leave management
│   ├── attendance/        # Check-in/out system
│   └── more/             # Additional features
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (Sidebar, Header)
│   └── ui/               # Basic UI components
├── modules/              # Feature-specific modules
│   ├── home/             # Dashboard module
│   ├── self-service/     # Self-service module
│   ├── leave-tracker/    # Leave management module
│   ├── attendance/       # Attendance module
│   └── more/            # Additional features module
├── lib/                  # Utilities and helpers
├── styles/               # Global styles and CSS
├── assets/               # Static assets
│   ├── logo/            # Logo components
│   └── icons/           # Icon assets
└── types/               # TypeScript type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Secondary**: Purple gradient (#f093fb to #f5576c)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Components
- **Logo**: Animated Q HR logo with gradient background
- **Sidebar**: Collapsible navigation with smooth transitions
- **Cards**: Consistent card design with hover effects
- **Buttons**: Gradient buttons with hover animations
- **Forms**: Clean, accessible form components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd q-hr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@qhr.com | admin123 |
| HR Manager | hr@qhr.com | hr123 |
| Manager | manager@qhr.com | manager123 |
| Employee | employee@qhr.com | employee123 |

## 📱 Features Overview

### Dashboard
- Real-time attendance statistics
- Quick action buttons
- Recent activity feed
- Notification center
- Today's schedule

### Attendance System
- Face recognition check-in/out
- GPS location tracking
- Real-time status updates
- Attendance history
- Overtime tracking

### Leave Management
- Leave balance tracking
- Request submission
- Approval workflow
- Calendar integration
- History management

### Self-Service Portal
- Profile management
- Personal information updates
- Document access
- Quick actions

### Reports & Analytics
- Attendance reports
- Payroll summaries
- Employee statistics
- Performance metrics
- Custom report generation

## 🎯 Key Components

### Layout Components
- **MainLayout**: Main application layout with sidebar and header
- **Sidebar**: Collapsible navigation sidebar
- **SectionHeader**: Dynamic section-specific headers

### Module Components
- **HomeModule**: Dashboard with stats and quick actions
- **AttendanceModule**: Check-in/out with face recognition
- **LeaveTrackerModule**: Leave management system
- **SelfServiceModule**: Employee self-service portal
- **MoreModule**: Additional features and tools

### UI Components
- **Logo**: Animated Q HR branding
- **Cards**: Consistent card design
- **Buttons**: Interactive button components
- **Forms**: Accessible form elements

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure
- **Modular Design**: Each feature is a separate module
- **Component Reusability**: Shared components in `/components`
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-key"
```

## 🔮 Future Enhancements

- Real face recognition API integration
- Google Maps API for GPS tracking
- Socket.io for real-time updates
- Email notifications
- File upload for documents
- Advanced analytics
- Mobile app development

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.

---

**Q HR** - Modern HR Management System
Built with ❤️ using Next.js, React, and TypeScript