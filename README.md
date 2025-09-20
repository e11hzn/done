This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Main branch deployment on Vercel:

[https://done-eight-delta.vercel.app/](https://done-eight-delta.vercel.app/)

## Existing features

- Todo app where user can
  - CRUD a todo
  - Search, sort and filter existing todos
  - Select a language
- Todos with selected language are stored in a Cookie
- Some animations exist to make the user experience a little nicer

## Coming features

- AI
  - Text completion based on language
  - Allow users to add tasks using natural language, e.g., "Buy groceries tomorrow."
  - Add todo using speech recognition (couple it with natural language above)
  - Analyze completion patterns and suggest ways to improve productivity.
  - Automatic sorting
  - Provide a conversational interface for managing and querying your todo list.
    - Enable commands for adding, editing, deleting, and prioritizing tasks through conversation.
    - "What is my plan for today?"
    - When user asks for something outside known actions: show known actions with a message “Couldn’t understand what you want, here’s a list of things you can do”
- BE Server
  - Create/login user
  - Store todos in a DB instead of in a Cookie
  - Theme selection saved in a DB
