import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client"; // Import Root type

export const queryClient = new QueryClient();

const container = document.getElementById("root")!; // Use non-null assertion

// Attach a custom property to the container to store the root instance
interface ContainerWithRoot extends HTMLElement {
  _reactRoot?: Root;
}

const containerWithRoot = container as ContainerWithRoot;

// Check if the root already exists on our custom property
if (!containerWithRoot._reactRoot) {
  // If not, create it and store it
  containerWithRoot._reactRoot = createRoot(containerWithRoot);
}

// Render using the stored root
containerWithRoot._reactRoot.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>
);
