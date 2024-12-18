import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/deno";

const backendUrl = "https://ibm-sl-api.deno.dev/";

/**
 * this is a loader function that runs server-side and fetches data from the backend
 */
export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  if (request.method !== "GET") {
    return new Response("Invalid method", { status: 405 });
  }

  const url = new URL(`${backendUrl}api/fuzzy`);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return new Response("Error fetching articles", { status: res.status });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
};

/**
 * this is an action function that runs server-side and sends data to the backend
 */
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  switch (request.method) {
    // if the request method is POST
    case "POST": {
      const body = await request.json();

      const url = new URL(`${backendUrl}api/fuzzy`);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    }
  }
};
