# Done - AI-Powered Todo Application

A modern, feature-rich todo application built with Next.js 16, featuring AI-powered natural language interaction, internationalization, and a clean, animated user interface.

## Live Demo

[https://done-eight-delta.vercel.app/](https://done-eight-delta.vercel.app/)

## Features

### Core Functionality
- **CRUD Operations**: Create, read, update, and delete todos with ease
- **Smart Search**: Search across todo names, descriptions, and categories
- **Flexible Filtering**: Filter todos by categories with multi-select support
- **Multiple Sort Options**: Sort by creation date, deadline, name (ascending/descending)
- **Rich Todo Data**: Each todo supports:
  - Name (required)
  - Description (optional)
  - Categories (multiple tags)
  - Deadline with date/time picker
  - Done/incomplete status

### AI Chat Assistant
- **Natural Language Interface**: Interact with your todos using conversational AI
- **Voice Input**: Speech-to-text support for hands-free interaction
- **Powered by OpenAI**: Uses the Vercel AI SDK with OpenAI integration
- **Tool Calling**: The AI can perform all todo operations:
  - Add, update, delete todos
  - Search and filter
  - Toggle completion status
  - Sort and organize
- **Context-Aware**: Understands complex queries about your todos

### Internationalization
- **Multi-Language Support**: Built-in i18n system
- **Language Picker**: Easy locale switching via dropdown
- **Persistent Preferences**: Selected language stored in cookies

### Data Persistence
- **Cookie Storage**: Todos and locale preferences persist across sessions
- **Server-Side Rendering**: Initial state loaded from cookies on page load
- **Type-Safe Storage**: Validated data structure with Zod schemas

### UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Smooth Animations**: Motion library for fluid transitions
- **Accessible Components**: Semantic HTML and ARIA support
- **Clean Interface**: Modern, minimalist design

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **React**: React 19.2
- **State Management**: Redux Toolkit with React-Redux
- **Styling**: Tailwind CSS 4.1 with PostCSS
- **Animations**: Motion (Framer Motion successor)
- **Date Picker**: react-datetime-picker

### AI Integration
- **AI SDK**: Vercel AI SDK (@ai-sdk/react, @ai-sdk/openai)
- **LLM**: OpenAI GPT models
- **Schema Validation**: Zod for tool input/output validation

### Development
- **Language**: TypeScript 5.9
- **Testing**:
  - Vitest for unit tests
  - @testing-library/react for component tests
  - Playwright for E2E tests
- **Code Quality**:
  - ESLint with Next.js config
  - Prettier for formatting
  - TypeScript strict mode

## Project Structure

```
done/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/chat/          # AI chat API endpoint
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── Chat/             # AI chat interface
│   │   │   ├── Chat.tsx      # Main chat component
│   │   │   ├── useChat.ts    # Chat logic hook
│   │   │   └── SpeechToText.tsx # Voice input
│   │   ├── TodosList/        # Todo list display
│   │   ├── TodoForm/         # Todo creation/editing
│   │   ├── Sidebar/          # Filters and sorting
│   │   ├── AppHeader.tsx     # Header with locale picker
│   │   ├── AppProvider.tsx   # Redux provider setup
│   │   ├── CreateEditForm.tsx # Todo form wrapper
│   │   ├── InputField.tsx    # Reusable input component
│   │   └── IconButton.tsx    # Icon button component
│   ├── store/                 # Redux state management
│   │   ├── store.ts          # Store configuration
│   │   ├── appSlice.ts       # Main app slice
│   │   ├── actions.ts        # Async actions
│   │   └── hooks.ts          # Typed Redux hooks
│   ├── utils/                 # Utility functions
│   │   ├── types.ts          # TypeScript types
│   │   ├── i18n.ts           # Internationalization
│   │   ├── cookieClient.ts   # Client-side cookie utils
│   │   ├── cookieServer.ts   # Server-side cookie utils
│   │   └── todo-tools.ts     # AI tool definitions
│   ├── translations/          # i18n translation files
│   ├── icons/                 # SVG icon components
│   └── test-utils/            # Testing utilities
├── playwright/                # E2E test specs
├── public/                    # Static assets
├── coverage/                  # Test coverage reports
├── .next/                     # Next.js build output
└── [config files]             # Various configuration files
```

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- OpenAI API key (for AI chat feature)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd done
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

**Note**: The AI chat feature is optional. The app works fully without it.

### Development

Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
yarn build
yarn start
```

## Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn test` - Run unit tests with Vitest
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Generate test coverage report
- `yarn test:e2e` - Run Playwright E2E tests
- `yarn test:e2e:ui` - Run E2E tests with UI
- `yarn lint` - Lint code with ESLint
- `yarn format` - Format code with Prettier
- `yarn format-check` - Check code formatting
- `yarn typecheck` - Run TypeScript type checking
- `yarn all-checks` - Run all checks (type, format, lint, test)

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `vitest.config.ts` - Vitest test configuration
- `playwright.config.ts` - Playwright E2E test config
- `postcss.config.mjs` - PostCSS with Tailwind
- `tailwind.config.ts` - Tailwind CSS configuration (auto-generated)

## AI Chat Implementation

### How It Works

The AI chat uses the Vercel AI SDK with tool calling to interact with todos:

1. **User Input**: Text or speech input sent to `/api/chat/route.ts`
2. **LLM Processing**: OpenAI model receives user query + available tools
3. **Tool Execution**: AI decides which tools to call based on intent
4. **State Update**: Tool results update Redux store via actions
5. **Response**: AI generates natural language response

### Available AI Tools

Defined in `src/utils/todo-tools.ts`:

- `addTodo` - Create new todo
- `updateTodo` - Edit existing todo
- `deleteTodo` - Remove todo by name
- `toggleTodo` - Mark as done/undone
- `getTodo` - Get specific todo details
- `getAllTodos` - List all todos
- `searchTodos` - Search by text
- `filterTodos` - Filter by categories
- `clearFilters` - Remove category filters
- `clearSearch` - Clear search term
- `sortTodos` - Change sort order

### Tool Schema Example

```typescript
addTodo: tool({
  description: 'Add a new todo item',
  inputSchema: z.object({
    form: z.object({
      name: z.string(),
      description: z.string().optional(),
      categories: z.array(z.string()),
      date: z.string().optional(),
      done: z.boolean().optional(),
    })
  }),
})
```

## State Management

### Redux Store Structure

```typescript
AppState {
  todos: Todo[]                        // All todo items
  locale: string                       // Current language
  translations: Translations           // i18n strings
  search: string                       // Search query
  filteredCategories: string[]         // Active filters
  sortOrder: SortOrder                 // Current sort
  editTodo?: Todo                      // Todo being edited
  createButtonClicked: boolean         // Form visibility
}
```

### Key Actions

- `applyTodos` - Update todo list (syncs with cookies)
- `applyLocale` - Change language (syncs with cookies)
- `setSearch` - Update search filter
- `setFilteredCategories` - Update category filters
- `setSortOrder` - Change sort order
- `setEditTodo` - Open edit mode for todo
- `toggleCreateButton` - Show/hide create form
- `cancelEditing` - Close forms

## Cookie Storage

Todos and locale persist in browser cookies:

### Cookie Structure
```typescript
{
  list: Todo[]      // Serialized todo array
  locale: string    // Language code (e.g., 'en-US')
}
```

### Implementation
- **Client**: `utils/cookieClient.ts` - Write cookies via `document.cookie`
- **Server**: `utils/cookieServer.ts` - Read cookies via `next/headers`
- **Validation**: Zod schemas ensure type safety

## Testing

### Unit Tests
- Located alongside source files (`*.test.ts`, `*.test.tsx`)
- Framework: Vitest with happy-dom
- Coverage: Components, hooks, utilities
- Run: `yarn test` or `yarn test:watch`

### E2E Tests
- Located in `playwright/` directory
- Framework: Playwright
- Browsers: Chromium, Firefox, WebKit
- Run: `yarn test:e2e`

### Test Coverage
Generate coverage report:
```bash
yarn test:coverage
```
View at `coverage/index.html`

## Internationalization

### Adding a New Language

1. Create translation file in `src/translations/`:
```typescript
// src/translations/fr-FR.ts
export const translations = {
  header: { title: 'Terminé' },
  todo: { /* ... */ },
  // ...
}
```

2. Import in `src/utils/i18n.ts`:
```typescript
import { translations as frFR } from '@/translations/fr-FR';

export const getTranslations = (locale: string) => {
  switch (locale) {
    case 'fr-FR': return frFR;
    // ...
  }
}
```

3. Add to locale picker in `components/LocalePicker.tsx`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy

### Other Platforms

The app is a standard Next.js application and can deploy to:
- AWS Amplify
- Netlify
- Cloudflare Pages
- Docker containers
- Node.js servers

Ensure environment variables are set in your platform's config.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for AI chat. Chat hidden if missing. |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run all checks: `yarn all-checks`
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Architecture Decisions

### Why Next.js App Router?
- Server-side rendering for SEO and initial load performance
- Streaming and React Server Components
- Built-in API routes for chat endpoint

### Why Redux Toolkit?
- Predictable state management
- DevTools for debugging
- Good TypeScript support
- Scales well with app complexity

### Why Cookies for Storage?
- Works with SSR (no hydration mismatches)
- Persists across sessions
- No external database needed
- Simple deployment

### Why Vercel AI SDK?
- Streaming support
- Built-in tool calling
- React hooks for UI state
- Type-safe schemas with Zod

## Known Issues & Limitations

- Cookies have size limits (~4KB per cookie). Large todo lists may hit this limit.
- No multi-device sync (each browser has independent storage)
- No user authentication or multi-user support
- AI requires OpenAI API key (cost per request)

## Future Enhancements

Potential improvements:
- Database storage (PostgreSQL, MongoDB)
- User authentication (NextAuth.js)
- Real-time collaboration
- Recurring todos
- Todo attachments/images
- Export/import functionality
- Mobile app (React Native)
- Offline PWA support

## Contact & Support

- Report bugs via GitHub Issues
- Feature requests welcome
- Pull requests accepted

---

Built with ❤️ using Next.js, React, and OpenAI
