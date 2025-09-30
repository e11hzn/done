This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Main branch deployment on Vercel:

[https://done-eight-delta.vercel.app/](https://done-eight-delta.vercel.app/)

## Existing features

- Todo app where user can
  - CRUD a todo
  - Search, sort and filter existing todos
  - Select a language
- Todos with selected language are stored in a Cookie
- AI: Interact with the todo list using a chatbot to do the same thing that a user can do manually
  - Uses the [Vercel AI SDK](https://ai-sdk.dev/docs/introduction)
  - It needs an environment variable called `OPENAI_API_KEY`. This is set for the production deployment (using Vercel to deploy), so you need to get one and set it locally if you want to run the chatbot locally.
  - The chatbot will not be rendered if this environment variable is missing
  - It's possible to talk to the AI as well as type in the input field.
- Some animations exist to make the user experience a little nicer
