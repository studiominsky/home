# Studio Minsky

This is the official website for Studio Minsky, a digital studio specializing in creating web applications, providing AI solutions, and offering data visualization services.

## Features

-   **Services Overview:** Detailed descriptions of services offered, including Web Apps, AI Solutions, and Data Visualization.
-   **Project Showcase:** A portfolio of featured projects with links to live demos and source code.
-   **Blog:** A collection of articles and posts on various topics.
-   **Contact Form:** A functional contact form for inquiries.
-   **Internationalization:** The website supports multiple languages.
-   **AI Chatbot:** An AI-powered chatbot to interact with users.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Content:** [Notion API](https://developers.notion.com/)
-   **Email:** [Resend](https://resend.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/studiominsky/home.git](https://github.com/studiominsky/home.git)
    ```
2.  **Install NPM packages**
    ```bash
    npm install
    ```
3.  **Create a `.env.local` file in the root of your project and add the following environment variables:**
    ```
    NOTION_API_KEY=your_notion_api_key
    NOTION_DATABASE_ID=your_notion_database_id
    RESEND_API_KEY=your_resend_api_key
    OPENAI_API_KEY=your_openai_api_key
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
