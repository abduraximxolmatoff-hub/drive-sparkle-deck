import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getBrandModel } from "@/data/brands";

export const Route = createFileRoute("/brand/model/")({
  loader: ({ params }) => {
    const match = getBrandModel(params.slug, params.model);

    if (!match) {
      throw notFound();
    }

    throw redirect({
      to: "/$brand/$model",
      params: { brand: match.brand.slug, model: match.model.slug },
    });
  },
  component: () => null,
});
