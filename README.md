# Full-Stack Todo App with Next.js and Supabase

A modern, full-stack todo application built with Next.js, Supabase, and Tailwind CSS. Features real-time updates, beautiful UI, and complete CRUD operations.

## ✨ Features

- 📝 **Full CRUD Operations** - Create, read, update, and delete todos
- 🔄 **Real-time Updates** - Changes sync across all connected clients
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and shadcn/ui
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🌙 **Dark Mode Support** - Built-in dark/light mode toggle
- 📊 **Task Statistics** - Track total, active, and completed tasks
- 🔍 **Smart Filtering** - View all, active, or completed tasks
- 💾 **Demo Mode** - Works offline with local storage fallback
- ⚡ **Lightning Fast** - Built with Next.js 15 and React 19

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nextjs-supabase-todo
bun install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL editor, run this query to create the todos table:

```sql
CREATE TABLE todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Get your project URL and API key from Settings > API

### 3. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your todo app!

## 🏗️ Project Structure

```
nextjs-supabase-todo/
├── app/
│   ├── globals.css       # Tailwind configuration
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main todo app page
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── supabase.ts       # Supabase client & types
│   └── utils.ts          # Utility functions
├── .env.local.example    # Environment variables template
└── README.md             # This file
```

## 🎯 Key Technologies

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[Supabase](https://supabase.com)** - Backend-as-a-Service with PostgreSQL
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible UI components
- **[TypeScript](https://typescriptlang.org)** - Type-safe JavaScript
- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager

## 🔧 Customization

### Database Schema

The app uses a simple `todos` table with these fields:
- `id` (UUID) - Primary key
- `task` (TEXT) - The todo text
- `is_complete` (BOOLEAN) - Completion status
- `created_at` (TIMESTAMP) - Creation timestamp

### Styling

The app uses Tailwind CSS with a custom design system. Key files:
- `app/globals.css` - Color scheme and design tokens
- `components/ui/` - Reusable UI components

### Adding Features

The app is designed to be easily extensible. Some ideas:
- **User Authentication** - Add Supabase Auth
- **Categories/Tags** - Organize todos by category
- **Due Dates** - Add deadline tracking
- **Priorities** - High/medium/low priority levels
- **Collaboration** - Share todos with others

## 📝 API Reference

The app uses Supabase's auto-generated REST API:

```typescript
// Get all todos
const { data } = await supabase
  .from('todos')
  .select('*')
  .order('created_at', { ascending: false })

// Add a new todo
const { data } = await supabase
  .from('todos')
  .insert([{ task: 'New task' }])
  .select()

// Update a todo
const { data } = await supabase
  .from('todos')
  .update({ is_complete: true })
  .eq('id', todoId)

// Delete a todo
const { data } = await supabase
  .from('todos')
  .delete()
  .eq('id', todoId)
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- **Netlify** - Connect your GitHub repo
- **Railway** - Deploy with git integration
- **AWS Amplify** - Full-stack deployment
- **DigitalOcean App Platform** - Simple container deployment

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you have any questions or run into issues:

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review the [Next.js Documentation](https://nextjs.org/docs)
3. Open an issue in this repository

---

**Built with ❤️ using Next.js and Supabase**