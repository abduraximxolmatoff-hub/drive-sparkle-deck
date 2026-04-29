import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/brand/$slug/model/$model")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$brand/$model",
      params: { brand: params.slug, model: params.model },
      replace: true,
    });
  },
});
